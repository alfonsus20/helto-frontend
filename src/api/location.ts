import axios from "axios";

const BASE_URL = "https://dev.farizdotid.com/api/daerahindonesia";

export default axios.create({
  baseURL: BASE_URL,
});
