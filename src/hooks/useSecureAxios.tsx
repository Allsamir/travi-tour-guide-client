import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase.config";

const secureAxios = axios.create({
  baseURL: "https://assignment-12-server-gamma-snowy.vercel.app/api",
  withCredentials: true,
});

const useSecureAxios = () => {
  secureAxios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  secureAxios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      console.log(error);
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        await signOut(auth).then(() => console.log("user signout"));
      }
      return Promise.reject(error);
    },
  );
  return secureAxios;
};

export default useSecureAxios;
