import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://rovigo-api.vercel.app/api/",
  withCredentials: true,
});

export default newRequest;
