import React, { useEffect, useState } from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Modal, Rate } from "antd";
import usePublicAxios from "../hooks/usePublicAxios";
import Package from "../interfaces/Package";
import TourCard from "./TourCard";
import useUser from "../hooks/useUser";
import User from "../interfaces/User";
import { Link } from "react-router-dom";
import ButtonOutline2 from "./ButtonOutline2";
const TouristGuide: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tourdata, setTourdata] = useState<Package[]>([]);
  const [tourDataLoading, settourDataLoading] = useState(true);
  const publicAxios = usePublicAxios();
  const guides: User[] = useUser("guide");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (tabIndex === 1) {
      publicAxios
        .get(`/packages/limited`)
        .then((res) => {
          setTourdata(res.data);
          settourDataLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [tabIndex, publicAxios]);
  return (
    <>
      <div className="mb-20">
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList className={`text-center`}>
            <Tab>Overview</Tab>
            <Tab>Our Packages</Tab>
            <Tab>Our Guides</Tab>
          </TabList>
          <TabPanel>
            <div
              className="w-full h-[70vh] bg-cover bg-center mt-8 flex justify-center items-center"
              style={{
                backgroundImage:
                  "url('http://quickdevs.com/demo/travi/images/commons/video-bg.jpg')",
              }}
            >
              <FaRegPlayCircle
                className="text-5xl text-secondaryColor"
                onClick={showModal}
              />
            </div>
            <Modal
              open={isModalOpen}
              onCancel={handleCancel}
              centered={true}
              footer={null}
              className="videoModal"
            >
              <iframe
                className="w-full h-[400px]"
                src="https://www.youtube.com/embed/9GvTYd5hG_g?si=n5f3eDJ7ZefAdAKj"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen={true}
              ></iframe>
            </Modal>
          </TabPanel>
          <TabPanel>
            {tourDataLoading ? (
              <div className="flex justify-center items-center h-[80vh]">
                <span className="loading loading-bars loading-lg"></span>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
                {tourdata.map((tour, index) => (
                  <TourCard key={index} tourData={tour} />
                ))}
              </div>
            )}
            <div className="text-center mt-12">
              <Link to={`/all-packages`}>
                <ButtonOutline2 text="All Packages" />
              </Link>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12">
              {guides.map((guide: User, index: number) => (
                <div
                  className="bg-base-100 shadow-xl text-center space-y-4 py-12"
                  key={index}
                >
                  <div>
                    <img
                      src={guide.profilePicture}
                      alt={guide.name}
                      className="w-24 rounded-full mx-auto"
                    />
                  </div>
                  <div>
                    <h1 className="text-xl font-serif font-bold">
                      {guide.name}
                    </h1>
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
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default TouristGuide;
