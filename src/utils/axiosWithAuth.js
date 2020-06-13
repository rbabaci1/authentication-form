import axios from "axios";

const axiosWithAuth = () =>
  axios.create({
    baseURL: "https://sprint-stretch.herokuapp.com/api",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

export default axiosWithAuth;
