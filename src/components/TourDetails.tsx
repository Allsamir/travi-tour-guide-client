import React, { useEffect, useState } from "react";
import Package from "../interfaces/Package";
import usePublicAxios from "../hooks/usePublicAxios";
import { useParams } from "react-router-dom";

const TourDetails: React.FC = () => {
  const [tourData, setTourData] = useState<Package>();
  const { id } = useParams();
  const publicAxios = usePublicAxios();
  useEffect(() => {
    publicAxios
      .get(`/packages/singlePackage?id=${id}`)
      .then((res) => setTourData(res.data))
      .catch((err) => console.error(err));
  }, [publicAxios, id]);
  console.log(tourData);
  return (
    <>
      <div
        className="w-full md:h-[70vh] h-[60vh] bg-cover bg-top relative"
        style={{ backgroundImage: `url('${tourData?.images[0]}')` }}
      >
        <div className="w-full h-full bg-titleColor bg-opacity-45">
          <div className="content absolute bottom-8 left-4">
            <h2 className="text-primaryColor font-serif font-bold md:text-4xl text-2xl">
              {tourData?.title} in
            </h2>
            <p className="text-primaryColor font-serif font-bold md:text-4xl text-2xl">
              {tourData?.location}
            </p>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-rows-2 lg:grid-flow-col lg:w-4/5 w-full px-4 mx-auto gap-2 mt-20">
        <div className="lg:row-span-2">
          <img
            src={tourData?.images[0]}
            alt={tourData?.title}
            className="h-full object-cover"
          />
        </div>
        <div>
          <img src={tourData?.images[1]} alt={tourData?.title} />
        </div>
        <div>
          <img src={tourData?.images[2]} alt={tourData?.title} />
        </div>
      </div>
      <div className="content lg:w-4/5 w-full px-4 mx-auto space-y-12 my-12">
        <p className="text-[15px] leading-[30px]">
          {tourData?.description?.slice(0, 400)}.
        </p>
        <p className="text-[15px] leading-[30px]">
          {tourData?.description?.slice(400)}
        </p>
      </div>

      <div className="tour-plan lg:w-4/5 w-full px-4 mx-auto">
        {tourData?.tourPlan?.day1 && (
          <p className="text-[15px] leading-[30px]">
            <span className="font-bold uppercase">Day-1: </span>
            {tourData?.tourPlan?.day1}
          </p>
        )}
        {tourData?.tourPlan?.day2 && (
          <p className="text-[15px] leading-[30px]">
            <span className="font-bold uppercase">Day-2: </span>
            {tourData?.tourPlan?.day2}
          </p>
        )}
        {tourData?.tourPlan?.day3 && (
          <p className="text-[15px] leading-[30px]">
            <span className="font-bold uppercase">Day-3: </span>
            {tourData?.tourPlan?.day3}
          </p>
        )}
      </div>
      <h2 className="text-center my-12 text-2xl font-serif md:text-4xl font-bold">
        Meet Our guides
      </h2>
      <div className="guides">
        <div className="carousel carousel-center rounded-box">
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
              alt="Pizza"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TourDetails;
