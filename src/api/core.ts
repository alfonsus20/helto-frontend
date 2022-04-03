import axios from "axios";

const BASE_URL = "https://helto-be-new.vercel.app";

export default axios.create({
  baseURL: BASE_URL,
});
