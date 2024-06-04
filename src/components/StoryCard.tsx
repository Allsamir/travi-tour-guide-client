import React from "react";
import { Link } from "react-router-dom";
import Story from "../interfaces/Story";
interface ChilProps {
  story: Story;
}
const StoryCard: React.FC<ChilProps> = ({ story }) => {
  return (
    <>
      <div className="">
        <Link to={`/story/${story._id}`}>
          <figure className="relative inline-block overflow-hidden w-full text-base shadow-xl my-4 h-[80vh]">
            <img
              src={story.image}
              alt="Image"
              className="w-full h-full object-cover align-top"
            />
            <figcaption
              className="absolute h-[90px] hover:h-[50%] right-4 left-4 bottom-4 top-20 text-primaryColor overflow-hidden p-4 space-y-5"
              style={{
                backgroundColor: "rgb(36, 133, 176, 0.8)",
                transition: ".5s",
              }}
            >
              <h4 className="font-serif font-bold">{story.name}</h4>
              <p className="font-semibold">{story.spot}</p>
              <p>{story.story}</p>
              <p className="font-serif font-bold">{story.tourType}</p>
            </figcaption>
          </figure>
        </Link>
      </div>
    </>
  );
};

export default StoryCard;
