import React from "react";
import { useParams } from "react-router-dom";
import usePublicAxios from "../hooks/usePublicAxios";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import PageCover from "./PageCover";

const BlogDetails: React.FC = () => {
  const { id } = useParams();
  const publicAxios = usePublicAxios();
  const {
    isError,
    isLoading,
    data: blog,
  } = useQuery({
    queryKey: ["singleBlog", id],
    queryFn: async () =>
      (await publicAxios.get(`/blogs/singleBlog?id=${id}`)).data,
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold">
        Error loading guide details
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>Travi - Tour Guide | {blog.title || ""}</title>
      </Helmet>
      <PageCover imageURL={blog?.thumbnail} text={blog?.title} />
      <div className="my-20">
        <img
          src={blog?.thumbnail}
          alt={blog?.title}
          className="mx-auto w-full md:w-1/2"
        />
        <div className="content lg:w-4/5 w-full px-4 mx-auto space-y-12 my-12">
          <p className="text-[15px] leading-[30px]">
            {blog?.body.slice(0, 772)}.
          </p>
          <p className="text-[15px] leading-[30px] first-letter:uppercase">
            {blog?.body.slice(772, 1235)}.
          </p>
          <p className="text-[15px] leading-[30px] first-letter:uppercase">
            {blog?.body.slice(1234, 2181)}.
          </p>
          <p className="text-[15px] leading-[30px] first-letter:uppercase">
            {blog?.body.slice(2181, 3000)}.
          </p>
          <p className="text-[15px] leading-[30px] first-letter:uppercase">
            {blog?.body.slice(3001, 4003)}.
          </p>
          <p className="text-[15px] leading-[30px] first-letter:uppercase">
            {blog?.body.slice(4005)}
          </p>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
