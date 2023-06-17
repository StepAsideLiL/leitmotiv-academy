import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../utils/firebase.config";
import axiosInstance from "../utils/axiosInstance";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  // const aUser = {
  //   email: "aaa@aaa.aaa",
  //   displayName: "Aras Baras",
  //   photoURL: "https://images2.imgbox.com/c8/e2/H7KO77Nh_o.png"
  // };

  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const login = (authObj, provider) => {
    setIsAuthLoading(true);
    return signInWithPopup(authObj, provider);
  };

  const createUser = (authInfo, email, password) => {
    setIsAuthLoading(true);
    return createUserWithEmailAndPassword(authInfo, email, password);
  };

  const loginWithPassword = (authInfo, email, password) => {
    setIsAuthLoading(true);
    return signInWithEmailAndPassword(authInfo, email, password);
  };

  const logout = (authObj) => {
    setIsAuthLoading(true);
    return signOut(authObj);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userInfo) => {
      setUser(userInfo);

      if (userInfo) {
        axiosInstance.post("/v1/jwt", { email: userInfo.email }).then((res) => {
          localStorage.setItem("accessToken", res.data.token);
          setIsAuthLoading(false);
        });
      } else {
        localStorage.removeItem("accessToken");
      }
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    isAuthLoading,
    auth,
    googleProvider,
    login,
    createUser,
    loginWithPassword,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
