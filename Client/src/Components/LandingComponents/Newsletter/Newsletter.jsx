import React from "react";

const Newsletter = () => {
  return (
    <section className="py-16 bg-customplam text-white" data-aos="fade-up">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Stay Updated with Our Newsletter
        </h2>
        <p className="text-xl mb-8">
          Subscribe to our newsletter to get the latest updates and news.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row justify-center items-center max-w-lg mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-md sm:mr-4 mb-4 sm:mb-0 text-gray-800"
          />
          <button
            type="submit"
            className="bg-white text-customplam py-3 px-8 rounded-md font-semibold hover:bg-gray-100"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-4">
          We respect your privacy.{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
