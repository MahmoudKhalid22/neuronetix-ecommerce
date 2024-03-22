import React from "react";

function About() {
  return (
    <div
      id="about"
      className=" mr-20 sm:mr-28 lg:mr-[20rem] py-8 flex items-start flex-col overflow-x-hidden"
    >
      <h2 className="text-xl sm:text-3xl font-bold text-[#000] mb-8 ml-6">
        About us
      </h2>

      <p className="text-black ml-4 sm:w-[30rem] lg:w-[80%] mb-12 leading-[3rem] text-2xl">
        <span className="text-[#ec981a] mr-2">
          Located at Zagazig (Algalaa street),
        </span>
        Typa Electronics is more than just an electronics store - we're your
        gateway to cutting-edge printing solutions. Driven by a passion for
        excellence, we offer a handpicked selection of premium printers designed
        to meet the diverse needs of our customers. Whether you're a
        professional seeking top-tier performance or a home user in search of
        reliability, Typa Electronics has the perfect solution for you.
        Experience the convenience of superior printing technology coupled with
        exceptional service. Visit Typa Electronics today and discover why we're
        Cityville's go-to destination for all things electronics.{" "}
      </p>
    </div>
  );
}

export default About;
