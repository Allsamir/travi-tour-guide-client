import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import ButtonOutline from "../components/ButtonOutline";
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
      .then((result) => {
        console.log(result.user);
        navigate(location.state || "/");
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
      <div className="bg-secondaryColor">
        <div className="lg:flex justify-center items-center container mx-auto px-4 min-h-screen">
          <div className="lg:w-5/12">
            <img
              src={`https://media1.tenor.com/m/4Ei6bAIjMZ0AAAAC/crypto.gif`}
              alt="GIF Login Now"
              className="mx-auto"
            />
          </div>
          <div className="flex-1 mt-12">
            <div className="card shrink-0 w-full ">
              <h3 className="text-2xl md:text-4xl text-primaryColor font-semibold text-center uppercase">
                Login Now!
              </h3>
              <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-primaryColor font-semibold">
                      Email
                    </span>
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
                    <span className="label-text text-primaryColor font-semibold">
                      Password
                    </span>
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
                <ButtonOutline text="Login" buttonType="submit"></ButtonOutline>
                <button
                  className="btn btn-outline  text-primaryColor hover:text-secondaryColor hover:bg-primaryColor hover:border-none uppercase"
                  onClick={signInWithGoogle}
                >
                  <FcGoogle />
                </button>
              </form>
              <p className="text-center pb-8 text-primaryColor">
                New Here?{" "}
                <Link
                  to={`/register`}
                  className="underline-offset-auto hover:text-titleColor"
                >
                  Create a New Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
