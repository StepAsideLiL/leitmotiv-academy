import { BsGoogle } from "react-icons/bs";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import axiosInstance from "../utils/axiosInstance";
import { toastError, toastSuccess } from "../utils/toastMessages";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const { setUser, auth, googleProvider, login } = useFirebaseAuth();

  const navigate = useNavigate();

  const handleGoogleLoginBtn = () => {
    login(auth, googleProvider)
      .then((userInfo) => {
        setUser(userInfo.user);

        axiosInstance
          .post("/v1/users", {
            name: userInfo.user.displayName,
            email: userInfo.user.email,
            image: userInfo.user.photoURL,
            role: "student",
          })
          .then((res) => {
            if (res.data.acknowledged) {
              navigate("/");
              toastSuccess("Your logged in!");
            }
          })
          .catch((error) => {
            console.error(error);
            toastError("Login failed.");
          });
      })
      .catch((error) => {
        console.error(error);
        toastError("Login failed.");
      });
  };

  return (
    <>
      <button className="w-full btn" onClick={handleGoogleLoginBtn}>
        <BsGoogle />
        Google
      </button>
    </>
  );
};

export default GoogleLoginButton;
