import { useState } from "react";
import {
    AddBtn,
    AddBtnCon,
    Button,
    Container,
    FormGroup,
    FormSubmit,
    H1,
    Input,
    Label,
    MyError,
    Part,
    Select,
    StoryContent,
    StoryForm,
    Success,
    Textarea,
    Tooltip,
} from "./style";

import axios from "axios";
import { getLogin } from "../../auth.service";
// const client = axios.create({ baseURL: "https://localhost:5001" });
const client = axios.create({ baseURL: "/" });

async function sendToServer(
    title: string,
    genre: string,
    storyContent: string,
    shortDescription: string,
    file: File | null
) {
    let author: string = getLogin();
    // const formattedText = storyContent.replace(/\n/g, "\\n");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("annotation", shortDescription);
    formData.append("text", storyContent);
    formData.append("author", author);
    if (file) {
        formData.append("file", file);
    }
    return client
        .post("/AddStory", formData)
        .then(function (response: any) {})
        .catch(function (error: any) {
            console.log(error);
            throw error;
        });
}

export function AddStory() {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("Комедия");
    const [shortDescription, setShortDescription] = useState("");
    const [storyContent, setStoryContent] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const [errors, setErrors] = useState({
        title: "",
        genre: "",
        shortDescription: "",
        storyContent: "",
        file: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // Валидация формы
    const validateForm = () => {
        let isValid = true;
        // const newErrors = {
        //     title: "",
        //     genre: "",
        //     shortDescription: "",
        //     storyContent: "",
        //     file: "",
        // };

        if (!title.trim()) {
            setErrors(prev => ({ ...prev, title: "Название обязательно" }));
            isValid = false;
        } else if (title.length < 5) {
            setErrors(prev => ({ ...prev, title: "Минимум 5 символов" }));
            isValid = false;
        } else if (title.length > 100) {
            setErrors(prev => ({ ...prev, title: "Максимум 100 символов" }));
            isValid = false;
        }

        if (!shortDescription.trim()) {
            setErrors(prev => ({
                ...prev,
                shortDescription: "Краткое описание обязательно",
            }));
            isValid = false;
        } else if (shortDescription.length < 10) {
            setErrors(prev => ({
                ...prev,
                shortDescription: "Минимум 10 символов",
            }));
            isValid = false;
        } else if (shortDescription.length > 300) {
            setErrors(prev => ({
                ...prev,
                shortDescription: "Максимум 300 символов",
            }));
            isValid = false;
        }

        if (!storyContent.trim()) {
            setErrors(prev => ({
                ...prev,
                storyContent: "Текст истории обязателен",
            }));
            isValid = false;
        } else if (storyContent.length < 50) {
            setErrors(prev => ({
                ...prev,
                storyContent: "Минимум 50 символов",
            }));
            isValid = false;
        } else if (storyContent.length > 6000) {
            setErrors(prev => ({
                ...prev,
                storyContent: "Максимум 6000 символов",
            }));
            isValid = false;
        }

        // setErrors(newErrors);
        return isValid;
    };

    const validateTitle = () => {
        if (!title.trim()) {
            setErrors(prev => ({ ...prev, title: "Название обязательно" }));
        } else if (title.length < 5) {
            setErrors(prev => ({ ...prev, title: "Минимум 5 символов" }));
        } else if (title.length > 100) {
            setErrors(prev => ({ ...prev, title: "Максимум 100 символов" }));
        } else {
            setErrors(prev => ({ ...prev, title: "" }));
        }
    };
    const validateAnnotation = () => {
        if (!shortDescription.trim()) {
            setErrors(prev => ({
                ...prev,
                shortDescription: "Краткое описание обязательно",
            }));
        } else if (shortDescription.length < 10) {
            setErrors(prev => ({
                ...prev,
                shortDescription: "Минимум 10 символов",
            }));
        } else if (shortDescription.length > 300) {
            setErrors(prev => ({
                ...prev,
                shortDescription: "Максимум 300 символов",
            }));
        } else {
            setErrors(prev => ({ ...prev, shortDescription: "" }));
        }
    };

    const validateContent = () => {
        if (!storyContent.trim()) {
            setErrors(prev => ({
                ...prev,
                storyContent: "Текст истории обязателен",
            }));
        } else if (storyContent.length < 50) {
            setErrors(prev => ({
                ...prev,
                storyContent: "Минимум 50 символов",
            }));
        } else if (storyContent.length > 6000) {
            setErrors(prev => ({
                ...prev,
                storyContent: "Максимум 6000 символов",
            }));
        } else {
            setErrors(prev => ({ ...prev, storyContent: "" }));
        }
    };
    return (
        <Container>
            <H1>Добавление истории</H1>
            <StoryForm>
                {/* onSubmit={handleSubmit} */}
                <Part>
                    <FormGroup>
                        <Label>
                            Название*{" "}
                            {errors.title && <MyError>{errors.title}</MyError>}
                        </Label>
                        <Tooltip data-tooltip="Введите от 5 до 100 символов">
                            <Input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                onBlur={validateTitle}
                            />
                        </Tooltip>
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            Жанр*
                            {errors.genre && <MyError>{errors.genre}</MyError>}
                        </Label>
                        <Tooltip data-tooltip="Выберите жанр">
                            <Select
                                value={genre}
                                onChange={e => setGenre(e.target.value)}
                            >
                                <option value="Комедия">Комедия</option>
                                <option value="Детектив">Детектив</option>
                                <option value="Фантастика">Фантастика</option>
                                <option value="Приключения">Приключения</option>
                                <option value="Романтика">Романтика</option>
                                <option value="Ужасы">Ужасы</option>
                                <option value="Другое">Другое</option>
                            </Select>
                        </Tooltip>
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            Краткое описание*{" "}
                            {errors.shortDescription && (
                                <MyError>{errors.shortDescription}</MyError>
                            )}
                        </Label>
                        <Tooltip data-tooltip="Введите от 10 до 300 символов">
                            <Textarea
                                value={shortDescription}
                                onChange={e =>
                                    setShortDescription(e.target.value)
                                }
                                onBlur={validateAnnotation}
                            />
                        </Tooltip>
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            Выберите файл{" "}
                            {errors.file && <MyError>{errors.file}</MyError>}
                        </Label>
                        <Tooltip data-tooltip="Выберите файл">
                            <Input
                                type="file"
                                accept="image/jpg, image/jpeg"
                                onChange={e =>
                                    setFile(
                                        e.target.files
                                            ? e.target.files[0]
                                            : null
                                    )
                                }
                            />
                        </Tooltip>
                    </FormGroup>
                </Part>

                <Part>
                    <FormGroup>
                        <Label>
                            История*{" "}
                            {errors.storyContent && (
                                <MyError>{errors.storyContent}</MyError>
                            )}
                        </Label>
                        <Tooltip data-tooltip="Введите от 50 до 6000 символов">
                            <StoryContent
                                value={storyContent}
                                onChange={e => setStoryContent(e.target.value)}
                                onBlur={validateContent}
                            />
                        </Tooltip>
                    </FormGroup>
                </Part>
            </StoryForm>

            <FormSubmit>
                <Button
                    type="submit"
                    onClick={() => {
                        if (validateForm()) {
                            setIsSubmitting(true);
                            setSuccessMessage("");

                            sendToServer(
                                title,
                                genre,
                                storyContent,
                                shortDescription,
                                file
                            )
                                .then(() => {
                                    // setSuccessMessage(
                                    //     "История успешно добавлена!"
                                    // );
                                    alert("История успешно добавлена!");
                                    setTitle("");
                                    setGenre("");
                                    setShortDescription("");
                                    setStoryContent("");
                                    setFile(null);
                                })
                                .catch(error => {
                                    console.error(
                                        "Ошибка при отправке:",
                                        error
                                    );
                                    // setSuccessMessage();
                                    alert(
                                        "Ошибка при добавлении истории. Вы уже добавляли такую историю. Введите другое название"
                                    );
                                })
                                .finally(() => {
                                    setIsSubmitting(false);
                                });
                        } else {
                            alert("Введены некорректные данные");
                        }
                    }}
                >
                    {/* disabled={isSubmitting} */}
                    {isSubmitting ? "Отправка..." : "Опубликовать"}
                </Button>
            </FormSubmit>

            {successMessage && <Success>{successMessage}</Success>}
        </Container>
    );
}
