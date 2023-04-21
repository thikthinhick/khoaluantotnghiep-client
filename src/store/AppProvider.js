import { createContext, useContext, useState, useMemo } from "react";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";

import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const API_URL = "http://localhost:8081/api/auth/";
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage("user", null);
  const [loading, setLoading] = useState(false);
  const login = async (form) => {
    const { username, password, remember } = form;
    setLoading(true);
    const response = await axios.post(API_URL + "signin", {
      username,
      password,
    });

    if (response.status === 200) {
      const ttl = remember ? 1000 * 60 * 60 * 24 * 7 : 1000 * 10;
      setUser(response.data, ttl);
      setTimeout(() => {
        setLoading(false);
        navigate("/", { replace: true });
      }, 500);
    }
  };
  const signup = async (form) => {
    const { email, password, username } = form;
    setLoading(true);
    const response = await axios.post(API_URL + "signup", {
      username,
      password,
      email,
    });
    if (response.status === 200) {
      navigate("/");
    }
    setLoading(false);
  };
  const signout = () => {
    setUser(null, 0);
  };
  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      signup,
      signout,
      setUser,
      setLoading,
    }),
    [user, loading]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useStore = () => {
  return useContext(AuthContext);
};
