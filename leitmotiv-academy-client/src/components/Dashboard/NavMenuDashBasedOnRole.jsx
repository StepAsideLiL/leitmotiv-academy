import PropTypes from "prop-types";
import {
  BsFileEarmarkCheckFill,
  BsFileEarmarkFill,
  BsFillPenFill,
  BsJournal,
  BsJournalPlus,
  BsPeopleFill,
} from "react-icons/bs";
import { BiMoney } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const NavMenuDashBasedOnRole = ({ role }) => {
  if (role === "admin") {
    return (
      <>
        <li>
          <NavLink to="/dashboard/admin/manage-users">
            <BsPeopleFill /> Manage Users
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/admin/manage-classes">
            <BsFillPenFill /> Manage Classes
          </NavLink>
        </li>
      </>
    );
  }

  if (role === "instructor") {
    return (
      <>
        <li>
          <NavLink to="/dashboard/instructor/my-classes">
            <BsJournal /> My Classes
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/instructor/add-class">
            <BsJournalPlus /> Add Class
          </NavLink>
        </li>
      </>
    );
  }

  if (role === "student") {
    return (
      <>
        <li>
          <NavLink to="/dashboard/student/my-selected-classes">
            <BsFileEarmarkFill /> My Selected Classes
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/student/my-enrolled-classes">
            <BsFileEarmarkCheckFill /> My Enrolled Classes
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/student/my-payment-history">
            <BiMoney /> My Payment History
          </NavLink>
        </li>
      </>
    );
  }
};

NavMenuDashBasedOnRole.propTypes = {
  role: PropTypes.string.isRequired,
};

export default NavMenuDashBasedOnRole;
