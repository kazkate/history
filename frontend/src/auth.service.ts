import client, { clientSetHeader } from "./user.service";

export const authorize = async (login: string, password: string) => {
    const formData = new FormData();
    formData.append("login", login);
    formData.append("password", password);
    try {
        const { data } = await client.post("/Login", formData);
        console.log(data);
        const userInfo = { login: login, password: password };
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        sessionStorage.setItem("isAuthenticated", "true");

        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        clientSetHeader("Authorization", `Basic ${true}`);
        // document.location.reload();
        return data;
    } catch (e) {
        // console.log(e);
        //alert("ERROR");
        localStorage.setItem("isAuthenticated", "false");
        sessionStorage.setItem("isAuthenticated", "false");
        throw e;
    }
};

export function logout() {
    // Удаляем информацию о логине со всех стораджей
    localStorage.removeItem("userInfo");
    localStorage.removeItem("isAuthenticated");

    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("isAuthenticated");
    clientSetHeader("Authorization", `Basic ${false}`);
    // document.location.reload();
    // this.authChanged.emit();
    // this.router.navigate([""]);
}

export function isAuthenticated(): boolean {
    const isAuthenticatedLocal =
        localStorage.getItem("isAuthenticated") == "true";
    const isAuthenticatedSession =
        sessionStorage.getItem("isAuthenticated") == "true";

    return isAuthenticatedLocal || isAuthenticatedSession;
}

type JSONInfo = {
    login: string;
    password: string;
};

export function isAdmin(): boolean {
    let infoSession = sessionStorage.getItem("userInfo");
    let infoLocal = sessionStorage.getItem("userInfo");
    let session: JSONInfo = JSON.parse(infoSession!);
    let local: JSONInfo = JSON.parse(infoLocal!);
    console.log("infoSession - " + infoSession);
    console.log("infoLocal - " + infoLocal);
    console.log("session - " + session);
    console.log("local - " + local);
    //alert(j + j.login + j.password)
    let keySession: boolean = session.login == "admin" ? true : false;
    let keyLocal: boolean = local.login == "admin" ? true : false;

    return isAuthenticated() && (keySession || keyLocal);
}

export function getLogin(): string {
    let infoSession = sessionStorage.getItem("userInfo");
    let session: JSONInfo = JSON.parse(infoSession!);
    return session.login;
}
