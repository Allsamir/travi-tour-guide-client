import React from "react";
import { Helmet } from "react-helmet-async";
import usePublicAxios from "../hooks/usePublicAxios";
import { useQuery } from "@tanstack/react-query";

const AllStories: React.FC = () => {
  const publicAxios = usePublicAxios();
  const { data: allStories } = useQuery({
    queryKey: ["allStories"],
    queryFn: async () => (await publicAxios.get(`/stories?count=0`)).data,
  });
  console.log(allStories);
  return (
    <>
      <Helmet>
        <title>Travi - Tour Guide | All Stories</title>
      </Helmet>
    </>
  );
};

export default AllStories;
