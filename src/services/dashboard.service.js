import http from "../http-common";

const create = data => {
    return http.post("/dashboard/add", data);
};

const getAll = data => {
    return http.get("/dashboard/all");
};

const get = id => {
    return http.get(`/dashboard/${id}`);
};

const getTasks = id => {
    return http.get(`/dashboard/${id}/tasks`);
};

const update = (id, data) => {
    return http.put(`/dashboard/${id}/edit`, data);
};

const deleteDashboard = id => {
    return http.delete(`/dashboard/${id}`);
};

export default {
    create,
    getAll,
    get,
    getTasks,
    update,
    deleteDashboard
}