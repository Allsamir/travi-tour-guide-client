import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import useSecureAxios from "../hooks/useSecureAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import SectionTitle from "../components/SectionTitle";
import ButtonOutline2 from "../components/ButtonOutline2";
import { SubmitHandler, useForm } from "react-hook-form";
import { Rate } from "antd";
import usePublicAxios from "../hooks/usePublicAxios";
import Swal from "sweetalert2";
interface IFormInput {
  spot: string;
  image: FileList;
  tourType: string;
  story: string;
}
const imgbbAPIKey = import.meta.env.VITE_IMGBB_API_KEY;
const imgbbURL = `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`;
const Profile: React.FC = () => {
  const secureAxios = useSecureAxios();
  const { user } = useAuth();
  const { register, handleSubmit } = useForm<IFormInput>();
  const [userRating, setUserRating] = useState(1);
  const publicAxios = usePublicAxios();
  const {
    isError,
    isLoading,
    data: userInfo,
  } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () =>
      (await secureAxios.get(`/users/user?email=${user?.email}`)).data,
  });
  const onSubmit: SubmitHandler<IFormInput> = (data, event) => {
    const imgFile = { image: data.image[0] };
    console.log(data, userRating);
    publicAxios
      .post(imgbbURL, imgFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          secureAxios
            .post(`/stories`, {
              name: user?.displayName,
              email: user?.email,
              profileImage: user?.photoURL,
              spot: data.spot,
              image: res.data.data.url,
              tourType: data.tourType,
              rating: userRating,
              story: data.story,
            })
            .then((res) => {
              if (res.data.success) {
                Swal.fire({
                  title: "Successful",
                  text: `${res.data.message}`,
                  icon: "success",
                  confirmButtonText: "Close",
                  timer: 1500,
                });
                event?.target.reset();
              }
            })
            .catch((err) => {
              console.error(err);
              Swal.fire({
                title: "Error!!",
                text: `${err.message}`,
                icon: "error",
                confirmButtonText: "Close",
                timer: 1500,
              });
            });
        }
      })
      .catch((err) => console.error(err));
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold">
        Error loading guide details
      </div>
    );
  }
  console.log(userInfo);
  return (
    <>
      <Helmet>
        <title>Travi - Dashboard | User Profile</title>
      </Helmet>
      <div className="container mx-auto px-4">
        <div className="my-20">
          <div className="profile-image">
            <img
              src={user?.photoURL || ""}
              alt={user?.displayName || ""}
              className="mx-auto w-36 rounded-full"
            />
          </div>
          <div className="user-info my-12 text-center space-y-3">
            <h2 className="font-serif font-semibold text-2xl md:text-4xl">
              {user?.displayName}
            </h2>
            <p className="email font-light text-base">{user?.email}</p>
            <p className="email font-normal text-base uppercase">
              {userInfo?.role}
            </p>
          </div>
        </div>
        <div className="divider"></div>
        <SectionTitle
          heading="Add Story"
          subheading="Add your story with us, we will be happy to hear from you"
        />
        <div className="add-story mb-20">
          <div className="card shrink-0 w-full lg:w-1/2 md:w-4/5 mx-auto shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Spot</span>
                </label>
                <input
                  type="text"
                  placeholder="Name of the spot you visited"
                  className="input input-bordered"
                  required
                  {...register("spot")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                  {...register("image")}
                  accept="image/png, image/jpg, image/jpeg"
                />
              </div>
              <div className="form-control my-4">
                <label className="label">
                  <span className="label-text text-base">Rating</span>
                </label>
                <Rate onChange={(value) => setUserRating(value)} />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tour Type</span>
                </label>
                <select
                  className="select select-bordered w-full max-w-xs"
                  {...register("tourType")}
                >
                  <option defaultValue={`Wildlife`}>
                    Choose Your Tour Type
                  </option>
                  <option value={`Wildlife`}>Wildlife</option>
                  <option value={`Hiking`}>Hiking</option>
                  <option value={`Air Rides`}>Air Rides</option>
                  <option value={`Sports`}>Sports</option>
                  <option value={`Riding`}>Riding</option>
                  <option value={`Swimming`}>Swimming</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Stroy</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Please write your story in details"
                  rows={10}
                  {...register("story")}
                ></textarea>
              </div>
              <div className="form-control mt-6">
                <ButtonOutline2 text="Add your story"></ButtonOutline2>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
