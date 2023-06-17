import { useForm } from "react-hook-form";
import Head3 from "../../../../components/Head3";
import SpaceY10 from "../../../../components/SpaceY10";
import useFirebaseAuth from "../../../../hooks/useFirebaseAuth";
import axiosInstance from "../../../../utils/axiosInstance";
import Swal from "sweetalert2";

const InstructorAddClass = () => {
  const { user } = useFirebaseAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleAddClassFromSubmission = (data) => {
    axiosInstance
      .post("/v1/courses", data)
      .then((res) => {
        if (res.data.acknowledged) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your course is sent to admin for approval!",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to sent to admin!",
          showConfirmButton: false,
          timer: 1500,
        });
      });

  };

  return (
    <SpaceY10>
      <Head3>Add Class</Head3>

      <div className="mx-auto w-full md:w-[684px]">
        <form onSubmit={handleSubmit(handleAddClassFromSubmission)}>
          {/* Row 1 */}
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="w-full form-control">
              <label className="label">
                <span className="label-text">Course Name</span>
              </label>
              <input
                type="text"
                {...register("courseName", { required: true })}
                placeholder="Enter Course Name"
                className="w-full input-bordered input"
              />
              {errors.courseName && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="w-full form-control">
              <label className="label">
                <span className="label-text">Course Image</span>
              </label>
              <input
                type="text"
                {...register("courseImage", { required: true })}
                placeholder="Enter Course Image URL"
                className="w-full input-bordered input"
              />
              {errors.courseImage && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="w-full form-control">
              <label className="label">
                <span className="label-text">Instructor Name</span>
              </label>
              <input
                type="text"
                value={user.displayName}
                {...register("instructorName", { required: true })}
                placeholder="Instructor Name"
                className="w-full input-bordered input"
              />
              {errors.instructorName && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="w-full form-control">
              <label className="label">
                <span className="label-text">Instructor Email</span>
              </label>
              <input
                type="text"
                value={user.email}
                {...register("instructorEmail", { required: true })}
                placeholder="Instructor Email"
                className="w-full input-bordered input"
              />
              {errors.instructorEmail && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="w-full form-control">
              <label className="label">
                <span className="label-text">Available Seats</span>
              </label>
              <input
                type="number"
                {...register("availableSeats", { required: true })}
                placeholder="Enter Available Seats"
                className="w-full input-bordered input"
              />
              {errors.availableSeats && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="w-full form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="Enter Price"
                className="w-full input-bordered input"
              />
              {errors.price && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>

          {/* Row 4 */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Class Description</span>
            </label>
            <textarea
              {...register("description", { required: true })}
              className="h-24 textarea-bordered textarea"
              placeholder="Enter Class Description"
            ></textarea>
            {errors.description && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="mt-6 form-control">
            <button type="submit" className="btn-primary btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </SpaceY10>
  );
};

export default InstructorAddClass;
