import React, { useEffect, useState } from "react";
import Package from "../interfaces/Package";
import usePublicAxios from "../hooks/usePublicAxios";
import { Link, useNavigate, useParams } from "react-router-dom";
import User from "../interfaces/User";
import useUser from "../hooks/useUser";
import { Rate } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import useSecureAxios from "../hooks/useSecureAxios";
import Swal from "sweetalert2";
import { Modal } from "antd";
interface IFormInput {
  name: string;
  email: string;
  price: number;
  date: Date;
  photoURL: string;
  guide: string;
}
const TourDetails: React.FC = () => {
  const [tourData, setTourData] = useState<Package>();
  const { id } = useParams();
  const { register, handleSubmit } = useForm<IFormInput>();
  const publicAxios = usePublicAxios();
  const [formData, setFormData] = useState<IFormInput>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const secureAxios = useSecureAxios();
  const guides: User[] = useUser("guide");
  const { user } = useAuth();
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    secureAxios
      .post(`/bookings`, {
        email: user?.email,
        name: user?.displayName,
        photoURL: user?.photoURL,
        price: tourData?.price,
        date: formData?.date,
        guide: formData?.guide,
        status: "In Review",
        packageID: tourData?._id,
      })
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            title: "Successful",
            text: `${res.data.message}`,
            icon: "success",
            confirmButtonText: "Close",
          });
        }
      })
      .catch((err) => console.error(err));
  };
  const navigate = useNavigate();
  const handleClick = () => {
    user || navigate("/login");
  };
  const onSubmit: SubmitHandler<IFormInput> = (data, event) => {
    setFormData(data);
    setIsModalOpen(true);
    event?.target.reset();
  };
  useEffect(() => {
    publicAxios
      .get(`/packages/singlePackage?id=${id}`)
      .then((res) => setTourData(res.data))
      .catch((err) => console.error(err));
  }, [publicAxios, id]);
  return (
    <>
      <div
        className="w-full md:h-[70vh] h-[60vh] bg-cover bg-top relative"
        style={{ backgroundImage: `url('${tourData?.images[0]}')` }}
      >
        <div className="w-full h-full bg-titleColor bg-opacity-45">
          <div className="content absolute bottom-8 left-4">
            <h2 className="text-primaryColor font-serif font-bold md:text-4xl text-2xl">
              {tourData?.title} in
            </h2>
            <p className="text-primaryColor font-serif font-bold md:text-4xl text-2xl">
              {tourData?.location}
            </p>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-rows-2 lg:grid-flow-col lg:w-4/5 w-full px-4 mx-auto gap-2 mt-20">
        <div className="lg:row-span-2">
          <img
            src={tourData?.images[0]}
            alt={tourData?.title}
            className="h-full object-cover"
          />
        </div>
        <div>
          <img src={tourData?.images[1]} alt={tourData?.title} />
        </div>
        <div>
          <img src={tourData?.images[2]} alt={tourData?.title} />
        </div>
      </div>
      <div className="content lg:w-4/5 w-full px-4 mx-auto space-y-12 my-12">
        <p className="text-[15px] leading-[30px]">
          {tourData?.description?.slice(0, 400)}.
        </p>
        <p className="text-[15px] leading-[30px]">
          {tourData?.description?.slice(400)}
        </p>
      </div>

      <div className="tour-plan lg:w-4/5 w-full px-4 mx-auto">
        {tourData?.tourPlan?.day1 && (
          <p className="text-[15px] leading-[30px]">
            <span className="font-bold uppercase">Day-1: </span>
            {tourData?.tourPlan?.day1}
          </p>
        )}
        {tourData?.tourPlan?.day2 && (
          <p className="text-[15px] leading-[30px]">
            <span className="font-bold uppercase">Day-2: </span>
            {tourData?.tourPlan?.day2}
          </p>
        )}
        {tourData?.tourPlan?.day3 && (
          <p className="text-[15px] leading-[30px]">
            <span className="font-bold uppercase">Day-3: </span>
            {tourData?.tourPlan?.day3}
          </p>
        )}
      </div>
      <h2 className="text-center my-12 text-2xl font-serif md:text-4xl font-bold">
        Meet Our Guides
      </h2>
      <div className="guides text-center">
        <div className="carousel carousel-center rounded-box">
          {guides.map((guide: User, index: number) => (
            <div
              className="carousel-item bg-base-100 shadow-xl mb-12"
              key={index}
            >
              <div className="text-center bg-primaryColor px-8 space-y-4 my-12">
                <div className="">
                  <img
                    src={guide.profilePicture}
                    alt={guide.name}
                    className="w-24 rounded-full mx-auto"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-serif font-bold">{guide.name}</h1>
                  <p className="text-base font-serif font-semibold">
                    {guide.role}
                  </p>
                </div>
                <div>
                  {guide.comments?.slice(0, 1).map((comment, index) => (
                    <p className="text-[13px]" key={index}>
                      {comment.comment}
                    </p>
                  ))}
                </div>
                <div>
                  <Rate disabled defaultValue={guide.rating} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-center my-12 text-2xl font-serif md:text-4xl font-bold">
        Book Your Trip Now
      </h2>
      <div className="card shrink-0 w-full lg:w-1/2 md:w-4/5 mx-auto shadow-2xl bg-base-100 my-12">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-4">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered"
                required
                {...register("name")}
                readOnly
                defaultValue={user?.displayName || ""}
              />
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                required
                {...register("email")}
                readOnly
                defaultValue={user?.email || ""}
              />
            </div>
          </div>
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              placeholder="Photo URL"
              className="input input-bordered"
              required
              {...register("photoURL")}
              readOnly
              defaultValue={user?.photoURL || ""}
            />
          </div>
          <div className="flex gap-4">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                placeholder="Price"
                className="input input-bordered"
                required
                {...register("price")}
                readOnly
                defaultValue={tourData?.price}
              />
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                type="datetime-local"
                placeholder=""
                className="input input-bordered"
                required
                {...register("date")}
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Guide</span>
            </label>
            <select
              className="select select-bordered w-full max-w-xs"
              {...register("guide")}
              required
            >
              <option defaultValue={`Allsamir`}>Choose Your Guide</option>
              {guides.map((guide, index) => (
                <option key={index} value={`${guide.name}`}>
                  {guide.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-outline text-secondaryColor hover:border-none uppercase"
              onClick={handleClick}
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
      <Modal
        title={`${tourData?.title}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={`Confirm Your Booking`}
      >
        <div className="text-center my-16">
          <Link to={`/home`} className="text-xl font-bold">
            My Bookings
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default TourDetails;
