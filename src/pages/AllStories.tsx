import React from "react";
import { Helmet } from "react-helmet-async";
import usePublicAxios from "../hooks/usePublicAxios";
import PageCover from "../components/PageCover";
import StoryCard from "../components/StoryCard";
import Story from "../interfaces/Story";
import { AxiosInstance, AxiosResponse } from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

interface Stories {
  stories: Story[];
  hasMore: boolean;
}

const fethStories = async (
  page: number,
  publicAxios: AxiosInstance,
): Promise<Stories> => {
  const { data }: AxiosResponse<Stories> = await publicAxios.get(
    `/stories?page=${page}&limit=4`,
  );
  return data;
};

const AllStories: React.FC = () => {
  const publicAxios = usePublicAxios();
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["allStories"],
    queryFn: ({ pageParam = 1 }) => fethStories(pageParam, publicAxios),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
  const stories = data?.pages.flatMap((story) => story.stories) || [];
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
      <InfiniteScroll
        dataLength={stories.length}
        next={fetchNextPage}
        hasMore={hasNextPage || false}
        loader={
          <div className="text-center mt-4">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        }
        endMessage={
          <p className="mb-4" style={{ textAlign: "center" }}>
            New Stories are coming soon!
          </p>
        }
      >
        <div className="my-20 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-12">
          {stories?.map((story: Story, index: number) => (
            <StoryCard story={story} key={index} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default AllStories;
