import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import useAuth from "../hooks/useAuth";
import { auth } from "../config/firebase.config";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import usePublicAxios from "../hooks/usePublicAxios";
import { Helmet } from "react-helmet-async";
import ButtonOutline2 from "../components/ButtonOutline2";
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
  const { createUser, setLoading, googleProvider } = useAuth();
  const publicAxios = usePublicAxios();
  const signInWithGoogle = () => {
    googleProvider()
      .then((result) => {
        publicAxios
          .post(`/users`, {
            email: result.user.email,
            name: result.user.displayName,
            role: "user",
            profilePicture: result.user.photoURL,
          })
          .then((res) => {
            if (res.data.success) {
              Swal.fire({
                title: "Successful Registation",
                text: " Successfully Done",
                icon: "success",
                confirmButtonText: "Close",
              }).then(() => navigate("/"));
            }
          });
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
              publicAxios
                .post(`/users`, {
                  email: email,
                  name: name,
                  role: "user",
                  profilePicture: photoURL,
                })
                .then((res) => {
                  if (res.data.success) {
                    Swal.fire({
                      title: "Successful Registation",
                      text: " Successfully Done",
                      icon: "success",
                      confirmButtonText: "Close",
                    }).then(() => navigate("/"), event?.target.reset());
                  }
                })
                .catch((err) => console.error(err));
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
      <Helmet>
        <title>Travi - Tour Guide | Register</title>
      </Helmet>
      <div className="hero mx-auto mb-20">
        <div className="lg:flex lg:flex-row flex-col gap-12 justify-center items-center container mx-auto px-4 h-screen lg:hero-content">
          <div className="flex-1 mt-12 shadow-2xl mb-12">
            <div className="card shrink-0 w-full ">
              <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text  font-semibold">Name</span>
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
                <div className="form-control">
                  <label className="label">
                    <span className="label-text  font-semibold">Photo URL</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Any social media profile photo link"
                    className="input input-bordered"
                    {...register("photoURL")}
                  />
                </div>
                <div className="form-control relative ">
                  <label className="label">
                    <span className="label-text  font-semibold">Password</span>
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
                <ButtonOutline2 text="Register" buttonType="submit" />
                <button
                  className="btn btn-outline   hover:text-secondaryColor hover:bg-secondaryColor hover:border-none uppercase"
                  onClick={signInWithGoogle}
                >
                  <FcGoogle />
                </button>
              </form>
              <p className="text-center pb-8 ">
                Already Registered?{" "}
                <Link
                  to={`/login`}
                  className="underline-offset-auto text-secondaryColor"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
          <div className="flex-1">
            <img
              src={`https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/08/single-post-1-img-2.jpg`}
              alt="GIF Register Now"
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
