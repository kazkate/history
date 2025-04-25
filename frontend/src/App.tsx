import React from "react";
import logo from "./logo.svg";
import "./App.css";

import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router";
import { MainRouter } from "./routers/MainRouter";
const router = createBrowserRouter(createRoutesFromElements(MainRouter()));
function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
