import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/";

// TODO: for dashboards by id, tasks by id, CRUD for dashboards, tasks
const getDashboard = () => {
    return axios.get(API_URL + "dashboard", {
        headers: authHeader()
    })
};

const addTask = () => {
    return axios.get(API_URL + "task/add", {
        headers: authHeader()
    })
};

const addDashboard = () => {
    return axios.get(API_URL + "dashboard/add", {
        headers: authHeader()
    })
};

export default {
    getDashboard,
    addTask,
    addDashboard,
}
