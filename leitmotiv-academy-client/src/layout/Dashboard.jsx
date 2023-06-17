import { BsHouseFill, BsJustify } from "react-icons/bs";
import NavMenuDashBasedOnRole from "../components/Dashboard/NavMenuDashBasedOnRole";
import { NavLink, Outlet } from "react-router-dom";
import useGetLoggedinUser from "../hooks/useGetLoggedinUser";

const Dashboard = () => {
  const { loggedinUser } = useGetLoggedinUser();

  const role = loggedinUser?.role;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-2"
          className="btn-primary drawer-button btn lg:hidden"
        >
          <BsJustify className="text-2xl" />
        </label>

        <div className="mx-10 my-12">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu h-full w-80 bg-base-200 p-4 text-base-content">
          {/* Sidebar content here */}

          <li>
            <NavLink to="/dashboard/home">
              <BsHouseFill /> Dashboard Home
            </NavLink>
          </li>

          <NavMenuDashBasedOnRole role={role} />

          <div className="divider"></div>

          <li>
            <NavLink to="/">
              <BsHouseFill /> Home
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
