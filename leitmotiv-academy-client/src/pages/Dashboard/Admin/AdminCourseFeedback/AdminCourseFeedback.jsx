import { useForm } from "react-hook-form";
import Head3 from "../../../../components/Head3";
import SpaceY10 from "../../../../components/SpaceY10";
import { useNavigate, useParams } from "react-router-dom";
import useGetCourse from "../../../../hooks/useGetCourse";
import axiosInstance from "../../../../utils/axiosInstance";
import Swal from "sweetalert2";

const AdminCourseFeedback = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { course } = useGetCourse(params.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFeedbackFromSubmission = (data) => {
    axiosInstance
      .patch(`/v1/courses/feedbackss/${params.id}`, data)
      .then((res) => {
        if (res.data.acknowledged) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your course has been updated!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/admin/manage-classes");
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
      <Head3>Add Feedback</Head3>

      <div className="mx-auto w-full md:w-[684px]">
        <h1 className="text-xl font-semibold">{course.courseName}</h1>
        <h3>
          By <span className="font-medium">{course.instructorName}</span>
        </h3>

        <form onSubmit={handleSubmit(handleFeedbackFromSubmission)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Feedback</span>
            </label>
            <textarea
              defaultValue={course?.feedback}
              {...register("feedback", { required: true })}
              className="textarea-bordered textarea h-24"
              placeholder="Enter Class Description"
            ></textarea>
            {errors.feedback && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn-primary btn">
              Add Feedback
            </button>
          </div>
        </form>
      </div>
    </SpaceY10>
  );
};

export default AdminCourseFeedback;
