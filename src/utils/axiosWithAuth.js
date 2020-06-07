import axios from "axios";

const axiosWithAuth = () =>
  axios.create({
    baseURL: "https://db-users-auth.herokuapp.com/api",
  });

export default axiosWithAuth;
