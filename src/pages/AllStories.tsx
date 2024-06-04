import React from "react";
import { Helmet } from "react-helmet-async";
import usePublicAxios from "../hooks/usePublicAxios";
import { useQuery } from "@tanstack/react-query";
import PageCover from "../components/PageCover";
import StoryCard from "../components/StoryCard";
import Story from "../interfaces/Story";

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

      <PageCover
        imageURL="https://offbeatjapan.org/wp-content/uploads/2022/03/soya-hills-serene-forest-path.jpg"
        text="All Stories"
        secondText="One"
      />
      <div className="my-20 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-12">
        {allStories?.map((story: Story, index: number) => (
          <StoryCard story={story} key={index} />
        ))}
      </div>
    </>
  );
};

export default AllStories;
