import styled from "styled-components";
import { accentGreenColor, darkPrimary } from "../BaseStyle";

export const Container = styled.div`
    display: flex;
    padding: 20px;
`;
export const Content = styled.div`
    margin-left: 250px;
`;

export const Sidebar = styled.aside`
    width: 200px;
    background-color: #e8f1d6;
    padding: 15px;
    border-radius: 8px;
    position: fixed;
    right: 10;
    top: 50;
`;

export const List = styled.ul`
    list-style: none;
    padding: 0;
`;

export const Listli = styled.li`
    margin-bottom: 10px;
`;

export const StoriesContent = styled.div`
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding-left: 20px;
    min-height: 675px;
`;

export const StoryCard = styled.div`
    display: flex;
    background-color: #d4e5b1;
    border: 2px solid #c3d7ae;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    max-height: 250px;
    align-items: center;
    position: relative;
`;
export const NotPicture = styled.div`
    width: 250px;
    height: 200px;
    margin: auto;
    background-color: ${accentGreenColor};
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
`;
export const StoryCardImg = styled.img`
    max-width: 250px;
    height: auto;
    border-radius: 4px;
    max-height: 200px;
    margin: auto;
`;
export const ContainerForImg = styled.div`
    width: 250px;
    height: 200px;
    margin-right: 15px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    /* justify-content: center; */
`;
export const ContainerForInfo = styled.div`
    width: 550px;
    display: flex;
    flex-direction: column;
    height: 200px;
`;

export const StoryInfo = styled.div`
    color: #4a5c3d;
    font-size: 14px;
    width: 550px;
    height: 175px;
`;

export const DateContainer = styled.p`
    text-align: right;
    color: #6b8f50;
    font-size: 12px;
    margin-bottom: 0;
`;

export const Button = styled.button`
    display: flex;
    margin: auto;
    background-color: white;
    border-radius: 15px;
    border-color: aquamarine;
`;

export const H1 = styled.h1`
    margin-left: 20px;
`;
export const SearchInput = styled.input`
    width: 300px;
    height: 30px;
`;
export const SearchInputContainer = styled.div`
    margin: 10px;
    margin-left: 20px;
    display: flex;
`;

export const SearchButton = styled.button`
    height: 39px;
    background-color: #c3d7ae;
    border: none;
    border-radius: 0px 4px 4px 0px;
`;
