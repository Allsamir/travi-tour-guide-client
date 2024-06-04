import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import usePublicAxios from "../hooks/usePublicAxios";
import { Helmet } from "react-helmet-async";
import PageCover from "./PageCover";
import Package from "../interfaces/Package";
import TourCard from "./TourCard";

const PackagesBOType: React.FC = () => {
  const { type } = useParams();
  const publicAxios = usePublicAxios();
  const [image, setImage] = useState<string>("");
  const { data: tourData } = useQuery({
    queryKey: ["tourTypesData"],
    queryFn: async () => {
      const res = await publicAxios.get(`/packages/type?type=${type}`);
      setImage(res.data[0].images[0]);
      return res.data;
    },
  });
  return (
    <>
      <Helmet>
        <title>Travi - Tour Guide | {type || ""}</title>
      </Helmet>
      <PageCover
        imageURL={image}
        text={`Explore ${type}`}
        secondText="New Way"
      ></PageCover>
      <div className="container mx-auto px-4 my-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12">
          {tourData?.map((tourPackage: Package, index: number) => (
            <TourCard tourData={tourPackage} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PackagesBOType;
