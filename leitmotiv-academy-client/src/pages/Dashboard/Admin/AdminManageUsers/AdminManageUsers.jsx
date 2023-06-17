import { BsTrash } from "react-icons/bs";
import Head3 from "../../../../components/Head3";
import SpaceY10 from "../../../../components/SpaceY10";
import useAllUsers from "../../../../hooks/useAllUsers";
import axiosInstance from "../../../../utils/axiosInstance";
import Swal from "sweetalert2";

const AdminManageUsers = () => {
  const { allUsers, refetch } = useAllUsers();

  const handleMakeAdminBtn = (userId) => {
    axiosInstance.patch(`/v1/users/admin/${userId}`).then((res) => {
      if (res.data.acknowledged) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Saved as Admin",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  const handleMakeInstuctorBtn = (userId) => {
    axiosInstance.patch(`/v1/users/instructor/${userId}`).then((res) => {
      if (res.data.acknowledged) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Saved as Instructor",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  const handleDeleteBtn = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/v1/users/${userId}`).then((res) => {
          if (res.data.acknowledged) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            refetch();
          }
        });
      }
    });
  };

  return (
    <SpaceY10>
      <Head3>Manage Users</Head3>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label></label>
              </th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {allUsers.map((user, index) => {
              return (
                <tr key={user._id}>
                  <th>
                    <label>{index + 1}</label>
                  </th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.image}
                          alt={`Profile Picture of ${user.name}`}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <th>
                    <div className="flex gap-2">
                      <div className="flex flex-col gap-2">
                        <button
                          className="btn-xs btn"
                          disabled={user.role === "admin" ? true : false}
                          onClick={() => handleMakeAdminBtn(user._id)}
                        >
                          Make Admin
                        </button>
                        <button
                          className="btn-xs btn"
                          disabled={user.role === "instructor" ? true : false}
                          onClick={() => handleMakeInstuctorBtn(user._id)}
                        >
                          Make Instructor
                        </button>
                      </div>

                      <button
                        className="btn-error btn"
                        onClick={() => handleDeleteBtn(user._id)}
                      >
                        <BsTrash className="text-2xl" />
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
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </SpaceY10>
  );
};

export default AdminManageUsers;
