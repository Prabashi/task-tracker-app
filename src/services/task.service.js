import http from "../http-common";

const create = data => {
    return http.post("/task/add", data);
};

const getAll = data => {
    return http.get("/task/all");
};

const get = id => {
    return http.get(`/task/${id}`);
};

const getTasksByDashboard = id => { // TODO
    return http.get(`/dashboard/${id}/tasks`);
};

const updateTask = (id, data) => {
    return http.patch(`/task/${id}/update`, data);
};

const deleteTask = id => {
    return http.delete(`/task/${id}`);
};

export default {
    create,
    getAll,
    get,
    getTasksByDashboard,
    updateTask,
    deleteTask
}