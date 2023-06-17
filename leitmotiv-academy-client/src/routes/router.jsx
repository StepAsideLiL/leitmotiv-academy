import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Dashboard from "../layout/Dashboard";
import AdminManageUsers from "../pages/Dashboard/Admin/AdminManageUsers/AdminManageUsers";
import AdminManageClasses from "../pages/Dashboard/Admin/AdminManageClasses/AdminManageClasses";
import PrivateRouter from "./PrivateRouter";
import AdminHome from "../pages/Dashboard/Admin/AdminHome/AdminHome";
import InstructorHome from "../pages/Dashboard/Instructor/InstructorHome/InstructorHome";
import InstructorMyClasses from "../pages/Dashboard/Instructor/InstructorMyClasses/InstructorMyClasses";
import InstructorAddClass from "../pages/Dashboard/Instructor/InstructorAddClass/InstructorAddClass";
import StudentHome from "../pages/Dashboard/Student/StudentHome/StudentHome";
import StudentMyEnrolledClasses from "../pages/Dashboard/Student/StudentMyEnrolledClasses/StudentMyEnrolledClasses";
import StudentMySelectedClasses from "../pages/Dashboard/Student/StudentMySelectedClasses/StudentMySelectedClasses";
import InstructorMyClassEdit from "../pages/Dashboard/Instructor/InstructorMyClassEdit/InstructorMyClassEdit";
import AdminCourseFeedback from "../pages/Dashboard/Admin/AdminCourseFeedback/AdminCourseFeedback";
import InstructorCourses from "../pages/InstructorCourses/InstructorCourses";
import StudentClassPayment from "../pages/Dashboard/Student/StudentClassPayment/StudentClassPayment";
import StudentPaymentHistory from "../pages/Dashboard/Student/StudentPaymentHistory/StudentPaymentHistory";
import Page404 from "../pages/Page404";
import DashboardHome from "../pages/Dashboard/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/instructors",
        element: <Instructors />,
      },
      {
        path: "/instructors/courses/:id",
        element: <InstructorCourses />,
      },
      {
        path: "/classes",
        element: <Classes />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <Dashboard />
      </PrivateRouter>
    ),
    children: [
      {
        path: "home",
        element: <DashboardHome />,
      },
      {
        path: "admin/home",
        element: <AdminHome />,
      },
      {
        path: "admin/manage-users",
        element: <AdminManageUsers />,
      },
      {
        path: "admin/manage-classes",
        element: <AdminManageClasses />,
      },
      {
        path: "admin/manage-classes/feedback/:id",
        element: <AdminCourseFeedback />,
      },
      {
        path: "instructor/Home",
        element: <InstructorHome />,
      },
      {
        path: "instructor/my-classes",
        element: <InstructorMyClasses />,
      },
      {
        path: "instructor/add-class",
        element: <InstructorAddClass />,
      },
      {
        path: "instructor/my-classes/edit/:id",
        element: <InstructorMyClassEdit />,
      },
      {
        path: "student/Home",
        element: <StudentHome />,
      },
      {
        path: "student/my-selected-classes",
        element: <StudentMySelectedClasses />,
      },
      {
        path: "student/my-selected-classes/payment/:id",
        element: <StudentClassPayment />,
      },
      {
        path: "student/my-enrolled-classes",
        element: <StudentMyEnrolledClasses />,
      },
      {
        path: "student/my-payment-history",
        element: <StudentPaymentHistory />,
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

export default router;
