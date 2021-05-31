import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

export default axios.create({
  baseURL: "http://localhost:8080",
  headers: (user && user.accessToken) ? {
        "x-access-token": user.accessToken,
        "Content-type": "application/json"
    } : {
        "Content-type": "application/json"
    }
});