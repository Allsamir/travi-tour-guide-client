import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import ButtonOutline2 from "../components/ButtonOutline2";
type Inputs = {
  email: string;
  password: string;
};
const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { googleProvider, loginUser, setLoading } = useAuth();
  const location = useLocation();
  const signInWithGoogle = () => {
    googleProvider()
      .then(() => {
        Swal.fire({
          title: "Successful",
          text: "Login Successfully Done",
          icon: "success",
          confirmButtonText: "Close",
        }).then(() => navigate(location.state || "/"));
      })
      .catch((err) => console.error(err));
  };
  const onSubmit: SubmitHandler<Inputs> = (data, event) => {
    const { email, password } = data;
    loginUser(email, password)
      .then(() => {
        Swal.fire({
          title: "Successful",
          text: "Login Successfully Done",
          icon: "success",
          confirmButtonText: "Close",
        }).then(() => navigate(location.state || "/"), event?.target.reset());
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
          title: "Error!",
          text: `${errorCode} ${errorMessage}`,
          icon: "error",
          confirmButtonText: "Close",
        }).then(() => setLoading(false));
      });
  };
  return (
    <>
      <Helmet>
        <title>Travi - Tour Guide | Login</title>
      </Helmet>
      <div className="hero-content mx-auto mb-20">
        <div className="lg:flex gap-12 justify-center items-center container mx-auto px-4 h-screen">
          <div className="flex-1 mx-auto mt-12 shadow-2xl mb-12">
            <div className="card shrink-0 w-full ">
              <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text  font-semibold">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered"
                    required
                    {...register("email")}
                  />
                </div>
                <div className="form-control relative ">
                  <label className="label">
                    <span className="label-text font-semibold">Password</span>
                  </label>
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered mb-2"
                    required
                    {...register("password", {
                      maxLength: 20,
                      minLength: 6,
                      pattern:
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                    })}
                  />
                  <span
                    onClick={() => setPasswordVisible(!isPasswordVisible)}
                    className="absolute right-4 bottom-5 hover:cursor-pointer"
                  >
                    {isPasswordVisible ? "Hide" : "Show"}
                  </span>
                  {errors.password?.type === "pattern" && (
                    <span className="text-red-600">
                      Password has to minimum 8 character, one uppercase, lower
                      case, one number and one special character
                    </span>
                  )}
                </div>
                <ButtonOutline2
                  text="Login"
                  buttonType="submit"
                ></ButtonOutline2>
                <button
                  className="btn btn-outline  text-secondaryColor hover:text-secondaryColor hover:bg-secondaryColor hover:border-none uppercase"
                  onClick={signInWithGoogle}
                >
                  <FcGoogle />
                </button>
              </form>
              <p className="text-center pb-8 text-textColor">
                New Here?{" "}
                <Link
                  to={`/register`}
                  className="underline-offset-auto text-secondaryColor"
                >
                  Create a New Account
                </Link>
              </p>
            </div>
          </div>
          <div className="flex-1">
            <img
              src={`https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/08/single-post-4.jpg`}
              alt="GIF Login Now"
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
