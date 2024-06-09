import React from "react";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../components/SectionTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import ButtonOutline2 from "../components/ButtonOutline2";
import useSecureAxios from "../hooks/useSecureAxios";
import Swal from "sweetalert2";
interface IFormInput {
  title: string;
  tourType: string;
  price: number;
  img1: string;
  img2: string;
  img3: string;
  description: string;
  day1: string;
  day2: string;
  day3: string;
  location: string;
}
const AddPackages: React.FC = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const secureAxios = useSecureAxios();
  const onSubmit: SubmitHandler<IFormInput> = (data, event) => {
    console.log({
      title: data.title,
      tourType: data.tourType,
      price: data.price,
      images: [data.img1, data.img2, data.img3],
      description: data.description,
      tourPlan: {
        day1: data.day1,
        day2: data.day2,
        day3: data.day3,
      },
      location: data.location,
    });
    secureAxios
      .post("/packages", {
        title: data.title,
        tourType: data.tourType,
        price: data.price,
        images: [data.img1, data.img2, data.img3],
        tourPlan: {
          day1: data.day1,
          day2: data.day2,
          day3: data.day3,
        },
        location: data.location,
      })
      .then((res) => {
        Swal.fire({
          title: "Successful",
          text: `${res.data.message}`,
          icon: "success",
          confirmButtonText: "Close",
          timer: 1500,
        });
        event?.target.reset();
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <Helmet>
        <title>Travi - Dashboard | Add Packages</title>
      </Helmet>
      <SectionTitle
        heading="Add Package"
        subheading="Add Packages that users will likely to visit make sure packages are attractive"
      ></SectionTitle>
      <div className="hero">
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
                  <span className="label-text">Tour Type</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  {...register("tourType")}
                >
                  <option defaultValue={`Wildlife`}>
                    Choose Your Tour Type
                  </option>
                  <option value={`Wildlife`}>Wildlife</option>
                  <option value={`Hiking`}>Hiking</option>
                  <option value={`Air Rides`}>Air Rides</option>
                  <option value={`Sports`}>Sports</option>
                  <option value={`Riding`}>Riding</option>
                  <option value={`Swimming`}>Swimming</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  placeholder="Price"
                  className="input input-bordered"
                  required
                  {...register("price")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image-1</span>
                </label>
                <input
                  type="text"
                  placeholder="Image Link(2200X1620)"
                  className="input input-bordered"
                  required
                  {...register("img1")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image-2</span>
                </label>
                <input
                  type="text"
                  placeholder="Image Link(2200X1620)"
                  className="input input-bordered"
                  required
                  {...register("img2")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image-3</span>
                </label>
                <input
                  type="text"
                  placeholder="Image Link(2200X1620)"
                  className="input input-bordered"
                  required
                  {...register("img3")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <input
                  type="text"
                  placeholder="Write the best description"
                  className="input input-bordered"
                  required
                  {...register("description")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tour Plan</span>
                </label>
                <input
                  type="text"
                  placeholder="Day 1"
                  className="input input-bordered"
                  required
                  {...register("day1")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tour Plan</span>
                </label>
                <input
                  type="text"
                  placeholder="Day 2"
                  className="input input-bordered"
                  required
                  {...register("day2")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tour Plan</span>
                </label>
                <input
                  type="text"
                  placeholder="Day 3"
                  className="input input-bordered"
                  {...register("day3")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  type="text"
                  placeholder="Best Location"
                  className="input input-bordered"
                  required
                  {...register("location")}
                />
              </div>
              <div className="form-control mt-6">
                <ButtonOutline2 text="Add Package" buttonType="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPackages;
