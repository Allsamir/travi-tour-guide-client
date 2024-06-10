import React from "react";
import Blog from "../interfaces/Blog";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

interface ChildProps {
  blog: Blog;
}

const BlogCard: React.FC<ChildProps> = ({ blog }) => {
  return (
    <>
      <div
        className="relative h-[80vh] hover:scale-110 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${blog.thumbnail}")`,
          transition: ".5s",
        }}
      >
        <div className="content absolute bottom-6 bg-[#FFFCF7] w-4/5 p-5 mx-5 space-y-2">
          <h2 className="font-serif font-bold text-xl">{blog.title}</h2>
          <p className="text-[13px]">{blog.body?.slice(0, 147)}.</p>
          <Link to={`/blog/${blog._id}`}>
            <p className="text-[13px] font-bold mt-4 hover:text-secondaryColor transition-all">
              Read more <FaLongArrowAltRight className="inline" />
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
