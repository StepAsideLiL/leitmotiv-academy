import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { updateProfile } from "firebase/auth";
import { toastError, toastSuccess } from "../../utils/toastMessages";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../../components/GoogleLoginButton";

const Signup = () => {
  const { auth, createUser, logout } = useFirebaseAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleSignupFormSubmission = (data) => {
    if (data.password.length < 6) {
      toastError("Password must be more than 6 character!");
      return;
    }

    // Check if the password contains a capital letter
    if (!/[A-Z]/.test(data.password)) {
      toastError("Password must contain one capital letter!");
      return;
    }

    // Check if the password contains a special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
      toastError("Password must contain one spcial character!");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toastError("Please make sure your passwords match!");
      return;
    }

    createUser(auth, data.email, data.password)
      .then((userInfo) => {
        updateProfile(auth.currentUser, {
          displayName: data.name,
          photoURL: data.photoURL,
        })
          .then(() => {
            axiosInstance
              .post("/v1/users", {
                name: data.name,
                email: data.email,
                image: data.photoURL,
                role: "student",
              })
              .then((res) => {
                console.log(userInfo);
                if (res.data.acknowledged) {
                  logout(auth);
                  navigate("/login");
                  toastSuccess("Your account is created. Please login!");
                }
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
            toastError("Failed to create an account! Please try again!");
          });
      })
      .catch((error) => {
        console.error(error);
        toastError("Failed to create an account! Please try again!");
      });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[460px]">
        <h1 className="text-center text-3xl font-semibold">
          Create an account
        </h1>

        <form
          className="space-y-3"
          onSubmit={handleSubmit(handleSignupFormSubmission)}
        >
          <div className="flex gap-2">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter Your Name"
                className="input-bordered input"
              />
              {errors.name && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter Your Email"
                className="input-bordered input"
              />
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Enter a Password"
                className="input-bordered input"
              />
              {errors.password && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                {...register("confirmPassword", { required: true })}
                placeholder="Enter Confirmed Password"
                className="input-bordered input"
              />
              {errors.confirmPassword && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="url"
              {...register("photoURL", { required: true })}
              placeholder="Enter Your Profile Photo URL"
              className="input-bordered input"
            />
            {errors.photoURL && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="form-control">
            <p className="text-center text-xs">
              have an account?{" "}
              <Link to="/login" className="link-primary link">
                Login
              </Link>
            </p>
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn-primary btn">
              Create account
            </button>
          </div>
        </form>

        <div className="divider"></div>

        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default Signup;
