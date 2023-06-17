import { Link } from "react-router-dom";
import logoB from "../../../assets/logos/Leitmotiv-b.png";

const NavBrand = () => {
  return (
    <Link className="" to="/">
      <img className="w-12 md:w-20" src={logoB} alt="Brand Logo" />
    </Link>
  );
};

export default NavBrand;
