import React from "react";

function About() {
  return (
    <div
      id="about"
      className="py-28
     px-6"
    >
      <h2 className="my-4 text-xl sm:text-3xl font-bold text-[#6d727b] block">
        About us
      </h2>

      <p className="text-black sm:w-[30rem] lg:w-[90%] mb-12 leading-8 sm:leading-[2.5rem] md:leading-[3rem] text-sm sm:text-md md:text-2xl">
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
        Cityville's go-to destination for all things electronics.
      </p>
    </div>
  );
}

export default About;
