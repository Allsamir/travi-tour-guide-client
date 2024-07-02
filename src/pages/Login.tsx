import React, { FormEvent, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import ButtonOutline2 from "../components/ButtonOutline2";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase.config";
const style = {
  position: "absolute" as `absolute`,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};
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
  const [open, setOpen] = React.useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  const handlePasswordReset = (event: FormEvent) => {
    event.preventDefault();
    if (inputRef.current) {
      sendPasswordResetEmail(auth, inputRef.current.value)
        .then(() => {
          setOpen(false);
          Swal.fire({
            title: "Success",
            text: "Password reset email sent successfully",
            icon: "success",
            confirmButtonText: "Close",
          });
        })
        .catch((err) => {
          console.error(err);
          setOpen(false);
          Swal.fire({
            title: "Error",
            text: "Failed to send password reset email",
            icon: "error",
            confirmButtonText: "Close",
          });
        });
    }
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
                <label className="label -mt-5">
                  <span
                    onClick={handleOpen}
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </span>
                </label>
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h2 className="text-base font-semibold">Reset Your Password</h2>
            <form onSubmit={handlePasswordReset}>
              <div className="form-control mt-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="input input-bordered"
                  required
                  name="resetEmail"
                  ref={inputRef}
                />
              </div>
              <ButtonOutline2
                text="Send Reset Link"
                extraClass="btn-block mt-4"
                buttonType="submit"
              />
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Login;
