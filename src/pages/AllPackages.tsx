import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Helmet } from "react-helmet-async";
import usePublicAxios from "../hooks/usePublicAxios";
import PageCover from "../components/PageCover";
import TourCard from "../components/TourCard";
import Package from "../interfaces/Package";

const AllPackages: React.FC = () => {
  const publicAxios = usePublicAxios();
  const { data: packages = [] } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => (await publicAxios.get(`/packages`)).data,
  });
  return (
    <>
      <Helmet>
        <title>Travi - Tour Guide | All Packages</title>
      </Helmet>
      <PageCover
        imageURL="https://wallpaper.forfun.com/fetch/77/77019e5c5c328678fb1a7086e4405e78.jpeg"
        text="Explore Different Packages"
        secondText="Summary"
      />
      <div className="container mx-auto px-4 my-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12">
          {packages.map((tourPackage: Package, index: number) => (
            <TourCard tourData={tourPackage} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllPackages;
