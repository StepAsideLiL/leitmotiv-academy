import { NavLink } from "react-router-dom";

const NavMenuList = () => {
  return (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/instructors">Instructors</NavLink>
      </li>

      <li>
        <NavLink to="/classes">Classes</NavLink>
      </li>
    </>
  );
};

export default NavMenuList;
