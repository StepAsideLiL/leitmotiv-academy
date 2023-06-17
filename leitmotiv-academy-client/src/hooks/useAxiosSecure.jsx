import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFirebaseAuth from "./useFirebaseAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { auth, logout } = useFirebaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logout(auth);
          navigate("/login");
        }

        return Promise.reject(error);
      }
    );
  }, [logout, navigate, auth]);

  return { axiosSecure };
};

export default useAxiosSecure;
