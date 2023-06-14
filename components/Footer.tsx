"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-[#ecf7ff] py-6 text-black text-center border-t-2 border-gray-300">
      <div className="container mx-auto px-6 flex flex-wrap justify-evenly">
        <div className="w-full md:w-1/5 ">
          <h6 className="text-lg font-semibold text-center">PLATFORM</h6>
          <ul className="">
            <li>One Legal Platform</li>
            <li>Legal Applications</li>
            <li>Contract Drafting</li>
            <li>Contract Revision</li>
            <li>Contract Translation</li>
            <li>New Features</li>
          </ul>
        </div>
        <div className="w-full md:w-1/5">
          <h6 className="text-lg font-semibold text-center">CUSTOMER</h6>
          <ul>
            <li>Customer Story</li>
            <li>Customer Feedback</li>
            <li>Areas of Improvments</li>
          </ul>
        </div>
        <div className="w-full md:w-1/5">
          <h6 className="text-lg font-semibold text-center">LEARN</h6>
          <ul>
            <li>Webinars</li>
            <li>Events</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="w-full md:w-1/5">
          <h6 className="text-lg font-semibold text-center">COMPANY</h6>
          <ul>
            <li>
              <a href="/About">ABOUT US</a>
            </li>
            <li>PARTNERS</li>
            <li>TEAMS</li>
            <li>CAREERS</li>
            <li>CONTACT</li>
          </ul>
        </div>
      </div>
      <div className="mt-6 flex justify-center space-x-6">
        <a href="#" className="text-gray-600 hover:text-gray-800">
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-800">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-800">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
      </div>
      <p className="mt-6 text-sm">© 2023 BiglawAI. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
