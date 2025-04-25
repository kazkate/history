import { useEffect, useState } from "react";
import { H1 } from "../MainContent/style";
import {
    ScrollToTopBtn,
    SliderContainer,
    StoryContainer,
    StoryText,
    StoryInfo,
    P,
    StoryCardImg,
    Container,
    NotPicture,
    PagContainer,
    Pagbutton,
} from "./style";
import axios from "axios";
import { StoryCardProps } from "../Stories/Stories";
import { useParams } from "react-router";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

// const client = axios.create({ baseURL: "https://localhost:5001" });
const client = axios.create({ baseURL: "/" });
async function GetStory(id: string) {
    try {
        console.log();
        const sotries = await client
            .get("/GetStory/Story", { params: { storyId: id } })
            .then(res => res.data as StoryCardProps);

        return sotries;
    } catch (e) {
        throw e;
    }
}
async function GetPagedStoryText(
    id: string,
    pageNumber: number,
    pageSize: number = 200
) {
    try {
        const response = await client.get("/GetStory/PagedStoryText", {
            params: { storyId: id, pageNumber, pageSize },
        });

        return response.data;
    } catch (e) {
        console.error("Ошибка загрузки текста:", e);
        throw e;
    }
}
interface RouteParams {
    id: string;
}
export function Story() {
    const { id } = useParams<keyof RouteParams>() as RouteParams;
    const [textPages, setTextPages] = useState<string[]>([]); // Список загруженных страниц
    const [currentPage, setCurrentPage] = useState(0); // Индекс текущей страницы
    const [hasMore, setHasMore] = useState(true); // Есть ли ещё страницы впереди

    // const [text, setText] = useState("");
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [ganre, setGanre] = useState("");
    const [date, setDate] = useState("");
    const [anotation, setAnotation] = useState("");
    const [pathPicture, setPathPicture] = useState("");
    const [loading, setLoading] = useState(false); // Флаг загрузки
    const formatDate = (dateString: string) => {
        return format(new Date(dateString), "dd.MM.yy", { locale: ru });
    };
    async function fetchStory() {
        try {
            const story = await GetStory(id);
            console.log("Полученная история:", story);
            // setText(story.text!);
            setName(story.title);
            setAuthor(story.author);
            setGanre(story.genre);
            setDate(formatDate(story.addDate));
            setAnotation(story.annotation);
            setPathPicture(story.picture);
            // fetchStoryPage(1);
        } catch (error) {
            console.error("Ошибка загрузки данных", error);
        }
    }
    async function fetchStoryPage(page: number) {
        if (textPages[page] !== undefined) return; // Если страница уже загружена — не запрашиваем её снова

        setLoading(true); // Устанавливаем флаг загрузки

        try {
            const data = await GetPagedStoryText(id, page + 1); // Запрос текста с бэка

            setTextPages(prev => {
                const newPages = [...prev]; // Создаём новый массив (реактивность)
                newPages[page] = data.text; // Записываем текст в нужную страницу
                return newPages;
            });

            setHasMore(data.hasMore); // Проверяем, есть ли следующая страница
        } catch (error) {
            console.error("Ошибка загрузки данных", error);
        } finally {
            setLoading(false); // Выключаем загрузку
        }
    }
    useEffect(() => {
        fetchStory();
        fetchStoryPage(0);
    }, []);
    const goNext = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        fetchStoryPage(nextPage); // Загружаем следующую страницу
    };

    const goBack = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };
    return (
        <Container>
            <StoryContainer>
                <SliderContainer>
                    {pathPicture == "base.jpg" ? (
                        <NotPicture>нет картинки</NotPicture>
                    ) : (
                        <StoryCardImg src={"/images/" + pathPicture} />
                    )}
                </SliderContainer>
                <StoryInfo>
                    <H1>{name}</H1>
                    <P>
                        <strong>Автор: </strong> {author}
                    </P>
                    <P>
                        <strong>Жанр: </strong> {ganre}
                    </P>
                    <P>
                        <strong>Дата публикации: </strong>
                        {date}
                        {/* {format(new Date(new Date(date)), "dd.MM.yy", {
                            locale: ru,
                        })} */}
                    </P>
                    <P>
                        <strong>Краткое описание: </strong>
                        {anotation}
                    </P>
                </StoryInfo>
            </StoryContainer>
            <hr />
            <PagContainer>
                <Pagbutton onClick={goBack} disabled={currentPage === 0}>
                    Назад
                </Pagbutton>
                <span> Страница {currentPage + 1} </span>
                <Pagbutton
                    onClick={goNext}
                    disabled={!hasMore && textPages.length == currentPage + 1}
                >
                    Вперёд
                </Pagbutton>
            </PagContainer>
            <StoryText>
                {textPages[currentPage]
                    ? textPages[currentPage]
                          .split("\n")
                          .map((line, index) => <p key={index}>{line}</p>)
                    : "Загрузка..."}
            </StoryText>
            <PagContainer>
                <Pagbutton onClick={goBack} disabled={currentPage === 0}>
                    Назад
                </Pagbutton>
                <span> Страница {currentPage + 1} </span>
                <Pagbutton
                    onClick={goNext}
                    disabled={!hasMore && textPages.length == currentPage + 1}
                >
                    Вперёд
                </Pagbutton>
            </PagContainer>
        </Container>
    );
}
