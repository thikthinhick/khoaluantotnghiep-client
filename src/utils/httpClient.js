import axios from "axios";
export const httpClient = () => {
  return axios.create({
    baseURL: "http://localhost:8081",
    headers: {
      Accept: "application/json",
      Authorization: JSON.parse(localStorage.getItem("user"))
        ? "Bearer " + JSON.parse(localStorage.getItem("user")).value.token
        : "",
    },
  });
};
