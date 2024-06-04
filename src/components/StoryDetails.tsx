import React from "react";
import { Helmet } from "react-helmet-async";
import usePublicAxios from "../hooks/usePublicAxios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import PageCover from "./PageCover";
import { FacebookShareButton } from "react-share";
import { Rate } from "antd";
import ButtonOutline2 from "./ButtonOutline2";
import useAuth from "../hooks/useAuth";

const StoryDetails: React.FC = () => {
  const publicAxios = usePublicAxios();
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: story } = useQuery({
    queryKey: ["story"],
    queryFn: async () =>
      (await publicAxios.get(`/stories/singleStory?id=${id}`)).data,
  });
  const handleClick = () => {
    user ||
      navigate("/login", {
        state: location.pathname,
      });
  };
  return (
    <>
      <Helmet>
        <title>Travi - Tour Guide | {story?.name || ""}</title>
      </Helmet>
      <PageCover
        imageURL={story?.image}
        text={`Story of ${story?.name}`}
        secondText={`${story?.spot}`}
      />
      <h2 className="name text-2xl md:text-4xl text-center font-serif font-bold mt-20 mb-12 uppercase">
        {story?.name}
      </h2>
      <div className="content text-center mb-20">
        <img
          src="https://cdn.openai.com/labs/images/High%20quality%20photo%20of%20a%20monkey%20astronaut.webp?v=1"
          alt="Demo Image"
          className="w-36 rounded-full mx-auto"
        />
        <p className="font-serif font-light my-8">{story?.email}</p>
        <p className="font-semibold mb-8"></p>
        <Rate value={story?.rating} disabled />
        <p className="my-8">{story?.tourType}</p>
        <p className="my-8 leading-[60px] font-semibold md:w-4/5 w-full mx-auto">
          {story?.name}'s {story?.spot} Story: <br />
          {story?.story}
        </p>
        <FacebookShareButton
          hashtag="#travi #tourGuide #travel #explore"
          url={"https://www.facebook.com"}
          title="Travi Your Travel Guide"
          className="Demo__some-network__share-button"
          disabled={user ? false : true}
        >
          <ButtonOutline2 text="Share on Facebook" afunction={handleClick} />
        </FacebookShareButton>
      </div>
    </>
  );
};

export default StoryDetails;
