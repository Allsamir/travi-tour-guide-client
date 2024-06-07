import React from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";
import ButtonOutline2 from "../components/ButtonOutline2";
import { SubmitHandler, useForm } from "react-hook-form";
import usePublicAxios from "../hooks/usePublicAxios";
import { updateProfile } from "firebase/auth";
import { auth } from "../config/firebase.config";
import Swal from "sweetalert2";
interface IFormInput {
  name: string;
  image: FileList;
}
const imgbbAPIKey = import.meta.env.VITE_IMGBB_API_KEY;
const imgbbURL = `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`;
const UpdateProfile: React.FC = () => {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm<IFormInput>();
  const publicAxios = usePublicAxios();
  const onSubmit: SubmitHandler<IFormInput> = (data, event) => {
    const imgFile = { image: data.image[0] };
    publicAxios
      .post(imgbbURL, imgFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          if (!auth.currentUser) return;
          updateProfile(auth.currentUser, {
            displayName: data.name,
            photoURL: res.data.data.url,
          })
            .then(() => {
              Swal.fire({
                title: "Successful",
                text: `Profile Updated`,
                icon: "success",
                confirmButtonText: "Close",
                timer: 1500,
              });
              event?.target.reset();
            })
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <Helmet>
        <title>Travi - Dashboard | Update Profile</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-100">
        <div className="w-full lg:w-1/2 md:w-4/5">
          <h3 className="text-2xl md:text-4xl font-serif font-bold text-center mb-16">
            Update Your Profile
          </h3>
          <div className="card shrink-0 w-full shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Update Your Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Change Your Current Name"
                  className="input input-bordered"
                  defaultValue={user?.displayName || ""}
                  {...register("name")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Update Your Profile Picture
                  </span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                  {...register("image")}
                  accept="image/png, image/jpg, image/jpeg"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <ButtonOutline2 text="update your profile" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
