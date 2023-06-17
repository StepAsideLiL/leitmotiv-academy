import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const InsctuctorCard = ({ instructor }) => {
  const { _id, name, email, image } = instructor;

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt={`Image of ${name}`} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{email}</p>
        <div className="card-actions justify-end">
          <Link to={`/instructors/courses/${_id}`} className="btn-accent btn">
            View Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

InsctuctorCard.propTypes = {
  instructor: PropTypes.object.isRequired,
};

export default InsctuctorCard;
