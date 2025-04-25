import { Outlet, Route, useNavigate } from "react-router";
import { DefaultHeader } from "../components/Header/DefaultHeader";
import { MainPage } from "../pages/MainPage";
import { LoginPage } from "../pages/LoginPage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { StoriesPage } from "../pages/StoriesPage";
import { StoryPage } from "../pages/StoryPage";
import { AddStoryPage } from "../pages/AddStoryPage";
import { Footer } from "../components/Footer/Footer";
import { Container } from "./style";

export function Layout() {
    return (
        <Container>
            <DefaultHeader />
            <div>
                <Outlet />
            </div>
            <Footer />
        </Container>
    );
}

export function MainRouter() {
    return (
        <>
            <Route element={<Layout />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/stories" element={<StoriesPage />} />
                <Route path="story/:id" element={<StoryPage />} />
                <Route path="/addStory" element={<AddStoryPage />} />
            </Route>
        </>
    );
}
