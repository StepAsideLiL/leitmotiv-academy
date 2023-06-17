import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useFirebaseAuth = () => {
  return useContext(AuthContext);
};

export default useFirebaseAuth;
