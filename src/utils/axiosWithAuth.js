import axios from "axios";

const axiosWithAuth = () =>
  axios.create({
    baseURL: "https://users-auth-postgres.herokuapp.com/api",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export default axiosWithAuth;
