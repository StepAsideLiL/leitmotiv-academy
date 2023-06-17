import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useGetEnrolledStudentsNum from "../../../../../hooks/useGetEnrolledStudentsNum";

const InstructorClassTableCard = ({ course, index }) => {
  const { enrolledCoursesNum } = useGetEnrolledStudentsNum(course._id);

  const availableSts = parseInt(course.availableSeats) - enrolledCoursesNum;

  return (
    <>
      <tr>
        <th>
          <label>{index + 1}</label>
        </th>
        <td>
          <div className="avatar">
            <div className="mask mask-square h-12 w-12">
              <img
                src={course.courseImage}
                alt={`Profile Picture of ${course.courseName}`}
              />
            </div>
          </div>
        </td>
        <td>{course.courseName}</td>
        <td>{availableSts}</td>
        <td>${course.price}</td>
        <td>{course?.status ? course?.status : "pending"}</td>
        <td>{enrolledCoursesNum}</td>
        <td>{course?.feedback ? course?.feedback : ""}</td>
        <th>
          <Link
            to={`/dashboard/instructor/my-classes/edit/${course._id}`}
            className="btn-accent btn"
            // onClick={() => handleEditBtn(course._id)}
          >
            Edit
          </Link>
        </th>
      </tr>
    </>
  );
};

InstructorClassTableCard.propTypes = {
  course: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default InstructorClassTableCard;
