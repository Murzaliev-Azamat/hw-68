import axios from "axios";

const axiosApi = axios.create({
  baseURL: 'https://js-17-779e1-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default axiosApi;