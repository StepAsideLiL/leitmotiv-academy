import PropTypes from "prop-types";
import useGetAllCourses from "../../../hooks/useGetAllCourses";
import Head1 from "../../../components/Head1";

const PopularClassesSection = () => {
  const { allCourses } = useGetAllCourses();

  const sixCourses = allCourses.slice(0, 6);

  return (
    <div className="space-y-6">
      <Head1>Course Images</Head1>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {sixCourses.map((course) => (
          <ImageCardHiddenContent key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

const ImageCardHiddenContent = ({ course }) => {
  const { courseImage, courseName, description } = course;

  return (
    <div className="la-container">
      <img
        src={courseImage}
        alt={`Image if ${courseName}`}
        className="la-image"
      />
      <div className="la-overlay">
        <div className="la-text">
          <h3 className="text-xl font-bold">{courseName}</h3>
          <p className="mt-2 text-base">{description}</p>
        </div>
      </div>
    </div>
  );
};

ImageCardHiddenContent.propTypes = {
  course: PropTypes.object.isRequired,
};

export default PopularClassesSection;
