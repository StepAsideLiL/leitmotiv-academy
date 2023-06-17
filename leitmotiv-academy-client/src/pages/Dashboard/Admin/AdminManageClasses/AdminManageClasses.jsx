import Swal from "sweetalert2";
import Head3 from "../../../../components/Head3";
import SpaceY10 from "../../../../components/SpaceY10";
import useGetAllCourses from "../../../../hooks/useGetAllCourses";
import axiosInstance from "../../../../utils/axiosInstance";
import { Link } from "react-router-dom";
import AdminClassTableCard from "./sections/AdminClassTableCard";

const AdminManageClasses = () => {
  const { allCourses, refetch } = useGetAllCourses();

  const handleApproveBtn = (courseId) => {
    axiosInstance
      .patch(`/v1/courses/status/${courseId}`, { status: "Approved" })
      .then((res) => {
        if (res.data.acknowledged) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully approved!",
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
          title: "Could not approve!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleDenyBtn = (courseId) => {
    axiosInstance
      .patch(`/v1/courses/status/${courseId}`, { status: "Denied" })
      .then((res) => {
        if (res.data.acknowledged) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully denied!",
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
          title: "Could not deny!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <SpaceY10>
      <Head3>Manage Classes</Head3>

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
              <th>Instructor email</th>
              <th>Available seats</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {allCourses.map((course, index) => {
              return (
                <AdminClassTableCard
                  key={course._id}
                  course={course}
                  index={index}
                  handleApproveBtn={handleApproveBtn}
                  handleDenyBtn={handleDenyBtn}
                />
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
              <th>Instructor email</th>
              <th>Available seats</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </SpaceY10>
  );
};

export default AdminManageClasses;
