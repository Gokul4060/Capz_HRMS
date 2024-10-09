import React from "react";
import Navbar from "../Components/LandingComponents/Navbar/Navbar1";
import Home from "../Components/LandingComponents/Home/Home";
import FeatureTop from "../Components/LandingComponents/FeaturesTop/FeaturesTop";
import Features from "../Components/LandingComponents/Features/Features";
import Testimonial from "../Components/LandingComponents/Testimonial/Testimonial";
import Newsletter from "../Components/LandingComponents/Newsletter/Newsletter";
import Contact from "../Components/LandingComponents/Contact/Contact";
import Footer from "../Components/LandingComponents/Footer/Footer";

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="w-full shadow-lg z-10" />
      <main className="flex-1">
        <section className="bg-gray-100 py-6 md:py-12">
          <Home />
        </section>
        <section className="bg-white py-6 md:py-12">
          <FeatureTop />
        </section>
        <section className="bg-gray-100 py-6 md:py-12">
          <Features />
        </section>
        <section className="bg-white py-6 md:py-12">
          <Testimonial />
        </section>
        <section className="bg-gray-100 py-6 md:py-12">
          <Newsletter />
        </section>
        <section className="bg-white py-6 md:py-12">
          <Contact />
        </section>
      </main>
      <Footer className="bg-gray-800 text-white py-4 md:py-6" />
    </div>
  );
};

export default Landing;
