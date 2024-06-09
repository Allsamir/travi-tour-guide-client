import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import usePublicAxios from "../hooks/usePublicAxios";
import { useNavigate, useParams } from "react-router-dom";
import PageCover from "../components/PageCover";
import { Rate } from "antd";
import SectionTitle from "../components/SectionTitle";
import ButtonOutline2 from "../components/ButtonOutline2";
import { SubmitHandler, useForm } from "react-hook-form";
import useSecureAxios from "../hooks/useSecureAxios";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

type Inputs = {
  name: string;
  comment: string;
};

const GuideProfile: React.FC = () => {
  const publicAxios = usePublicAxios();
  const { id } = useParams();
  const { register, handleSubmit } = useForm<Inputs>();
  const [ratingByUser, setRatingByUser] = useState<number>(1);
  const { user } = useAuth();
  const navigate = useNavigate();
  const secureAxios = useSecureAxios();

  const {
    data: guide,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["guide", id],
    queryFn: async () => {
      const response = await publicAxios.get(`/users/role?id=${id}&role=guide`);
      return response.data;
    },
  });

  const handleClick = () => {
    if (!user) {
      navigate("/login", {
        state: location.pathname,
      });
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data, event) => {
    const { name, comment } = data;
    if (user) {
      secureAxios
        .patch(`/users/updateComments?id=${guide?._id}`, {
          name,
          comment,
          rating: ratingByUser,
        })
        .then((res) => {
          if (res.data.success) {
            refetch();
            Swal.fire({
              title: "Successful",
              text: `${res.data.message}`,
              icon: "success",
              confirmButtonText: "Close",
            });
            event?.target.reset();
          }
        })
        .catch((err) => console.error(err));
    }
  };

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
        <title>Travi - Tour Guide | {guide.name || ""}</title>
      </Helmet>
      <PageCover
        text="Put Your Trust"
        secondText={guide.name}
        imageURL="https://images.unsplash.com/photo-1495805442109-bf1cf975750b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className="container mx-auto px-4">
        <div className="my-20 p-8 w-full lg:w-1/2 md:w-4/5 shadow-xl mx-auto text-center space-y-6">
          <img
            src={guide?.profilePicture}
            alt={guide?.name}
            className="w-36 rounded-full mx-auto"
          />
          <p className="font-bold text-xl md:text-2xl font-serif">
            {guide?.name}
          </p>
          <p className="font-light text-xl md:text-2xl font-serif">
            {guide?.email}
          </p>
          <p className="font-light text-xl md:text-2xl font-serif">
            {guide?.number}
          </p>
          <p className="font-light text-xl md:text-2xl font-serif">
            {guide?.address}
          </p>
          <p className="font-light text-xl md:text-2xl font-serif">
            {guide?.education}
          </p>
          <p className="font-light text-xl md:text-2xl font-serif">
            {guide?.work_experience}
          </p>
          <Rate disabled value={guide?.rating} />
          <p className="font-light text-base md:text-xl font-serif">
            {guide?.skills?.map((skill: string, index: number) => (
              <span className="inline-block px-2" key={index}>
                {skill}
              </span>
            ))}
          </p>
        </div>
        <div className="reviews my-20">
          <SectionTitle heading={`What People Say About ${guide?.name}`} />
          <div className="carousel rounded-box p-12 gap-20">
            {guide?.comments?.map(
              (
                comment: { name: string; comment: string; rating: number },
                index: number,
              ) => (
                <div
                  className="carousel-item shadow-xl p-12 flex-col space-y-4"
                  key={index}
                >
                  <p className="font-bold text-xl md:text-2xl font-serif">
                    {comment.name}
                  </p>
                  <Rate value={comment.rating} disabled />
                  <p className="font-light text-[15px] font-serif">
                    {comment.comment}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
        <div className="add-reviews my-20">
          <SectionTitle heading={`Add Your Experience With ${guide?.name}`} />
          <div className="card shrink-0 w-full md:w-4/5 lg:w-1/2 mx-auto shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <p className="text-2xl font-serif font-semibold text-center mb-4">
                Rate {guide?.name}
              </p>
              <div className="my-4 text-center">
                <Rate onChange={(value: number) => setRatingByUser(value)} />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                  {...register("name")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Experience</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Your Experience"
                  rows={5}
                  required
                  {...register("comment")}
                ></textarea>
              </div>
              <div className="form-control mt-6">
                <ButtonOutline2
                  buttonType="submit"
                  text="Add Experience"
                  afunction={handleClick}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuideProfile;
