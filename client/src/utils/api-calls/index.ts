import axios from "axios";

const HttpApi = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE,
});

export default HttpApi;
