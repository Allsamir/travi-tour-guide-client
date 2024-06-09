import React from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../hooks/useSecureAxios";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();
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
      </div>
    </>
  );
};

export default Profile;
