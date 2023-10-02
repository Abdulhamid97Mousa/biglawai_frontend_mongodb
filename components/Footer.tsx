"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
  faYoutubeSquare,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import Company_logo from "/public/Images/logo-c2-2.png";

import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  // Hide the footer on the "/Tryout" route
  if (
    pathname?.startsWith("/Logged-in") ||
    pathname?.startsWith("/sign-in") ||
    pathname?.startsWith("/sign-up") ||
    pathname?.startsWith("/About") ||
    pathname?.startsWith("/Guide") ||
    pathname?.startsWith("/Dashboard") ||
    pathname?.startsWith("/Pricing") ||
    pathname?.startsWith("/Contacts")
  ) {
    return null;
  }

  return (
    <footer className="bg-[#4666d6] py-12 text-white border-t-2 border-gray-300 relative z-auto">
      <div className=" mx-auto  flex flex-wrap relative">
        <div className="w-1/4 mb-4">
          <Image src={Company_logo} alt="logo" priority={true} width={200} />
        </div>

        <div className="w-1/4  pl-4">
          <h6 className="text-lg font-semibold">Company</h6>
          <ul>
            <li>About</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="w-1/4  pl-4">
          <h6 className="text-lg font-semibold">Product</h6>
          <ul>
            <li>Pricing</li>
            <li>Security</li>
            <li>Resources</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className="w-1/4 pl-4">
          <h6 className="text-lg font-semibold">BigLawAI</h6>
          <p>2023 Privacy Policy </p>
          <p>Terms of Use</p>
          <p className="mt-2 font-semibold">Follow us on:</p>
          <div className="mt-2 flex space-x-4">
            <a href="#" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a href="#" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" aria-label="Youtube">
              <FontAwesomeIcon icon={faYoutubeSquare} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
