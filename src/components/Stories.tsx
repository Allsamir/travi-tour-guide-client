import React from "react";
import usePublicAxios from "../hooks/usePublicAxios";
import { useQuery } from "@tanstack/react-query";
import Story from "../interfaces/Story";
import StoryCard from "./StoryCard";
import ButtonOutline2 from "./ButtonOutline2";
import { Link } from "react-router-dom";

const Stories: React.FC = () => {
  const publicAxios = usePublicAxios();
  const { data: stories } = useQuery({
    queryKey: ["stories"],
    queryFn: async () =>
      (await publicAxios.get(`/stories?page=1&limit=4`)).data.stories,
  });
  return (
    <>
      <div className="my-20 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-12">
        {stories?.map((story: Story, index: number) => (
          <StoryCard story={story} key={index} />
        ))}
      </div>
      <div className="text-center my-12">
        <Link to={`/all-stories`}>
          <ButtonOutline2 text="All Stories" />
        </Link>
      </div>
    </>
  );
};

export default Stories;
