import React from "react";
import { Link, useLocation } from "react-router-dom";
import Package from "../interfaces/Package";
import { FaHeart, FaLongArrowAltRight } from "react-icons/fa";
import Swal from "sweetalert2";
import { GrClose } from "react-icons/gr";
type ChildProps = {
  tourData: Package;
  handleDeleteFromWishList?: (id: string) => void;
};
const TourCard: React.FC<ChildProps> = ({
  tourData,
  handleDeleteFromWishList,
}) => {
  const location = useLocation();
  const addToLocalStorage = (id: string): void => {
    const wishList: string[] =
      JSON.parse(localStorage.getItem("wishList") as string) || [];
    if (!wishList.includes(id)) {
      wishList.push(id);
      localStorage.setItem("wishList", JSON.stringify(wishList));
      Swal.fire({
        title: "Successful",
        text: `Added to Your WishList`,
        icon: "success",
        confirmButtonText: "Close",
      });
    } else {
      Swal.fire({
        title: "Warning",
        text: `Already in your WisList`,
        icon: "warning",
        confirmButtonText: "Close",
      });
    }
  };
  return (
    <>
      <div
        className="relative bg-center bg-cover bg-no-repeat h-[80vh] hover:scale-110"
        style={{
          backgroundImage: `url('${tourData.images[0]}')`,
          transition: ".5s",
        }}
      >
        <div className="price absolute top-6 left-6 bg-[#FFFCF7] py-2 px-4 rounded-3xl">
          <p className="text-base font-bold">${tourData.price}</p>
        </div>
        {location.pathname === "/dashboard/my-wishlist" ? (
          <>
            <div
              className="price absolute top-6 right-6 bg-[#FFFCF7] py-2 px-4 rounded-3xl hover:cursor-pointer hover:bg-[#FF0000] hover:text-primaryColor"
              onClick={() => handleDeleteFromWishList?.(tourData._id)}
              style={{ transition: ".5s" }}
            >
              <p className="text-base font-bold">
                <GrClose />
              </p>
            </div>
          </>
        ) : (
          <>
            <div
              className="price absolute top-6 right-6 bg-[#FFFCF7] py-2 px-4 rounded-3xl hover:cursor-pointer"
              onClick={() => addToLocalStorage(tourData._id)}
            >
              <p className="text-base font-bold">
                <FaHeart />
              </p>
            </div>
          </>
        )}
        <div className="content absolute bottom-6 bg-[#FFFCF7] w-4/5 p-5 mx-5 space-y-2">
          <h2 className="font-serif font-bold text-xl">{tourData.title}</h2>
          <p className="font-serif font-semibold text-base">
            {tourData.tourType}
          </p>
          <p className="text-[13px]">{tourData.description?.slice(0, 147)}.</p>
          <Link to={`/tour-details/${tourData._id}`}>
            <p className="text-[13px] font-bold mt-4 hover:text-secondaryColor transition-all">
              View Details <FaLongArrowAltRight className="inline" />
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TourCard;
