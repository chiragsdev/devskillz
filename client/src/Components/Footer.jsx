import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

const Footer = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return (
    <footer className="relative left-0 bottom-0 w-full py-5 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 sm:px-20 px-4">
      <section className="text-lg mb-3 sm:mb-0">
        © {year} | All rights reserved
      </section>
      <section className="flex items-center justify-center gap-5 text-2xl">
        <a
          href="#"
          className="hover:text-yellow-500 transition-all ease-in-out duration-300"
        >
          <BsFacebook />
        </a>
        <a
          href="#"
          className="hover:text-yellow-500 transition-all ease-in-out duration-300"
        >
          <BsInstagram />
        </a>
        <a
          href="#"
          className="hover:text-yellow-500 transition-all ease-in-out duration-300"
        >
          <BsTwitter />
        </a>
        <a
          href="https://www.linkedin.com/in/chiragaug6/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-500 transition-all ease-in-out duration-300"
        >
          <BsLinkedin />
        </a>
      </section>
    </footer>
  );
};

export default Footer;
