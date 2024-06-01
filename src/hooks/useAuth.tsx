import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (authContext === null) {
    throw new Error("useAuth hook is used outside of AuthProvider");
  }
  return authContext;
};

export default useAuth;
