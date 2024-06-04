import React from "react";
import usePublicAxios from "../hooks/usePublicAxios";
import { useQuery } from "@tanstack/react-query";
import Story from "../interfaces/Story";
import StoryCard from "./StoryCard";

const Stories: React.FC = () => {
  const publicAxios = usePublicAxios();
  const { data: stories } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => (await publicAxios.get(`/stories?count=4`)).data,
  });
  return (
    <>
      <div className="my-20 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-12">
        {stories?.map((story: Story, index: number) => (
          <StoryCard story={story} key={index} />
        ))}
      </div>
    </>
  );
};

export default Stories;
