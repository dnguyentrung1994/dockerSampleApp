import axios from "axios";

const HttpApi = axios.create({
  baseURL: "/",
});

export default HttpApi;
