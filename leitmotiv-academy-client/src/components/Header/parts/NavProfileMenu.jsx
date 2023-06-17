import { useEffect, useState } from "react";
import useFirebaseAuth from "../../../hooks/useFirebaseAuth";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../utils/toastMessages";

const NavProfileMenu = () => {
  const { user, setUser, auth, logout } = useFirebaseAuth();
  const [userImage, setUserImage] = useState(null);
  const navigate = useNavigate();

  const imageUrl = user.photoURL;

  useEffect(() => {
    const img = new Image();

    img.onload = function () {
      setUserImage(
        <img src={imageUrl} alt={`Profile Picture of ${user.displayName}`} />
      );
    };

    img.onerror = function () {
      setUserImage(<BsPersonCircle className="text-[60px] text-gray-600" />);
    };

    img.src = imageUrl;
  }, [imageUrl, user.displayName]);

  const handleLogout = () => {
    logout(auth)
      .then(() => {
        setUser(null);
        navigate("/");
        toastSuccess("Logout Successful!");
      })
      .catch((error) => {
        console.error(error);
        toastError("Logout Failed!");
      });
  };

  return (
    <div>
      <div className="dropdown-end dropdown">
        <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
          <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
            <div className="flex h-full items-center justify-center">
              {userImage}
            </div>
          </div>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box menu-sm z-50 mt-3 w-52 bg-base-100 p-2 shadow"
        >
          <li>
            <Link to="/dashboard/home">Profile</Link>
          </li>

          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavProfileMenu;
