import axios from "axios";

const API_URL = "http://localhost:8080/";

const register = (username, email, password) => {
    return axios.post(API_URL + "register", {
        username,
        email,
        password,
        roles: ["user_lvl_2"]
    });
};

const login = (username, password) => {
    return axios
    .post(API_URL + "login", {
        username,
        password
    })
    .then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
    });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default {
    register,
    login,
    logout,
    getCurrentUser
}
