"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RefreshPage } from "@/components/RefreshPage"; // Make sure to adjust the path

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Temesgen Muruts",
      position: "Machine Learning Engineer, Backend Developer",
      imageUrl: "/Images/Temesgen_5.jpg",
    },
    {
      name: "Abdulhamid Mousa",
      position: "DevOps Engineer, Frontend Developer",
      imageUrl: "/Images/Abdulhamid_3.jpg",
    },
    {
      name: "Nash Mohammed",
      position: "Entrepreneur, Business Development Expert",
      imageUrl: "/Images/Nash_6.jpg",
    },
    {
      name: "Sana Aloute",
      position: "Full Stack Engineer, Machine Learning Engineer.",
      imageUrl: "/Images/Elsone_6.jpg",
    },
    {
      name: "Helina Fikru",
      position: "Entrepreneur, Marketing Expert, Business Analysts",
      imageUrl: "/Images/Helina_6.jpg",
    },
    {
      name: "Kai Xue",
      position: "Corporate Lawyer, UC Law School Graduate, Law Practitioner",
      imageUrl: "/Images/Kai Xue.jpg",
    },
  ];

  return (
    <>
      <RefreshPage />
      {
        <div>
          <div>
            <h1 className="text-4xl font-semibold text-gray-700 mt-10 mb-10 text-center">
              MEET BIGLAW-AI TEAM
            </h1>
            <div className="grid grid-cols-3 gap-4 mr-[100px] ml-[100px]">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center ">
                  <div className="w-32 h-32 mx-auto border-[5px] border-black rounded-full">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      width={300}
                      height={200}
                      className="rounded-full"
                    />
                  </div>
                  <h2 className="text-2xl font-semibold mt-5">{member.name}</h2>
                  <p className="mb-10">{member.position}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center mt-5 mb-5">
            <Link href="/About/Team">
              <div
                className="flex  bg-blue-300 mb-[50px] hover:bg-[#7c8db9] cursor-pointer border-2 border-black rounded-md h-[50px] w-[360px] ease-in-out"
                style={{ fontFamily: "Pangea, sans-serif" }}
              >
                <div className="flex-1 justify-center text-center py-3 ">
                  <div className="nav__item text-center">
                    MEET THE FULL TEAM
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      }
    </>
  );
};

export default AboutUs;
