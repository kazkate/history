import { useState } from "react";
import { useNavigate } from "react-router";
import {
    FooterContainer,
    FormContainer,
    Img,
    RegButton,
    Title,
} from "../Registration/style";
import { FormRow } from "../Registration/Registration";
import { Button } from "../BaseStyle";
import { Container } from "./style";
import axios from "axios";
import { authorize } from "../../auth.service";
import { Close } from "../BaseStyle";
import { Message } from "../Message/Massege";
import { Dialog } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const client = axios.create({ baseURL: "https://localhost:5001" });
async function sendToServer(login: string, password: string) {
    // try {await
    return authorize(login, password);
    // } catch (e) {
    //     // console.log(e);

    //     throw e;
    // }
}

export function Login() {
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
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
                <Title>Авторизация</Title>
                <FormContainer>
                    <FormRow
                        name="Логин"
                        placeHolder="ivanushka"
                        value={login}
                        type="text"
                        onChange={handleLoginChange}
                    />
                    <FormRow
                        name="Пароль"
                        value={password}
                        type="password"
                        onChange={handlePasswordChange}
                    />
                    <RegButton
                        onClick={
                            () => {
                                sendToServer(login, password)
                                    .then(() => {
                                        navigate("/");
                                    })
                                    .catch(error => {
                                        handleErrorMess(
                                            "Пользователя с такими учетными данными не существует!"
                                        );
                                        setOpen(true);
                                    });
                            }
                            // async () => await sendToServer(login, password)
                        }
                    >
                        Войти
                    </RegButton>
                </FormContainer>
            </Container>
            <FooterContainer>
                <p>Еще нет аккаунта?</p>
                <Button onClick={() => navigate("/registration")}>
                    Зарегистрироваться
                </Button>
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
