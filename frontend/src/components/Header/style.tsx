import styled from "styled-components";
import { darkPrimary } from "../BaseStyle";

export const Container = styled.div`
    display: flex;
    padding-left: 0px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: end;
    width: 100%;
    min-height: 70px;
    margin-top: 0px;
    background-color: ${darkPrimary};
`;

export const Button = styled.button`
    background-color: ${darkPrimary};
    border: none;
    margin: auto 10px;
    height: 40px;
    width: auto;
    font-size: 16px;
`;
