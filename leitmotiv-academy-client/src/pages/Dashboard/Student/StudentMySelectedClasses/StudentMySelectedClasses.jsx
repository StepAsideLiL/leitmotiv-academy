import SpaceY10 from "../../../../components/SpaceY10";
import Head3 from "../../../../components/Head3";
import useGetStudentCourses from "../../../../hooks/useGetStudentCourses";
import { Link } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";
import useFirebaseAuth from "../../../../hooks/useFirebaseAuth";
import Swal from "sweetalert2";

const StudentMySelectedClasses = () => {
  const { user } = useFirebaseAuth();
  const { studentCourses, refetch } = useGetStudentCourses();

  const handleDeleteBtn = (courseId) => {
    axiosInstance
      .delete(`/v1/users/${user?.email}/course/${courseId}`)
      .then((res) => {
        if (res.data.acknowledged) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your course has been Deleted!",
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
          title: "Failed to delete course!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <SpaceY10>
      <Head3>My Selected Classes</Head3>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label></label>
              </th>
              <th>Class Image</th>
              <th>Class name</th>
              <th>Instructor name</th>
              <th>Available seats</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {studentCourses.map((course, index) => {
              return (
                <tr key={course._id}>
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
                  <td>{course.availableSeats}</td>
                  <td>${course.price}</td>
                  <th>
                    <div className="flex gap-2">
                      <Link
                        to={`/dashboard/student/my-selected-classes/payment/${course._id}`}
                        className="btn-info btn-xs btn"
                      >
                        Pay
                      </Link>
                      <button
                        className="btn-error btn-xs btn"
                        onClick={() => handleDeleteBtn(course._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </th>
                </tr>
              );
            })}
          </tbody>

          {/* foot */}
          <tfoot>
            <tr>
              <th>
                <label></label>
              </th>
              <th>Class Image</th>
              <th>Class name</th>
              <th>Instructor name</th>
              <th>Available seats</th>
              <th>Price</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </SpaceY10>
  );
};

export default StudentMySelectedClasses;
