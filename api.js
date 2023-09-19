import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV !== "production"
      ? "http://127.0.0.1:8000/"
      : "https://backend.roles.kr/",
});

export const mealsApi = {
  findAll: () => api.get(`/meal-schedule/`).then((res) => res.data),
};
