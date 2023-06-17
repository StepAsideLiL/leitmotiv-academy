import PropTypes from "prop-types";
import useGetLoggedinUser from "../hooks/useGetLoggedinUser";
import axiosInstance from "../utils/axiosInstance";
import Swal from "sweetalert2";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import useHasSelectedCourses from "../hooks/useHasSelectedCourses";
import useGetEnrolledStudentsNum from "../hooks/useGetEnrolledStudentsNum";

const CourseCard = ({ course }) => {
  const {
    _id,
    courseName,
    courseImage,
    instructorName,
    availableSeats,
    price,
  } = course;

  const { loggedinUser } = useGetLoggedinUser();
  const { user } = useFirebaseAuth();
  const { hasCoueseSelected, refetch } = useHasSelectedCourses(_id);

  const { enrolledCoursesNum } = useGetEnrolledStudentsNum(_id);

  const role = loggedinUser?.role;

  const availableSts = parseInt(availableSeats) - enrolledCoursesNum;

  const isNoSeatAvailable = availableSts === 0 ? true : false;

  const disableBtn =
    role === "admin" ||
    role === "instructor" ||
    hasCoueseSelected ||
    isNoSeatAvailable
      ? true
      : false;

  const handleSelectBtn = () => {
    axiosInstance
      .patch(`/v1/users/student/course/${_id}`, { email: user?.email })
      .then((res) => {
        if (res.data.acknowledged) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your course has been saved!",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to save course!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div
      className={
        isNoSeatAvailable
          ? "card bg-red-600 shadow-xl"
          : "card bg-base-100 shadow-xl"
      }
    >
      <figure>
        <img src={courseImage} alt={`Image of ${courseName}`} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{courseName}</h2>
        <p>
          By <span className="text-xl font-medium">{instructorName}</span>
        </p>
        <p>
          Available seats: <span className="font-semibold">{availableSts}</span>
        </p>
        <p>
          Price: <span className="font-semibold">${price}</span>
        </p>
        <div className="card-actions justify-end">
          <button
            className="btn-accent btn"
            disabled={disableBtn}
            onClick={handleSelectBtn}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseCard;
