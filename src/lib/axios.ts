import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.81.220:3333/",
});
