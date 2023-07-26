"use client";

import React from "react";
import Link from "next/link";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { Refresh } from "@material-ui/icons";

const Pricing = () => {
  const allBenefits = [
    "Offer templates to automate full agreement draft",
    "Generate full agreement draft via interactions",
    "Access to online text editor",
    "Contract review and analysis",
    "Legal search and compliance",
    "Adopting GPT-4",
  ];

  const pricingOptions = [
    {
      plan: "Free",
      price: "0$",
      buttonLabel: "Get Started",
      buttonLink: "/register",
      benefits: [
        "Unlimited Interactions with BIGLAW-AI Chatbot",
        "Drafting and summarizing legal documents",
        "Translation of legal documents",
        "Adopting GPT-3.5",
      ],
      notIncluded: [
        "Legal search and compliance",
        "Access to online text editor",
        "Adopting GPT-4",
        "Generate full agreement draft via interactions",
        "Offer templates to automate full agreement draft",
        "Contract review and analysis",
      ],
    },
    {
      plan: "Basic Plan",
      price: "50$/month",
      buttonLabel: "Purchase",
      buttonLink: "/purchase/basic",
      benefits: [
        "Unlimited Interactions with BIGLAW-AI Chatbot",
        "Generate full agreement draft via interactions",
        "Drafting and summarizing legal documents",
        "Translation of legal documents",
        "Legal search and compliance",
        "Access to online text editor",
        "Contract review and analysis",
        "Adopting GPT-4",
      ],
      notIncluded: ["Offer templates to automate full agreement draft"],
    },
    {
      plan: "Premium Plan",
      price: "100$/month",
      buttonLabel: "Contact Us",
      buttonLink: "/contact",
      benefits: [
        "Unlimited Interactions with BIGLAW-AI Chatbot",
        "Generate full agreement draft via interactions",
        "Offer templates to automate full agreement draft",
        "Drafting and summarizing legal documents",
        "Contract review and analysis",
        "Translation of legal documents",
        "Legal search and compliance",
        "Access to online text editor",
        "Adopting GPT-4",
      ],
    },
  ];

  pricingOptions.forEach((option) => {
    option.notIncluded = allBenefits.filter(
      (benefit) => !option.benefits.includes(benefit)
    );
  });

  return (
    <>
      <div className="px-4 py-5 my-5">
        <h1 className="text-4xl font-semibold text-gray-700 mt-10 mb-10 text-center">
          Our Pricing
        </h1>
        <div className="grid grid-cols-3 gap-10 ml-[100px] mr-[100px] mb-[100px] ">
          {pricingOptions.map((option, index) => (
            <div
              key={index}
              className="flex flex-col justify-between border border-gray-200 p-5 rounded-lg shadow-lg h-full cursor-pointer transform transition-transform duration-500 hover:scale-105"
            >
              <div>
                <h2 className="text-3xl font-semibold mb-5 text-center">
                  {option.plan}
                </h2>
                <p className="text-2xl mb-10 text-center">{option.price}</p>
                <ul className="text-xl">
                  {option.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center mb-2"
                    >
                      {benefit}
                      <CheckBoxIcon
                        style={{ color: "green", marginLeft: "2px" }}
                      />
                    </li>
                  ))}
                  {option.notIncluded!.map((notBenefit, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center mb-2"
                    >
                      {notBenefit}
                      <DisabledByDefaultIcon
                        style={{ color: "red", marginLeft: "2px" }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 text-center">
                <Link href={option.buttonLink} legacyBehavior>
                  <a className="bg-blue-500 text-white py-2 px-4 rounded mb-5 inline-block">
                    {option.buttonLabel}
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Pricing;
