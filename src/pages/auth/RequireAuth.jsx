import { Navigate } from "react-router-dom";
import { useStore } from "../../store/AppProvider";

export const RequireAuth = ({ children }) => {
  const { user } = useStore();
  if (!user) return <Navigate to="/login" />;

  return children;
};
