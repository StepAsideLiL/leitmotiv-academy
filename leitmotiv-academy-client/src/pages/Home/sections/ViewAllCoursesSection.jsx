import { Link } from "react-router-dom";
import camera from "../../../assets/images/camera.jpg";

const ViewAllCoursesSection = () => {
  return (
    <div className="mx-auto w-full md:w-[620px]">
      <div className="card bg-base-100 shadow-xl lg:card-side">
        <figure className="mx-auto w-1/2">
          <img src={camera} alt="Photo of a camera" />
        </figure>
        <div className="card-body">
          <h2 className="card-title justify-center md:justify-start">
            Come and Learn Film Making!
          </h2>
          <p className="text-center md:text-left">
            We Have very fexible plane.
          </p>
          <div className="card-actions justify-center md:justify-end">
            <Link to="/classess" className="btn-accent btn">
              View Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllCoursesSection;
