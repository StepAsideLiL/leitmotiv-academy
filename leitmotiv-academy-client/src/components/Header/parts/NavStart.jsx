import { BsJustify } from "react-icons/bs";
import NavMenuList from "./NavMenuList";
import NavBrand from "./NavBrand";
import ToggleLightAndDarkTheme from "./ToggleLightAndDarkTheme";

const NavStart = () => {
  return (
    <>
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn lg:hidden">
            <BsJustify className="text-2xl" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-sm z-50 mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <NavMenuList />
          </ul>
        </div>

        <NavBrand />

        <ToggleLightAndDarkTheme />
      </div>
    </>
  );
};

export default NavStart;
