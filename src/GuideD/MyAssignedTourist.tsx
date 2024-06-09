import React from "react";
import { Helmet } from "react-helmet-async";
import useSecureAxios from "../hooks/useSecureAxios";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
interface Combine {
  _id: string;
  email: string;
  name: string;
  photoURL: string;
  guide: string;
  price: number;
  date: string;
  status: string;
  packageID: string;
  packageDetails: {
    _id: string;
    title: string;
    tourType: string;
    price: number;
    images: string[];
    description?: string;
    tourPlan?: {
      day1: string;
      day2: string;
      day3: string;
    };
    location?: string;
  };
}
const MyAssignedTourist: React.FC = () => {
  const secureAxios = useSecureAxios();
  const { user } = useAuth();
  const {
    isError,
    isLoading,
    data: myAssignedTourists,
    refetch,
  } = useQuery({
    queryKey: ["myAssignedTourists", user?.displayName],
    queryFn: async () =>
      (await secureAxios.get(`/bookings/guide?name=${user?.displayName}`)).data,
  });
  const handleAction = (id: string, state: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${state} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        secureAxios
          .patch(`/bookings/status?status=${state}&id=${id}`)
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
          })
          .catch((err) => console.error(err));
      }
    });
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
  return (
    <>
      <Helmet>Travi - Dashboard | My Assigned Tourists</Helmet>
      <div className="container mx-auto px-4">
        <div className="my-20">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Package Name</th>
                  <th>Tourist Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Price</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myAssignedTourists.map(
                  (myAssignTourist: Combine, index: number) => {
                    const date = new Date(myAssignTourist.date);
                    return (
                      <tr className="font-semibold">
                        <th>{index + 1}</th>
                        <td>{myAssignTourist.packageDetails.title}</td>
                        <td>{myAssignTourist.name}</td>
                        <td>{date.toLocaleDateString()}</td>
                        <td>{date.toLocaleTimeString()}</td>
                        <td>${myAssignTourist.packageDetails.price}</td>
                        <td>
                          <button
                            type={`button`}
                            className="btn btn-outline text-secondaryColor hover:border-none uppercase hover:bg-secondaryColor hover:text-primaryColor"
                            onClick={() =>
                              handleAction(myAssignTourist._id, "Accept")
                            }
                            disabled={myAssignTourist.status !== "In Review"}
                          >
                            {myAssignTourist.status === "In Review"
                              ? "Accept"
                              : myAssignTourist.status === "Rejected"
                              ? "Accept"
                              : "Accepted"}
                          </button>
                        </td>
                        <td>
                          <button
                            type={`button`}
                            className="btn btn-outline text-secondaryColor hover:border-none uppercase hover:bg-secondaryColor hover:text-primaryColor"
                            onClick={() =>
                              handleAction(myAssignTourist._id, "Reject")
                            }
                            disabled={myAssignTourist.status !== "In Review"}
                          >
                            {myAssignTourist.status === "In Review"
                              ? "Reject"
                              : myAssignTourist.status === "Accepted"
                              ? "Reject"
                              : "Rejected"}
                          </button>
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAssignedTourist;
