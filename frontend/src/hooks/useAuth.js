import { useState } from "react";
import API from "../api/axiosConfig";

const useAuth = () => {
  const [error, setError] = useState(null);

  const login = async (data) => {
    try {
      const response = await API.post("/login/", data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return { login, error };
};

export default useAuth;
