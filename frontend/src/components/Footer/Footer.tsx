import { Container, MyText } from "./style";

export function Footer() {
    return (
        <Container>
            <MyText>
                Связь с нами:
                <a href="mailto:worldOfStories@yandex.ru">
                    worldOfStories@yandex.ru
                </a>
            </MyText>
            <MyText>Самара, 2024</MyText>
        </Container>
    );
}
