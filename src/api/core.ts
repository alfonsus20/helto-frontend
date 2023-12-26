import axios from "axios";

const BASE_URL = "https://helto-be-three.vercel.app";

export default axios.create({
  baseURL: BASE_URL,
});
