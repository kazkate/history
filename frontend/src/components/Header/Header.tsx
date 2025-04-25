import { Container, Button } from "./style";

import { getLogin, isAuthenticated } from "../../auth.service";

interface HeaderProps {
    login: boolean;
    onLogoClicked: () => void;
    onProfileClicked: (login: boolean) => void;
    onExitClicked: (login: boolean) => void;
    onCatalogClicked: () => void;
}

export function Header(props: HeaderProps) {
    let login;
    if (isAuthenticated()) {
        login = getLogin();
    } else login = "";

    return (
        <>
            <Container>
                <Button onClick={() => props.onLogoClicked()}>Главная</Button>
                <Button onClick={() => props.onCatalogClicked()}>
                    Каталог историй
                </Button>
                {props.login ? (
                    <Button onClick={() => props.onProfileClicked(props.login)}>
                        Добавить историю
                    </Button>
                ) : (
                    <Button onClick={() => props.onProfileClicked(props.login)}>
                        Авторизоваться
                    </Button>
                )}
                {props.login ? (
                    <Button onClick={() => props.onExitClicked(props.login)}>
                        Выйти
                    </Button>
                ) : (
                    <Button onClick={() => props.onExitClicked(props.login)}>
                        Регистрация
                    </Button> //navigate("/registration")
                )}
            </Container>
        </>
    );
}

export default Header;
