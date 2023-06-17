import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useGetEnrolledStudentsNum from "../../../../../hooks/useGetEnrolledStudentsNum";

const AdminClassTableCard = ({
  course,
  index,
  handleApproveBtn,
  handleDenyBtn,
}) => {
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
        <td>{course.instructorName}</td>
        <td>{course.instructorEmail}</td>
        <td>{availableSts}</td>
        <td>${course.price}</td>
        <td>{course?.status ? course?.status : "pending"}</td>
        <th>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <button
                className="btn-info btn-xs btn"
                onClick={() => handleApproveBtn(course._id)}
              >
                Approve
              </button>
              <button
                className="btn-error btn-xs btn"
                onClick={() => handleDenyBtn(course._id)}
              >
                Deny
              </button>
            </div>

            <Link
              to={`/dashboard/admin/manage-classes/feedback/${course._id}`}
              className="btn-accent btn"
            >
              Feedback
            </Link>
          </div>
        </th>
      </tr>
    </>
  );
};

AdminClassTableCard.propTypes = {
  course: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleApproveBtn: PropTypes.func.isRequired,
  handleDenyBtn: PropTypes.func.isRequired,
};

export default AdminClassTableCard;
