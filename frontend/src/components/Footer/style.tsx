import styled from "styled-components";
import { darkPrimary } from "../BaseStyle";

export const Container = styled.div`
    /* display: flex;
    padding-left: 0px;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    min-height: 70px;
    margin-top: 0px; */
    margin-bottom: -15px;
    background-color: ${darkPrimary};
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 5px;
`;

export const MyText = styled.p`
    margin: 5px auto;
`;
