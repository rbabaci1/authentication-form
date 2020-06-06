import axios from "axios";

const axiosWithAuth = () =>
  axios.create({
    baseURL: "https://auth-users-tokens.herokuapp.com/api",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

export default axiosWithAuth;
