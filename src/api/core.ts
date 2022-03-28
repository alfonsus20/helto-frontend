import axios from "axios";

const BASE_URL = "https://helto-be.vercel.app";

export default axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: localStorage.getItem("token") || "" },
});
