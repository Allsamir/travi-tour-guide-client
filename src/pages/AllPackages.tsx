import { AxiosInstance, AxiosResponse } from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { Helmet } from "react-helmet-async";
import InfiniteScroll from "react-infinite-scroll-component";
import usePublicAxios from "../hooks/usePublicAxios";
import PageCover from "../components/PageCover";
import TourCard from "../components/TourCard";
import Package from "../interfaces/Package";

// Define the structure of the response data
interface PackagesResponse {
  packages: Package[];
  hasMore: boolean;
}

const fetchPackages = async (
  page: number,
  publicAxios: AxiosInstance,
): Promise<PackagesResponse> => {
  const { data }: AxiosResponse<PackagesResponse> = await publicAxios.get(
    `/packages?page=${page}&limit=3`,
  );
  return data;
};

const AllPackages: React.FC = () => {
  const publicAxios = usePublicAxios();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["packages"],
    queryFn: ({ pageParam = 1 }) => fetchPackages(pageParam, publicAxios),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
  console.log(data?.pages);
  const packages = data?.pages.flatMap((page) => page.packages) || [];

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
        <InfiniteScroll
          dataLength={packages.length}
          next={fetchNextPage}
          hasMore={hasNextPage || false}
          loader={
            <div className="text-center mt-4">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>New Packages are coming soon!</p>
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12">
            {packages.map((tourPackage: Package, index: number) => (
              <TourCard tourData={tourPackage} key={index} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default AllPackages;
