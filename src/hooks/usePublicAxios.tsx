import axios from "axios";

const publicAxios = axios.create({
  baseURL: "https://assignment-12-server-gamma-snowy.vercel.app/api",
});

const usePublicAxios = () => {
  return publicAxios;
};

export default usePublicAxios;
