import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { toastError } from "../../utils/toastMessages";
import { useNavigate, useLocation } from "react-router-dom";
import GoogleLoginButton from "../../components/GoogleLoginButton";

const Login = () => {
  const { setUser, auth, loginWithPassword } = useFirebaseAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLoginFormSubmission = (data) => {
    loginWithPassword(auth, data.email, data.password)
      .then((userInfo) => {
        setUser(userInfo.user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        toastError("Wrong email and password! Try again!");
      });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-72">
        <h1 className="text-center text-3xl font-semibold">Login</h1>

        <form
          className="space-y-3"
          onSubmit={handleSubmit(handleLoginFormSubmission)}
        >
          <div className="form-control">
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

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter Your Password"
              className="input-bordered input"
            />
            {errors.password && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="form-control">
            <p className="text-center text-xs">
              Not have an account?{" "}
              <Link to="/signup" className="link-primary link">
                Create an account
              </Link>
            </p>
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn-primary btn">
              Login
            </button>
          </div>
        </form>

        <div className="divider"></div>

        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default Login;
