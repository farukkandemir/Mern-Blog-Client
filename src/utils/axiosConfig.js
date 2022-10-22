import axios from "axios";

const env = process.env.REACT_APP_NODE_ENV; // current environment

export const app = axios.create({
  baseURL:
    env === "production"
      ? "https://mern-blog-api.onrender.com" // production
      : "http://localhost:4000/", // development
});
