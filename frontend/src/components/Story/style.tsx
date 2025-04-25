import styled from "styled-components";
import { accentGreenColor, darkPrimary } from "../BaseStyle";

export const Container = styled.div``;
export const StoryContainer = styled.div`
    display: flex;
    /* gap: 20px; */
    margin-bottom: 30px;
    margin-top: 10px;
    height: 250px;
`;

export const SliderContainer = styled.div`
    /* position: relative; */
    width: 50%;
    max-height: 300px;
    /* overflow: hidden; */
    display: flex;
    align-items: center;
`;
export const StoryCardImg = styled.img`
    max-width: 500px;
    height: auto;
    max-height: 200px;
    margin: auto;
`;
export const NotPicture = styled.div`
    width: 300px;
    height: 250px;
    margin: auto;
    background-color: ${accentGreenColor};
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
`;
export const Pagbutton = styled.button`
    background-color: ${accentGreenColor};
    border: none;
    height: 25px;
    width: 70px;
`;
export const PagContainer = styled.div`
    margin: auto;
    margin-bottom: 10px;
    width: 300px;
`;
export const StoryInfo = styled.div`
    flex: 1;
    width: 30%;
    font-size: 18px;
    max-height: 200px;
`;

export const P = styled.p`
    margin: 5px 0;
`;

export const StoryText = styled.p`
    margin: 20px auto;
    width: 70%;
    font-size: 24px;
    text-indent: 5%;
    min-height: 400px;
    word-wrap: normal;
    text-align: justify;
    white-space: pre-wrap;
`;

export const ScrollToTopBtn = styled.button`
    display: none;
    position: fixed;
    bottom: 20px;
    right: 30px;
    z-index: 99;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #555;
    }
`;
