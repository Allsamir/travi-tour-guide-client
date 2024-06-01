import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { updateProfile } from "firebase/auth";
import useAuth from "../hooks/useAuth";
import { auth } from "../config/firebase.config";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
type Inputs = {
  name: string;
  email: string;
  password: string;
  photoURL: string;
};
const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { createUser, setLoading, loading, googleProvider } = useAuth();
  const signInWithGoogle = () => {
    googleProvider()
      .then((result) => {
        console.log(result.user);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };
  const onSubmit: SubmitHandler<Inputs> = (data, event) => {
    const { name, email, password, photoURL } = data;
    createUser(email, password)
      .then(() => {
        if (auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL,
          })
            .then(() => {
              console.log("user created");
              Swal.fire({
                title: "Successful Registation",
                text: " Successfully Done",
                icon: "success",
                confirmButtonText: "Close",
              }).then(() => navigate("/"), event?.target.reset());
            })
            .catch((error) => {
              console.error(error);
            });
        }
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
              src={`https://media1.tenor.com/m/rIUtVGL4sO0AAAAC/register-now-register-now-the-browser.gif`}
              alt="GIF Register Now"
              className="mx-auto"
            />
          </div>
          <div className="flex-1">
            <div className="card shrink-0 w-full ">
              <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-primaryColor font-semibold">
                      Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    required
                    {...register("name")}
                  />
                </div>
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
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-primaryColor font-semibold">
                      Photo URL
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Any social media profile photo link"
                    className="input input-bordered"
                    required
                    {...register("photoURL")}
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
                    className="absolute right-4 bottom-5"
                  >
                    {isPasswordVisible ? "Hide" : "Show"}
                  </span>
                </div>
                {errors.password?.type === "pattern" && (
                  <span className="text-red-600">
                    Password has to minimum 8 character, one uppercase, lower
                    case, one number and one special character
                  </span>
                )}
                <button
                  type="submit"
                  className="btn btn-outline text-primaryColor hover:text-secondaryColor hover:bg-primaryColor hover:border-none uppercase"
                >
                  Register
                  {loading && (
                    <span className="loading loading-spinner loading-xs text-primaryColor"></span>
                  )}
                </button>
                <button
                  className="btn btn-outline  text-primaryColor hover:text-secondaryColor hover:bg-primaryColor hover:border-none uppercase"
                  onClick={signInWithGoogle}
                >
                  <FcGoogle />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
