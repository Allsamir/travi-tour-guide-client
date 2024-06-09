import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Helmet } from "react-helmet-async";
import useSecureAxios from "../hooks/useSecureAxios";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

interface Combine {
  _id: string;
  email: string;
  name: string;
  photoURL: string;
  guide: string;
  price: number;
  date: string;
  status: string;
  paid: boolean;
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

const MyBookings: React.FC = () => {
  const secureAxios = useSecureAxios();
  const { user } = useAuth();
  const {
    isError,
    isLoading,
    data: bookings,
    refetch,
  } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: async () =>
      (await secureAxios.get(`/bookings?email=${user?.email}`)).data,
  });
  const handleCancle = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        secureAxios
          .delete(`/bookings?email=${user?.email}&id=${id}`)
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
        Error loading Bookings details
      </div>
    );
  }
  if (bookings.length === 0) {
    return (
      <>
        <Helmet>
          <title>Travi - Dashboard | My Bookings</title>
        </Helmet>
        <div className="flex justify-center items-center h-screen">
          <p>Your Booking List is Empty</p>
        </div>
      </>
    );
  }
  return (
    <>
      <Helmet>
        <title>Travi - Dashboard | My Bookings</title>
      </Helmet>
      <div className="container mx-auto px-4 my-20">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Package Name</th>
                <th>Guide Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((bookingData: Combine, index: number) => {
                const date = new Date(bookingData.date);
                return (
                  <tr key={index} className="font-semibold">
                    <th>{index + 1}</th>
                    <td>{bookingData.packageDetails.title}</td>
                    <td>{bookingData.guide}</td>
                    <td>{date.toDateString()}</td>
                    <td>{date.toLocaleTimeString()}</td>
                    <td>${bookingData.price}</td>
                    <td>{bookingData.status}</td>
                    <td>
                      {bookingData.status === "In Review" ||
                      bookingData.status === "Rejected" ? (
                        <button
                          type={`button`}
                          className="btn btn-outline text-secondaryColor hover:border-none uppercase hover:bg-secondaryColor hover:text-primaryColor"
                          onClick={() => handleCancle(bookingData._id)}
                        >
                          Cancel
                        </button>
                      ) : (
                        <Link to={`/dashboard/payment/${bookingData._id}`}>
                          <button
                            disabled={bookingData?.paid}
                            className="btn btn-outline text-secondaryColor hover:border-none uppercase hover:bg-secondaryColor hover:text-primaryColor"
                          >
                            {bookingData.paid ? "Paid" : "Pay"}
                          </button>
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyBookings;
