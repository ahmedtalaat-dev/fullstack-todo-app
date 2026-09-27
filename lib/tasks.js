import { apiRequest } from "./api";

export const getTasks = (token) => apiRequest("/api/tasks", { token });

export const createTask = (token, payload) =>
  apiRequest("/api/tasks", {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  });

export const updateTask = (token, id, payload) =>
  apiRequest(`/api/tasks/${id}`, {
    method: "PUT",
    token,
    body: JSON.stringify(payload),
  });

export const deleteTask = (token, id) =>
  apiRequest(`/api/tasks/${id}`, { method: "DELETE", token });
