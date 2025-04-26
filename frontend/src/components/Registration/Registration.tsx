import { useState } from "react";
import { useNavigate } from "react-router";
import {
    Container,
    ErrorMess,
    FooterContainer,
    FormContainer,
    Img,
    RegButton,
    Title,
} from "./style";
import { Button, Input, Lable, RowContainer } from "../BaseStyle";
import axios from "axios";
import { authorize } from "../../auth.service";
import { Close } from "../BaseStyle";
import { Message } from "../Message/Massege";
import { Dialog } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export interface UserInfo {
    login: string;
    authData: string;
}

// const client = axios.create({ baseURL: "https://localhost:5001" });
const client = axios.create({ baseURL: "/api/" });

async function sendToServer(
    lastName: string,
    name: string,
    email: string,
    login: string,
    password: string
) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("login", login);
    formData.append("password", password);
    return client.post("/Register", formData).then(function (response: any) {
        console.log(response);
        const authData = window.btoa(login + ":" + password);
        const userInfo: UserInfo = { login: login, authData: authData };
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        sessionStorage.setItem("isAuthenticated", "true");
        authorize(login, password);
    });
    // .catch(function (error: any) {
    //     console.log(error);
    //     throw error;
    // });
}

export function Registration() {
    const validateLastName = (input: string) => {
        if (input.trim() === "") {
            return "Поле не должно быть пустым";
        }
        if (input.length < 2) {
            return "Длина должна быть не менее 2 символов";
        }
        if (input.length > 25) {
            return "Длина должна быть не более 25 символов";
        }
        return "";
    };
    const validateName = (input: string) => {
        if (input.trim() === "") {
            return "Поле не должно быть пустым";
        }
        if (input.length < 2) {
            return "Длина должна быть не менее 2 символов";
        }
        if (input.length > 25) {
            return "Длина должна быть не более 25 символов";
        }
        return "";
    };
    const validateEmail = (input: string) => {
        if (input.trim() === "") {
            return "Поле не должно быть пустым";
        }
        if (input.length < 5) {
            return "Длина должна быть не менее 5 символов";
        }
        if (input.length > 50) {
            return "Длина должна быть не более 50 символов";
        }
        return "";
    };
    const validateLogin = (input: string) => {
        if (input.trim() === "") {
            return "Поле не должно быть пустым";
        }
        if (input.length < 6) {
            return "Длина должна быть не менее 6 символов";
        }
        if (input.length > 15) {
            return "Длина должна быть не более 15 символов";
        }
        return "";
    };
    const validatePassword = (input: string) => {
        if (input.trim() === "") {
            return "Поле не должно быть пустым";
        }
        if (input.length < 6) {
            return "Длина должна быть не менее 6 символов";
        }
        if (input.length > 15) {
            return "Длина должна быть не более 15 символов";
        }
        return "";
    };
    const validateConfirmPassword = (input: string) => {
        if (input.trim() === "") {
            return "Поле не должно быть пустым";
        }
        if (input.trim() != password) {
            return "Пароли не совпадают";
        }
        return "";
    };
    const [errorLastName, setErrorLastName] = useState("");
    const [errorName, setErrorName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorLogin, setErrorLogin] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const navigate = useNavigate();
    const [lastName, setLastName] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
        const errorMessage = validateLastName(e.target.value);
        setErrorLastName(errorMessage);
    };
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        const errorMessage = validateName(e.target.value);
        setErrorName(errorMessage);
    };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        const errorMessage = validateEmail(e.target.value);
        setErrorEmail(errorMessage);
    };
    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
        const errorMessage = validateLogin(e.target.value);
        setErrorLogin(errorMessage);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        const errorMessage = validatePassword(e.target.value);
        setErrorPassword(errorMessage);
    };
    const handleConfirmPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setConfirmPassword(e.target.value);
        const errorMessage = validateConfirmPassword(e.target.value);
        setErrorConfirmPassword(errorMessage);
    };
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const [errorMess, seterrorMess] = useState("");
    const handleErrorMess = (mess: string) => {
        seterrorMess(mess);
    };
    return (
        <>
            <Img src="./static/images/loginregister.png" />
            <Container>
                <Title>Регистрация</Title>
                <FormContainer>
                    <FormRow
                        name="Имя"
                        placeHolder="Иван"
                        value={name}
                        type="text"
                        onChange={handleNameChange}
                    />
                    {errorName && <ErrorMess>{errorName}</ErrorMess>}
                    <FormRow
                        name="Фамилия"
                        placeHolder="Иванов"
                        value={lastName}
                        type="text"
                        onChange={handleLastNameChange}
                    />
                    {errorLastName && <ErrorMess>{errorLastName}</ErrorMess>}

                    <FormRow
                        name="Почта"
                        placeHolder="ivanovIvan@gmail.com"
                        value={email}
                        type="email"
                        onChange={handleEmailChange}
                    />
                    {errorEmail && <ErrorMess>{errorEmail}</ErrorMess>}
                    <FormRow
                        name="Логин"
                        placeHolder="ivanushka"
                        value={login}
                        type="text"
                        onChange={handleLoginChange}
                    />
                    {errorLogin && <ErrorMess>{errorLogin}</ErrorMess>}
                    <FormRow
                        name="Пароль"
                        value={password}
                        type="password"
                        onChange={handlePasswordChange}
                    />
                    {errorPassword && <ErrorMess>{errorPassword}</ErrorMess>}
                    <FormRow
                        name="Подтвердите пароль"
                        value={confirmPassword}
                        type="password"
                        onChange={handleConfirmPasswordChange}
                    />
                    {errorConfirmPassword && (
                        <ErrorMess>{errorConfirmPassword}</ErrorMess>
                    )}
                    <RegButton
                        onClick={() => {
                            if (
                                errorConfirmPassword ||
                                errorPassword ||
                                errorLogin ||
                                errorEmail ||
                                errorName ||
                                errorLastName
                            ) {
                                handleErrorMess("Поля заполнены некорректно!");
                                setOpen(true);
                                // alert("Поля заполнены некорректно!");
                            } else if (
                                confirmPassword &&
                                password &&
                                login &&
                                email &&
                                name &&
                                lastName
                            ) {
                                sendToServer(
                                    lastName,
                                    name,
                                    email,
                                    login,
                                    password
                                )
                                    .then(() => {
                                        navigate("/");
                                    })
                                    .catch(error => {
                                        handleErrorMess(
                                            "Такой логин уже зарегестрирован!"
                                        );
                                        setOpen(true);
                                        // alert(
                                        //     "Такой логин уже зарегестрирован!"
                                        //     // "Произошла ошибка при регистрации: " +
                                        //     //     error.message
                                        // );
                                    });
                            } else {
                                handleErrorMess("Заполнены не все поля!");
                                setOpen(true);
                                // alert("Заполнены не все поля!");
                            }
                        }}
                    >
                        Зарегистрироваться
                    </RegButton>
                </FormContainer>
            </Container>
            <FooterContainer>
                <p>Уже есть аккаунт?</p>
                <Button onClick={() => navigate("/login")}>Войти</Button>
            </FooterContainer>
            <Dialog
                fullWidth={true}
                style={{ padding: 0, height: 500 }}
                open={open}
                onClose={handleClose}
            >
                <Close onClick={handleClose}>
                    <CancelOutlinedIcon fontSize="large" />
                </Close>
                <Message mess={errorMess} />
            </Dialog>
        </>
    );
}
export interface FormRowProps {
    name: string;
    placeHolder?: string;
    type?: string;
    id?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export function FormRow(props: FormRowProps) {
    return (
        <RowContainer>
            <Lable>{props.name}</Lable>
            <Input
                placeholder={props.placeHolder}
                value={props.value}
                type={props.type}
                id={props.id}
                onChange={props.onChange}
            />
        </RowContainer>
    );
}
