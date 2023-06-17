import NavEnd from "./parts/NavEnd";
import NavStart from "./parts/NavStart";

const Header = () => {
  return (
    <div className="container mx-auto">
      <div className="navbar bg-base-100">
        <NavStart />

        <NavEnd />
      </div>
    </div>
  );
};

export default Header;
