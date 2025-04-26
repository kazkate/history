import { SetStateAction, useEffect, useState } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import debounce from "lodash/debounce";
import {
    Button,
    Container,
    H1,
    List,
    Listli,
    SearchInput,
    SearchInputContainer,
    Sidebar,
    StoriesContent,
    StoryCard,
    StoryCardImg,
    StoryInfo,
    DateContainer,
    SearchButton,
    Content,
    ContainerForImg,
    ContainerForInfo,
    NotPicture,
} from "./style";
import axios from "axios";
import { useNavigate } from "react-router";
import Select from "react-select";

// const client = axios.create({ baseURL: "http://localhost:5280" });
const client = axios.create({ baseURL: "/api/" });
// const client = axios.create({ baseURL: "/" });
async function GetStories() {
    try {
        console.log();
        const sotries = await client
            .get("/GetStoryList/AllStories")
            .then(res => res.data as StoryCardProps[]);

        return sotries;
    } catch (e) {
        throw e;
    }
}
async function GetAuthors() {
    try {
        console.log();
        const author = await client
            .get("/GetAuthors/AllAuthor")
            .then(res => res.data as Author[]);

        return author;
    } catch (e) {
        throw e;
    }
}

export interface Author {
    id: number;
    author: string;
}

export interface Book {
    id: number;
    author: string;
    title: string;
}
export function Stories() {
    const [arr, setArr] = useState<StoryCardProps[]>([]);

    const [query, setQuery] = useState(""); // Текст в поиске
    const [books, setBooks] = useState<Book[]>([]); // Найденные книги
    const [loading, setLoading] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState<string>(""); // Для жанра
    const [selectedAuthor, setSelectedAuthor] = useState<string>(""); // Для автора
    const [minWordCount, setMinWordCount] = useState<number | "">(""); // Для минимального объема слов
    const [maxWordCount, setMaxWordCount] = useState<number | "">(""); // Для максимального объема слов
    const [imageFilter, setImageFilter] = useState<string>(""); // Для наличия картинок
    const [optionsTitle, setOptionsTitle] = useState<
        { value: number; label: string }[]
    >([]);
    async function SearchByTitle(title: string) {
        // const formattedText = storyContent.replace(/\n/g, "\\n");
        const formData = new FormData();
        formData.append("title", title);

        const book = client
            .post("/GetStoryList/FilterdedByTitleStories", formData)
            .then(res => res.data as StoryCardProps[])
            .catch(function (error: any) {
                console.log(error);
                throw error;
            });
        return book;
    }
    async function fetchFilteredStories() {
        setLoading(true); // Показываем индикатор загрузки
        try {
            const formData = new FormData();
            // if (selectedAuthor && (minWordCount || maxWordCount)) {
            //     formData.append("genre", selectedGenre);
            //     formData.append("author", selectedAuthor);
            //     formData.append("minSymbols", String(minWordCount));
            //     formData.append("maxSymbols", String(maxWordCount));
            //     formData.append("pictures", imageFilter);
            //     const response = await client.post(
            //         "/GetStoryList/FilterdedByAllParametrsStories",
            //         formData
            //     );
            //     setArr(response.data as StoryCardProps[]);
            // } else if (selectedAuthor) {
            //     formData.append("author", selectedAuthor);
            //     const response = await client.post(
            //         "/GetStoryList/FilterdedByAuthorStories",
            //         formData
            //     );
            //     setArr(response.data as StoryCardProps[]);
            // } else if (minWordCount || maxWordCount) {
            //     formData.append("minSymbols", String(minWordCount));
            //     formData.append("maxSymbols", String(maxWordCount));
            //     const response = await client.post(
            //         "/GetStoryList/FilterdedBySymbolsStories",
            //         formData
            //     );
            //     setArr(response.data as StoryCardProps[]);
            // } else {
            formData.append("genre", selectedGenre);
            formData.append("author", selectedAuthor);
            formData.append("minSymbols", String(minWordCount));
            formData.append("maxSymbols", String(maxWordCount));
            // formData.append("pictures", imageFilter);
            const response = await client.post(
                "/GetStoryList/FilterdedByAllParametrsStories",
                formData
            );
            setArr(response.data as StoryCardProps[]);
        } catch (error) {
            console.error("Ошибка при фильтрации:", error);
        } finally {
            setLoading(false); // Скрываем индикатор загрузки
        }
    }
    const fetchBooks = debounce(async searchQuery => {
        if (!searchQuery.trim()) return;
        try {
            const formData = new FormData();
            formData.append("title", searchQuery);
            const response = await client.post("/GetTitles", formData);
            const books: Book[] = response.data;

            setOptionsTitle(
                books.map((book: Book) => ({
                    value: book.id,
                    label: `${book.title}`,
                }))
            );
        } catch (error) {
            console.error("Ошибка поиска:", error);
        }
    }, 500);

    async function fetchStories() {
        try {
            const sotries = await GetStories();
            console.log("Полученные игры:", sotries);
            setArr(sotries);
        } catch (error) {
            console.error("Ошибка загрузки данных", error);
        }
    }
    async function fetchOptionsAuthor() {
        try {
            const author = await GetAuthors();
            setOptions(author);
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
        }
    }
    const [options, setOptions] = useState<Author[]>([]);
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        fetchOptionsAuthor();
        fetchStories();
    }, []);
    const [selectedOptionTitle, setSelectedOption] = useState<{
        value: number;
        label: string;
    } | null>(null);
    return (
        <Container>
            <Sidebar>
                <p>
                    <strong>Жанр</strong>
                </p>

                <List>
                    <Listli>
                        <input
                            type="radio"
                            name="genre"
                            id="fantasy"
                            value="fantasy"
                            checked={selectedGenre === "Фантастика"}
                            onChange={() => setSelectedGenre("Фантастика")}
                        />
                        <label>Фантастика</label>
                    </Listli>
                    <Listli>
                        <input
                            type="radio"
                            name="genre"
                            id="detective"
                            value="detective"
                            checked={selectedGenre === "Детектив"}
                            onChange={() => setSelectedGenre("Детектив")}
                        />
                        <label>Детектив</label>
                    </Listli>
                    <Listli>
                        <input
                            type="radio"
                            name="genre"
                            id="comedy"
                            value="comedy"
                            checked={selectedGenre === "Комедия"}
                            onChange={() => setSelectedGenre("Комедия")}
                        />
                        <label>Комедия</label>
                    </Listli>
                    <Listli>
                        <input
                            type="radio"
                            name="genre"
                            id="adventure"
                            value="adventure"
                            checked={selectedGenre === "Приключения"}
                            onChange={() => setSelectedGenre("Приключения")}
                        />
                        <label>Приключения</label>
                    </Listli>
                    <Listli>
                        <input
                            type="radio"
                            name="genre"
                            id="horror"
                            value="horror"
                            checked={selectedGenre === "Ужасы"}
                            onChange={() => setSelectedGenre("Ужасы")}
                        />
                        <label>Ужасы</label>
                    </Listli>
                    <Listli>
                        <input
                            type="radio"
                            name="genre"
                            id="mystic"
                            value="mystic"
                            checked={selectedGenre === "Романтика"}
                            onChange={() => setSelectedGenre("Романтика")}
                        />
                        <label>Романтика</label>
                    </Listli>
                    <Listli>
                        <input
                            type="radio"
                            name="genre"
                            id="other"
                            value=""
                            checked={selectedGenre === ""}
                            onChange={() => setSelectedGenre("")}
                        />
                        <label>Все</label>
                    </Listli>
                </List>
                <hr />

                <p>
                    <strong>Автор</strong>
                </p>
                <select
                    value={selectedAuthor}
                    onChange={e => setSelectedAuthor(e.target.value)}
                >
                    {" "}
                    <option value="">Все...</option>
                    {options.map(option => (
                        <option key={option.id} value={option.author}>
                            {option.author}
                        </option>
                    ))}
                </select>

                <p>
                    <strong>Объем истории в словах</strong>
                </p>
                <div>
                    <input
                        type="number"
                        placeholder="от"
                        value={minWordCount || ""}
                        onChange={e =>
                            setMinWordCount(
                                e.target.value ? +e.target.value : ""
                            )
                        }
                    />
                    <input
                        type="number"
                        placeholder="до"
                        value={maxWordCount || ""}
                        onChange={e =>
                            setMaxWordCount(
                                e.target.value ? +e.target.value : ""
                            )
                        }
                    />
                </div>
                <p></p>
                {/* <p>
                    <strong>Картинки автора</strong>
                </p>

                <List>
                    <Listli>
                        <input
                            type="radio"
                            name="images"
                            id="yes"
                            onChange={() => setImageFilter("есть")}
                        />
                        <label>есть</label>
                    </Listli>
                    <Listli>
                        <input
                            type="radio"
                            name="images"
                            id="no"
                            onChange={() => setImageFilter("нет")}
                        />
                        <label>нет</label>
                    </Listli>
                    <Listli>
                        <input
                            type="radio"
                            name="images"
                            id="any"
                            onChange={() => setImageFilter("")}
                            checked={imageFilter === ""}
                        />
                        <label>все равно</label>
                    </Listli>
                </List> */}
                <Button onClick={fetchFilteredStories}>Применить</Button>
            </Sidebar>
            <Content>
                <H1>Наши истории</H1>
                <SearchInputContainer>
                    <Select
                        options={optionsTitle}
                        onInputChange={value => {
                            setQuery(value);
                            fetchBooks(value);
                        }}
                        onChange={selectedOption => {
                            setSelectedOption(selectedOption);
                        }}
                        placeholder="Начните вводить название..."
                        styles={{
                            container: provided => ({
                                ...provided,
                                width: 500, // Устанавливаем желаемую ширину (например, 250px)
                            }),
                        }}
                        noOptionsMessage={() => "Нет подходящих историй"}
                    />

                    <SearchButton
                        onClick={() => {
                            selectedOptionTitle &&
                                SearchByTitle(selectedOptionTitle.label)
                                    .then(res => setArr(res))
                                    .catch(error => {
                                        console.error(
                                            "Ошибка при отправке:",
                                            error
                                        );
                                    })
                                    .finally(() => {
                                        setSelectedOption(null);
                                        setQuery("");
                                    });
                        }}
                    >
                        Найти
                    </SearchButton>
                </SearchInputContainer>

                <StoriesContent>
                    {arr.map(el => {
                        return <Card {...el} />;
                    })}
                </StoriesContent>
            </Content>
        </Container>
    );
}

export interface StoryCardProps {
    id: number;
    picture: string;
    title: string;
    author: string;
    genre: string;
    addDate: string;
    annotation: string;
    text?: string;
}
export function Card(prop: StoryCardProps) {
    const [story, setStory] = useState(""); // Храним загруженный текст
    const [loading, setLoading] = useState(false); // Показываем индикатор загрузки
    const [showPreview, setShowPreview] = useState(false); // Показывать блок с текстом?
    const navigate = useNavigate();
    const fetchStory = async () => {
        if (story || loading) return; // Избегаем повторных запросов
        setLoading(true);
        try {
            const response = await client
                .get("/GetStory/StoryText", { params: { storyId: prop.id } })
                .then(res => res.data as StoryCardProps);

            if (response.text) {
                setStory(response.text); // Записываем текст истории
            } else {
                setStory("В истории нет текста");
            }
        } catch (error) {
            console.error("Ошибка при загрузке истории:", error);
            setStory("Не удалось загрузить текст...");
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <StoryCard
                onMouseEnter={() => {
                    setShowPreview(true);
                    fetchStory(); // Загружаем текст при наведении
                }}
                onMouseLeave={() => setShowPreview(false)}
                onClick={() => {
                    navigate("/story/" + prop.id);
                }}
            >
                <ContainerForImg>
                    {/* {prop.picture == "base.jpg" ? ( */}
                    <NotPicture></NotPicture>
                    {/* // ) : (
                    //     <StoryCardImg src={"/images/" + prop.picture} />
                    // )} */}
                </ContainerForImg>
                <ContainerForInfo>
                    <StoryInfo>
                        <p>
                            <strong>Автор: </strong> {prop.author}
                        </p>
                        <p>
                            <strong>Название: </strong>
                            {prop.title}
                        </p>
                        <p>
                            <strong>Жанр: </strong> {prop.genre}
                        </p>
                        <p>
                            <strong>Краткое описание: </strong>
                            {prop.annotation}
                        </p>
                    </StoryInfo>
                    <DateContainer>
                        {format(new Date(prop.addDate), "dd.MM.yy", {
                            locale: ru,
                        })}
                    </DateContainer>
                </ContainerForInfo>
                {showPreview && (
                    <div
                        style={{
                            position: "absolute",
                            bottom: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "#e8f1d6",
                            color: "grey",
                            padding: "5px",
                            borderRadius: "4px",
                            whiteSpace: "nowrap",
                            marginBottom: "5px",
                            maxWidth: "800px",
                            maxHeight: "150px",
                        }}
                    >
                        {loading ? (
                            <p className="text-sm text-gray-300">Загрузка...</p>
                        ) : (
                            <p
                                style={{
                                    wordWrap: "break-word",
                                    whiteSpace: "normal",
                                    maxWidth: "800px",
                                    width: "max-content",
                                }}
                            >
                                {story}
                            </p>
                        )}
                    </div>
                )}
            </StoryCard>
        </>
    );
}
