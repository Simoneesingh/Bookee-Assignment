import axios from "axios";
import { appConfig } from "../config";

const axiosInstance = axios.create({
  baseURL: appConfig.apiUrl,
});

// console.log('process.env.REACT_APP_API_URL', process.env.REACT_APP_API_URL)

// show boom error in toaster globally
const errorInterceptor = (errorResponse) => {
  if (errorResponse) {
    // const { message, status } = errorResponse.data;
    // console.log('message, status', message, status)
  }
};

axiosInstance.interceptors.response.use(
  (req) => {
    return req;
  },
  (err) => {
    errorInterceptor(err.response);
    return Promise.reject(err);
  }
);

export default class HTTPService {
  static get(url, params) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(url, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error.response || error));
    });
  }

  static post(url, body) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(url, body)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error.response || error));
    });
  }
}
