import useFirebaseAuth from "../../../hooks/useFirebaseAuth";
import NavMenuList from "./NavMenuList";
import { Link } from "react-router-dom";
import NavProfileMenu from "./NavProfileMenu";

const NavEnd = () => {
  const { user } = useFirebaseAuth();

  return (
    <>
      <div className="navbar-end">
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal space-x-2 px-1">
            <NavMenuList />
          </ul>
        </div>

        {user ? (
          <>
            <Link to="dashboard/home" className="btn-accent btn mx-3">
              Dashboard
            </Link>

            <NavProfileMenu />
          </>
        ) : (
          <Link to="/login" className="btn-accent btn">
            Login
          </Link>
        )}
      </div>
    </>
  );
};

export default NavEnd;
