"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Empower_Your_Legal_Team from "../public/Images/Empower_Your_Legal_Team.png";
import Drafting_Summarizing from "../public/Images/Drafting and Summarizing Agreements.png";
import Data_Security_Privacy from "../public/Images/Data_Security_and_Privacy.jpg";
import Analyze_Legal_Documents from "../public/Images/analyze legal documents .jpeg";
import Multilingual_Translation from "../public/Images/Multilingual_Translation.jpg";

const HomePage = () => {
  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="px-8 md:px-24 py-12">
          <section className="grid grid-cols-2  mb-[100px] mt-[100px]    justify-between">
            <div>
              <h1 className="text-4xl font-semibold text-gray-700 ml-5 mt-10">
                Your AI-Powered Legal Assistant
              </h1>
              <h2 className="text-2xl ml-5 mr-5 mt-5 justify-items-end text-justify">
                Our goal is to provide corporate lawyers with an end-to-end
                solution for automating the process of contract generation,
                contract summarization, contract translation, and all while
                protecting and maintaining client's confidentiality.
              </h2>
            </div>
            <div className="mr-10 mt-5 mb-5 ml-10">
              <video
                src="/Videos/Welcome_BIGLAW_Video_1.mp4"
                className="w-full h-auto rounded-lg shadow-lg"
                controls
              ></video>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-10 mb-[100px] mt-[100px]   justify-between ">
            <div className="flex ">
              <Image
                src={Empower_Your_Legal_Team}
                alt="Empower Your Legal Team"
                width={600}
                className="rounded-lg "
              />
            </div>
            <div className="">
              <h1 className="text-4xl font-semibold text-gray-700 ml-5 mt-[100px]">
                Empower Your Legal Team
              </h1>
              <h2 className="text-2xl ml-5 mr-5 mt-5 mb-5 justify-items-end text-justify ">
                Business moves quickly. You need more time to focus on what you
                do best: modern legal design and high-level, strategic thinking.
                <br />
                <br />
                Let us help you — deliver value to the business through seamless
                and secure self-service, automate repetitive tasks, and
                translate legal contracts to handle international clients with
                ease.
              </h2>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-10 mb-[150px] mt-[100px]   justify-between">
            <div>
              <h1 className="text-4xl font-semibold text-gray-700 ml-5 mt-[100px] ">
                Drafting and Summarizing Agreements
              </h1>
              <h2 className="text-2xl ml-5 mr-5 mt-5 mb-5 justify-items-end text-justify ">
                BIGLAW-AI leverages advanced natural language processing and
                machine learning algorithms to automatically generate contracts
                and agreements based on the user's input and specific
                requirements.
                <br />
                <br />
                It can create customizable templates, which can be easily
                modified to fit the unique circumstances of each case, saving
                time and increasing efficiency.
              </h2>
            </div>
            <div className="flex justify-end">
              <Image
                src={Drafting_Summarizing}
                alt="Drafting and Summarizing Agreements"
                width={600}
                className="rounded-lg "
              />
            </div>
          </section>

          <section className="grid grid-cols-2 gap-10 mb-[150px] mt-[100px]    ">
            <div className="flex justify-between ">
              <Image
                src={Data_Security_Privacy}
                alt="AI and Legal Contract Management"
                width={600}
                className="rounded-lg "
              />
            </div>
            <div>
              <h1 className="text-4xl font-semibold text-gray-700 ml-5 mt-[100px] ">
                Data Security and Privacy
              </h1>
              <h2 className="text-2xl ml-5 mr-5 mt-5 mb-5 justify-items-end text-justify ">
                Recognizing the sensitive nature of legal documents, we
                prioritize the security and privacy of our customers' data.
                <br />
                <br />
                BigLawAI’s scrubbing system removes any sensitive information
                before any data or document is transmitted to an online API.This
                ensures that our customers' confidential information remains
                protected and secure throughout the entire process.
              </h2>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-10 mb-[150px] mt-[150px]    ">
            <div>
              <h1 className="text-4xl font-semibold text-gray-700 ml-5 mt-[100px] ">
                Legal research & Due diligence
              </h1>
              <h2 className="text-2xl ml-5 mr-5 mt-5 mb-5 justify-items-end text-justify ">
                BIGLAW-AI can analyze existing contracts and agreements to
                ensure their accuracy, clarity, and compliance with applicable
                laws and regulations.
                <br />
                <br />
                BIGLAW-AI can be used to monitor regulatory changes and ensure
                that companies are complying with applicable laws and
                regulations.
                <br />
                <br />
                It can also identify potential risks, ambiguities, and
                inconsistencies, allowing corporate lawyers to make necessary
                revisions and improvements before finalizing the documents.
              </h2>
            </div>
            <div className="flex justify-end ">
              <Image
                src={Analyze_Legal_Documents}
                alt="AI and Legal Contract Management"
                height={600}
                className="rounded-lg "
              />
            </div>
          </section>

          <section className="grid grid-cols-2 gap-10 mb-[200px] mt-[150px]  justify-between">
            <div className="flex ">
              <Image
                src={Multilingual_Translation}
                alt="AI and Legal Contract Management"
                width={600}
                className="rounded-lg "
              />
            </div>
            <div>
              <h1 className="text-4xl font-semibold text-gray-700 ml-5 mt-[100px] ">
                Multilingual Translation
              </h1>
              <h2 className="text-2xl ml-5 mr-5 mt-5 mb-5 justify-items-end text-justify ">
                BIGLAW-AI can analyze existing contracts and agreements to
                ensure their accuracy, clarity, and compliance with applicable
                laws and regulations.
                <br />
                <br />
                It can also identify potential risks, ambiguities, and
                inconsistencies, allowing corporate lawyers to make necessary
                revisions and improvements before finalizing the documents.
              </h2>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-10  mb-[100px] mt-[100px]   ">
            <h1 className="text-3xl font-semibold text-gray-700 ">
              What People Say About Us...
            </h1>
            <blockquote className="text-3xl italic text-justify">
              "I've found that BigLawAI has transformed the way I work. The
              platform's advanced features, such as automated contract
              generation and multilingual translation, have not only streamlined
              my workflow but also improved my productivity."
            </blockquote>
            <p className="mt-3 text-right">
              - Joys Choi, Senior Corporate Counsel at Tipalti
            </p>
          </section>

          <section className="grid grid-cols-1 gap-10  mb-15 mt-[100px]">
            <h1 className="text-3xl font-semibold text-gray-700 mt-15">
              Your Goals, Your Pace
            </h1>
            <p className="text-3xl text-justify">
              Our team of legal experts and technologists are here to help you
              on your digital transformation journey. We will help you identify
              your starting point and build a map for your success. Learn more
              about how our Transformation team can support you with
              complimentary planning and implementation.
            </p>
            <div className="flex justify-center items-center mt-5 mb-5">
              <Link href="/Guide" legacyBehavior>
                <div
                  className="flex  bg-blue-300 mb-[12px] hover:bg-white cursor-pointer border-2 border-black rounded-md h-[50px] w-[120px] ease-in-out"
                  style={{ fontFamily: "Pangea, sans-serif" }}
                >
                  <div className="flex-1 justify-center text-center py-3 ">
                    <a className="nav__item text-center">Guide</a>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default HomePage;
