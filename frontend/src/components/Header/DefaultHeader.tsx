import { useNavigate } from "react-router";
import Header from "./Header";
import { isAuthenticated, logout } from "../../auth.service";

interface Props {}

export function DefaultHeader(props: Props) {
    const navigate = useNavigate();
    let log = isAuthenticated();

    return (
        <Header
            onLogoClicked={() => navigate("/")}
            onProfileClicked={() =>
                log ? navigate("/addStory") : navigate("/login")
            }
            onExitClicked={() =>
                log
                    ? (logout(), navigate("/login"), document.location.reload())
                    : navigate("/registration")
            }
            login={log}
            onCatalogClicked={() => navigate("/stories")}
        />
    );
}
