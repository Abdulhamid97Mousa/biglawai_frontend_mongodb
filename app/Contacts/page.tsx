"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import countries from "./countries.json";
import questionTypes from "./questionTypes.json";

const Select = dynamic(() => import("react-select"), { ssr: false });

const ContactPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    notes: "",
    country: null,
    questionType: null,
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handlePhoneChange = (value: string) => {
    setForm({ ...form, phoneNumber: value });
  };

  const handleCountryChange = (selectedOption: any) => {
    setForm({ ...form, country: selectedOption });
  };

  const handleQuestionTypeChange = (selectedOption: any) => {
    setForm({ ...form, questionType: selectedOption });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="container mx-auto px-4 py-5">
      <div className="grid grid-cols-2 gap-[50px]  mt-[50px] mb-[50px]">
        <div>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Your Feedback Shapes BIGLAW-AI
          </h1>
          <p className="mb-4 text-justify">
            BIGLAW-AI, our AI-powered solution, is designed to make corporate
            lawyers' work easier by automating contract generation, revision,
            translation, and confidentiality maintenance. But we know there's
            always room for improvement and innovation.
          </p>
          <h2 className="text-xl font-bold mb-4 text-center">
            That's where you come in !!!
          </h2>
          <h3 className="text-lg mb-2">
            1. Are you finding our contract and agreement generation useful?
          </h3>
          <h3 className="text-lg mb-2">
            2. Is our system providing the accuracy and efficiency you need for
            contract review and analysis?
          </h3>
          <h3 className="text-lg mb-2">
            3. Are the multilingual translation capabilities meeting your needs
            when dealing with international clients or legal systems?
          </h3>
          <h3 className="text-lg mb-5">
            4. Is the integrated online text editor making your
            agreement-writing process smoother?
          </h3>

          <h2 className="text-xl font-bold mb-5 mt-5 text-center">
            Office Location
          </h2>
          <p className="mb-5">
            Address: Building 14, Beijing Institute of Technology (Zhongguancun
            campus), Haidian District, Beijing, China
          </p>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-4 text-center">
            We're a customer centric company
          </h1>
          <h3 className="mb-5 text-justify">
            We would really appreciate it if you could take a few moments to
            provide us with your valuable feedback. Tell us how we can enhance
            BIGLAW-AI, what features you find beneficial, and any elements that
            you think could be improved. Your feedback is essential to us in our
            mission to provide an end-to-end solution for corporate lawyers.
            Help us fine-tune our service to better meet your needs.
          </h3>
          <h3 className="text-2xl font-bold mb-5 text-center">Your feedback</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              pattern="[a-z0-9._%+-]{6,}@[a-z0-9.-]+\.[a-z]{2,}$"
              required
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded mb-2 col-span-1"
            />

            <Select
              placeholder="Select a country"
              options={countries}
              onChange={handleCountryChange}
              className="block w-full p-2 border border-gray-300 rounded mb-2"
            />
            <Select
              placeholder="Select a question type"
              options={questionTypes}
              onChange={handleQuestionTypeChange}
              className="block w-full p-2 border border-gray-300 rounded mb-2"
            />
            <textarea
              name="notes"
              placeholder="Notes"
              maxLength={500}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded h-32 relative col-span-2"
            ></textarea>
            <div className=" flex border rounded border-gray-300  mb-2 w-[240px] ">
              <div className="flex ml-2 text-[#9ca3af]">
                Please no more than:{" "}
              </div>
              <div className="flex ml-2 text-[#9ca3af]">
                {form.notes.length}/500
              </div>
            </div>
            <button
              style={{
                fontFamily: "Pangea, sans-serif",
              }}
              type="submit"
              className="block w-full bg-blue-400 text-white p-2 rounded col-span-2 hover:bg-[#7c8db9] border-2 border-[#d4d4d4]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
