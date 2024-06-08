import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Helmet } from "react-helmet-async";
import usePublicAxios from "../hooks/usePublicAxios";
import Package from "../interfaces/Package";
import TourCard from "../components/TourCard";

const MyWishList: React.FC = () => {
  const publicAxios = usePublicAxios();
  let getWishList: string[] =
    JSON.parse(localStorage.getItem("wishList") as string) || [];
  const {
    data: myWishList,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-wishList", getWishList],
    queryFn: async () =>
      (await publicAxios.post(`/packages/wishList`, { wishList: getWishList }))
        .data,
  });
  const deleteWistList = (id: string) => {
    getWishList = getWishList.filter((wishID) => wishID !== id);
    localStorage.setItem("wishList", JSON.stringify(getWishList));
    refetch();
  };
  if (getWishList.length > 0) {
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
    return (
      <>
        <Helmet>
          <title>Travi - Dashboard | My WishList</title>
        </Helmet>
        <div className="container mx-auto px-4 my-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12">
            {myWishList.map((tourPackage: Package, index: number) => (
              <TourCard
                tourData={tourPackage}
                key={index}
                handleDeleteFromWishList={deleteWistList}
              />
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Helmet>
          <title>Travi - Dashboard | My WishList</title>
        </Helmet>
        <div className="flex justify-center items-center h-screen">
          <p>Your Wish List is Empty</p>
        </div>
      </>
    );
  }
};

export default MyWishList;
