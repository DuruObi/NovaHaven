import axios from "axios";

const API = axios.create({
  baseURL: "https://novahaven-wsys.onrender.com/api",
});

export default API;