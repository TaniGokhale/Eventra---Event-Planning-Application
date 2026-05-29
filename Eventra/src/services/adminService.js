import axios from "axios";

const API = "http://localhost:5000/api/admin";

export const loginAdmin = async (data) => {
  return axios.post(`${API}/login`, data);
};