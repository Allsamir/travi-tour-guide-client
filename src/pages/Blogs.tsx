import React from "react";
import { Helmet } from "react-helmet-async";
import usePublicAxios from "../hooks/usePublicAxios";
import { useQuery } from "@tanstack/react-query";
import PageCover from "../components/PageCover";
import BlogCard from "../components/BlogCard";
import Blog from "../interfaces/Blog";

const Blogs: React.FC = () => {
  const publicAxios = usePublicAxios();
  const {
    isError,
    isLoading,
    data: blogs,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => (await publicAxios.get(`/blogs`)).data,
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
        Error loading Blogs details
      </div>
    );
  }
  console.log(blogs);
  return (
    <>
      <Helmet>
        <title>Travi - Tour Guide | Blogs</title>
      </Helmet>
      <PageCover
        imageURL="https://wallpaper.forfun.com/fetch/f6/f650602d7b019af6b63a2116c4f6c7ae.jpeg"
        text="Blogs"
        secondText="Our Web App"
      />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 my-20">
          {blogs.map((blog: Blog, index: number) => (
            <BlogCard blog={blog} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;
