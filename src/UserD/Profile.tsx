import React from "react";
import { Helmet } from "react-helmet-async";
import useSecureAxios from "../hooks/useSecureAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import SectionTitle from "../components/SectionTitle";

const Profile: React.FC = () => {
  const secureAxios = useSecureAxios();
  const { user } = useAuth();
  const {
    isError,
    isLoading,
    data: userInfo,
  } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () =>
      (await secureAxios.get(`/users/user?email=${user?.email}`)).data,
  });
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
              src={userInfo?.profilePicture}
              alt={userInfo?.name}
              className="mx-auto w-36 rounded-full"
            />
          </div>
          <div className="user-info my-12 text-center space-y-3">
            <h2 className="font-serif font-semibold text-2xl md:text-4xl">
              {userInfo?.name}
            </h2>
            <p className="email font-light text-base">{userInfo?.email}</p>
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
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Spot</span>
                </label>
                <input
                  type="text"
                  placeholder="Name of the spot you visited"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
