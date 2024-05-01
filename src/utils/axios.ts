import axios from "axios";
import applyMockAdapter from "./mocks/apiMockData";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5173",
});

const someConfigToUseMock = true;

if (someConfigToUseMock) {
  applyMockAdapter(axiosInstance);
}

export default axiosInstance;
