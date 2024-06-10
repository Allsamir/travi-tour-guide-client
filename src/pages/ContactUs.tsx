import React from "react";
import { Helmet } from "react-helmet-async";
import PageCover from "../components/PageCover";
import Map from "../components/Map";
import ButtonOutline2 from "../components/ButtonOutline2";

const ContactUs: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Travi - Tour Guide | Contact Us</title>
      </Helmet>
      <PageCover
        imageURL="https://arsitagx-master.s3.ap-southeast-1.amazonaws.com/img-medium/8021/10891/lex-and-architects-dipo-residence1553846575-m.jpeg"
        text="Contact Us"
        secondText="Anytime"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-20">
        <Map />
        <>
          <div className={`hero `}>
            <div className="hero-content">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">Travi Tour Guide</h1>
                <p className="py-6">
                  We provide the best travel experience and with us your
                  travelling becomes your life. Feel free to contact us anytime
                </p>
                <a href="tel:01863966821">
                  <ButtonOutline2 text="Contact Us" />
                </a>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default ContactUs;
