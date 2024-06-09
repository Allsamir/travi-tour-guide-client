import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import useSecureAxios from "../hooks/useSecureAxios";
import useAuth from "../hooks/useAuth";
import { Rate } from "antd";
import SectionTitle from "../components/SectionTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import ButtonOutline2 from "../components/ButtonOutline2";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Swal from "sweetalert2";

interface IFormInput {
  profilePicture: string;
}
const Profile: React.FC = () => {
  const secureAxios = useSecureAxios();
  const { user } = useAuth();
  const { register, handleSubmit } = useForm<IFormInput>();
  const {
    data: guide,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["guideProfile"],
    queryFn: async () =>
      (await secureAxios.get(`/users/guide?email=${user?.email}`)).data,
  });
  const fixedOptions = guide?.skills || [];
  const [value, setValue] = useState([...fixedOptions]);
  const onSubmit: SubmitHandler<IFormInput> = (data, event) => {
    secureAxios
      .patch(`/users/updateGuideProfile?id=${guide?._id}`, {
        profilePicture: data.profilePicture,
        skills: value,
      })
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            title: "Successful",
            text: `${res.data.message}`,
            icon: "success",
            confirmButtonText: "Close",
            timer: 1500,
          });
          event?.target.reset();
          refetch();
        }
      })
      .catch((err) => console.error(err));
  };
  const skills = [
    "Swimming",
    "Saving",
    "Protecting",
    "Raiding",
    "Hiking",
    "Problem Solving",
    "Guiding",
    "Helping",
    "Cooking",
    "Camping",
    "Running",
  ];
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
        <title>Travi - Dashboard | My Profile</title>
      </Helmet>
      <div className="container mx-auto px-4">
        <div className="my-20">
          <div className="profile-image text-center space-y-4">
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
        </div>
        <div className="divider"></div>
        <div className="update-profile">
          <SectionTitle
            heading="Update Your Profile"
            subheading="Please Update your profile to showcase your skills and expertise"
          />
          <div className="hero bg-base-100 mb-12">
            <div className="hero-content flex-col w-full lg:w-1/2 md:w-4/5 lg:flex-row-reverse">
              <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Update Your Profile Picture
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your any live photo link"
                      className="input input-bordered"
                      {...register("profilePicture")}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Add Your Skills</span>
                    </label>
                    <Autocomplete
                      multiple
                      id="fixed-tags-demo"
                      value={value}
                      onChange={(event, newValue) => {
                        console.log(event);
                        setValue([
                          ...fixedOptions,
                          ...newValue.filter(
                            (option) => fixedOptions.indexOf(option) === -1,
                          ),
                        ]);
                      }}
                      options={skills}
                      getOptionLabel={(option) => option}
                      renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                          <Chip
                            label={option}
                            {...getTagProps({ index })}
                            disabled={fixedOptions.indexOf(option) !== -1}
                          />
                        ))
                      }
                      style={{ width: "100%" }}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Add Your Skills" />
                      )}
                    />
                  </div>
                  <div className="form-control mt-6">
                    <ButtonOutline2
                      text="Update your profile"
                      buttonType="submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
