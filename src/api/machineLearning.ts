import axios from "axios";

const BASE_URL = "https://potato-disease-cnn-deploy.herokuapp.com/api";

export default axios.create({ baseURL: BASE_URL });
