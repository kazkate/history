import styled from "styled-components";
import { Button, darkPrimary } from "../BaseStyle";

export const Container = styled.div`
    width: 55%;
    margin: auto;
    margin-top: 3%;
    border: 1px solid ${darkPrimary};
    border-radius: 28px;
    min-width: 290px;
`;
export const Title = styled.p`
    text-align: center;
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 5px;
`;
export const Img = styled.img`
    min-width: 100px;
    width: 25%;
    position: fixed;
    left: 0;
    bottom: 0;
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

export const RegButton = styled(Button)`
    margin: 15px auto;
`;

export const FooterContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    min-width: 250px;
    width: 30%;
    margin: 15px auto;
    justify-content: space-around;
    align-items: center;
`;

export const ErrorMess = styled.div`
    color: red;
    font-size: 10px;
    margin: auto;
`;
