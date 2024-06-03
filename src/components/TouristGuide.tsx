import React, { useEffect, useState } from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Modal } from "antd";
import usePublicAxios from "../hooks/usePublicAxios";
import Package from "../interfaces/Package";
import TourCard from "./TourCard";
const TouristGuide: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tourdata, setTourdata] = useState<Package[]>([]);
  const publicAxios = usePublicAxios();
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
        .then((res) => setTourdata(res.data))
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
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
              {tourdata.map((tour, index) => (
                <TourCard key={index} tourData={tour} />
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default TouristGuide;
