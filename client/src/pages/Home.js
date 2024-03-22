import React from "react";

import Proposal from "../components/Proposal";
import About from "../components/About";
import Products from "../components/Products";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Proposal />
      <About />
      <Products />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;
