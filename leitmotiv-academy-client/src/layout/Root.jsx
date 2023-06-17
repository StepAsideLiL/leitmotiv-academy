import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useLocation } from "react-router-dom";

const Root = () => {
  const location = useLocation();

  const isLoginOrSignupPage =
    location.pathname.includes("login") || location.pathname.includes("signup");

  return (
    <div>
      {isLoginOrSignupPage || <Header />}

      <Outlet />

      {isLoginOrSignupPage || <Footer />}
    </div>
  );
};

export default Root;
