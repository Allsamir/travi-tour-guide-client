import React from "react";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../components/SectionTitle";
import ButtonOutline2 from "../components/ButtonOutline2";
import { SubmitHandler, useForm } from "react-hook-form";
import useSecureAxios from "../hooks/useSecureAxios";
import Swal from "sweetalert2";
interface IFormInput {
  title: string;
  body: string;
  thumbnail: string;
}
const PostBlogs: React.FC = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const secureAxios = useSecureAxios();
  const onSubmit: SubmitHandler<IFormInput> = (data, event) => {
    secureAxios.post("/blogs", data).then((res) => {
      if (res.data.success) {
        Swal.fire({
          title: "Successful",
          text: `${res.data.message}`,
          icon: "success",
          confirmButtonText: "Close",
          timer: 1500,
        });
        event?.target.reset();
      }
    });
  };
  return (
    <>
      <Helmet>Travi - Dashboard | Post Blogs</Helmet>
      <SectionTitle heading="Post Blogs" />
      <div className="hero my-8">
        <div className="hero-content flex-col lg:flex-row-reverse w-full md:w-4/5 lg:w-1/2 mx-auto">
          <div className="card shrink-0 w-full shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  className="input input-bordered"
                  required
                  {...register("title")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Body</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Body of the Post"
                  rows={9}
                  {...register("body")}
                ></textarea>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Thumbnail</span>
                </label>
                <input
                  type="text"
                  placeholder="Thumbnail image live link(2200X1620)"
                  className="input input-bordered"
                  required
                  {...register("thumbnail")}
                />
              </div>
              <div className="form-control mt-6">
                <ButtonOutline2 text="Post" buttonType="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostBlogs;
