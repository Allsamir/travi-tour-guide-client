import React from "react";
import useSecureAxios from "../hooks/useSecureAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const RequestToAdmin: React.FC = () => {
  const secureAxios = useSecureAxios();
  const { user } = useAuth();
  const {
    isError,
    isLoading,
    data: userInfo,
    refetch,
  } = useQuery({
    queryKey: ["getUserID"],
    queryFn: async () =>
      (await secureAxios.get(`/users/user?email=${user?.email}`)).data,
  });
  const handleRequest = (id: string) => {
    Swal.fire({
      title: "Are you sure to request?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Request",
    }).then((result) => {
      if (result.isConfirmed) {
        secureAxios
          .patch(`/users/request?id=${id}&email=${user?.email}`)
          .then((res) => {
            if (res.data.success) {
              Swal.fire({
                title: "Successful",
                text: `${res.data.message}`,
                icon: "success",
                confirmButtonText: "Close",
              });
              refetch();
            }
          });
      }
    });
  };
  console.log(userInfo);
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
        <title>Travi - Dashboard | Request To Admin</title>
      </Helmet>
      <div className="flex justify-center items-center flex-col min-h-screen">
        <h1 className="text-xl font-serif font-semibold mb-8">
          Request Admin to be a Guide
        </h1>
        <button
          type={`button`}
          className="btn btn-outline text-secondaryColor hover:border-none uppercase hover:bg-secondaryColor hover:text-primaryColor"
          onClick={() => handleRequest(userInfo?._id)}
          disabled={userInfo?.requested}
        >
          {userInfo?.requested ? "Requested" : "Request"}
        </button>
      </div>
    </>
  );
};

export default RequestToAdmin;
