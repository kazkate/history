import axios from "axios";
import { UserInfo } from "./components/Registration/Registration";
const isAuthenticated = localStorage.getItem("isAuthenticated");

// const client = axios.create({ baseURL: "http://localhost:5001" });
const client = axios.create({ baseURL: "/" });

export function clientSetHeader(name: string, value: string) {
    if (value) {
        client.defaults.headers[name] = value;
    }
}

export function credentialsToUriEncoding(login: string, password: string) {
    const str = login + ":" + password;

    return window.btoa(encodeURIComponent(str));
}
export function loginfun(login: string, password: string, rememberMe: boolean) {
    const formData = new FormData();

    formData.append("login", login);
    formData.append("password", password);

    const storage = sessionStorage; //rememberMe ? localStorage :

    client
        .post("/Login", formData, {
            headers: { Authorization: `Basic ${true}` },
        })
        .then(() => {
            const authData = credentialsToUriEncoding(login, password);
            const userInfo: UserInfo = {
                login: login,
                authData: authData,
            };
            storage.setItem("userInfo", JSON.stringify(userInfo));
            storage.setItem("isAuthenticated", "true");
        })
        .catch(function (error: any) {
            console.log(error);
        });
}

export function getUserInfo(): UserInfo {
    let user = JSON.parse(localStorage.getItem("userInfo")!) as UserInfo;
    if (user == null) {
        user = JSON.parse(sessionStorage.getItem("userInfo")!) as UserInfo;
    }
    return user;
}

client.interceptors.request.use(
    config => {
        if (!config.headers.Authorization) {
            //alert("не авторизованы!");
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default client;
