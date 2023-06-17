import { useForm } from "react-hook-form";
import Head3 from "../../../../components/Head3";
import SpaceY10 from "../../../../components/SpaceY10";
import { useNavigate, useParams } from "react-router-dom";
import useGetCourse from "../../../../hooks/useGetCourse";
import axiosInstance from "../../../../utils/axiosInstance";
import Swal from "sweetalert2";

const InstructorMyClassEdit = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { course } = useGetCourse(params.id);

  const { courseName, courseImage, availableSeats, price, description } =
    course;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleEditClassFromSubmission = (data) => {
    axiosInstance
      .patch(`/v1/courses/${params.id}`, data)
      .then((res) => {
        if (res.data.acknowledged) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your course has been updated!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/instructor/my-classes");
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to update!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <SpaceY10>
      <Head3>My Class Edit</Head3>

      <div className="mx-auto w-full md:w-[684px]">
        <form onSubmit={handleSubmit(handleEditClassFromSubmission)}>
          {/* Row 1 */}
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Course Name</span>
              </label>
              <input
                type="text"
                defaultValue={courseName}
                {...register("courseName", { required: true })}
                placeholder="Enter Course Name"
                className="input-bordered input w-full"
              />
              {errors.courseName && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Course Image</span>
              </label>
              <input
                type="text"
                defaultValue={courseImage}
                {...register("courseImage", { required: true })}
                placeholder="Enter Course Image URL"
                className="input-bordered input w-full"
              />
              {errors.courseImage && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Available Seats</span>
              </label>
              <input
                type="number"
                defaultValue={availableSeats}
                {...register("availableSeats", { required: true })}
                placeholder="Enter Available Seats"
                className="input-bordered input w-full"
              />
              {errors.availableSeats && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                defaultValue={price}
                {...register("price", { required: true })}
                placeholder="Enter Price"
                className="input-bordered input w-full"
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
              defaultValue={description}
              {...register("description", { required: true })}
              className="textarea-bordered textarea h-24"
              placeholder="Enter Class Description"
            ></textarea>
            {errors.description && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn-primary btn">
              Update
            </button>
          </div>
        </form>
      </div>
    </SpaceY10>
  );
};

export default InstructorMyClassEdit;
