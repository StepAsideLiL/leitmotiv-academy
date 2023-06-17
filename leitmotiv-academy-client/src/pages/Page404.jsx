import { Link } from "react-router-dom";
import image404 from "../assets/images/image-404.jpg";

const Page404 = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="card w-[520px] bg-base-100 shadow-xl">
        <figure>
          <img src={image404} alt="Image of 404" />
        </figure>
        <div className="card-body">
          <h2 className="card-title justify-center">Page Not Found</h2>
          <p className="text-center">We think you are lost!</p>
          <div className="card-actions justify-center">
            <Link to="/" className="btn-accent btn w-full">
              Ok
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
