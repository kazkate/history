import styled from "styled-components";
import { darkPrimary } from "../BaseStyle";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const H1 = styled.h1`
    font-size: 28px;
    margin: 20px 0;
    color: #333;
    margin-left: 5%;
`;

export const StoryForm = styled.form`
    font-size: 28px;
    margin: 20px 0;
    color: #333;
    display: flex;
    flex-direction: row;
    width: 90%;
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    margin-bottom: 8px;
    font-weight: bold;
    display: flex;
`;

export const Part = styled.div`
    display: inline;
    width: 50%;
    margin: auto 5%;
`;

export const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px 0;
    width: 100%;
`;
export const Select = styled.select`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px 0;
    width: 100%;
`;
export const Textarea = styled.textarea`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px 0;
    height: 150px;
    resize: none;
    width: 100%;
`;

export const StoryContent = styled.textarea`
    grid-column: span 2;
    height: 500px;
    width: 100%;
`;

export const AddBtnCon = styled.div`
    display: flex;
    justify-content: start;
`;

export const AddBtn = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #6b8f50;
    color: white;
    border: none;
    font-size: 20px;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    cursor: pointer;
`;

export const FormSubmit = styled.div`
    grid-column: span 2;
    display: flex;
    justify-content: center;
`;

export const Button = styled.button`
    background-color: #a7bf90;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 60px;

    &:hover {
        background-color: #8ca97a;
    }
`;
// Стили всплывающих подсказок
export const Tooltip = styled.div`
    position: relative;
    display: inline-block;

    &:hover::after {
        content: attr(data-tooltip);
        position: absolute;
        left: 50%;
        bottom: -25px;
        transform: translateX(-50%);
        background: black;
        color: white;
        font-size: 12px;
        padding: 5px;
        border-radius: 5px;
        white-space: nowrap;
    }
`;

// Ошибки
export const MyError = styled.div`
    color: red;
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-left: 50px;
`;

// Сообщение об успехе
export const Success = styled.div`
    color: green;
    font-size: 14px;
    margin-top: 10px;
`;
