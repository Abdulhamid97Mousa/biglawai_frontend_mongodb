"use client";

import React, { useState, FormEventHandler } from "react";
import { ClipLoader } from "react-spinners";
import "@/styles/sign-in.css"; // Assuming both have the same styles
import Company_logo from "/public/Images/logo-c2-2.png";
import hero from "/public/Images/sign-in-hero.png"; // Reusing the same hero image
import Image from "next/image";

interface SignUpInfo {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [signUpInfo, setSignUpInfo] = useState<SignUpInfo>({
    name: "",
    email: "",
    password: "",
  });

  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSignUp: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setIsSigningUp(true);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: signUpInfo.name,
          email: signUpInfo.email,
          password: signUpInfo.password,
        }),
      });

      if (response.ok) {
        console.log(response);
        alert("Sign up successful, please click on the Login button");
        // Handle successful signup here, like redirecting to a different page
      } else {
        // Handle error here
        throw new Error("Sign up failed");
      }
    } catch (error) {
      console.error(error);
    }

    setIsSigningUp(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="flex bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <div className="w-1/2 pr-8 mt-[100px] px-10 mr-5">
          <Image src={hero} alt="Sign Up Hero" priority={true} />
        </div>

        <div className="w-1/2">
          <Image
            src={Company_logo}
            alt="Company Logo"
            priority={true}
            className="mb-6"
            style={{
              filter: "invert(1) sepia(1) saturate(5) hue-rotate(200deg)",
            }}
          />
          <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
          <p className="mb-4">Create an account to use the ChatBot</p>

          <form onSubmit={handleSignUp}>
            <label className="block mb-2 text-sm font-medium">Your Name</label>
            <input
              type="text"
              placeholder="Name"
              className="mb-4 p-2 w-full border rounded-md"
              value={signUpInfo.name}
              onChange={({ target }) =>
                setSignUpInfo({ ...signUpInfo, name: target.value })
              }
            />

            <label className="block mb-2 text-sm font-medium">Your Email</label>
            <input
              type="email"
              placeholder="Email"
              className="mb-4 p-2 w-full border rounded-md"
              value={signUpInfo.email}
              onChange={({ target }) =>
                setSignUpInfo({ ...signUpInfo, email: target.value })
              }
            />

            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="mb-4 p-2 w-full border rounded-md"
              value={signUpInfo.password}
              onChange={({ target }) =>
                setSignUpInfo({ ...signUpInfo, password: target.value })
              }
            />

            <button
              type="submit"
              disabled={isSigningUp}
              className="bg-blue-500 text-white p-2 rounded-md w-full mb-4"
            >
              {isSigningUp ? <ClipLoader color="#000" size={15} /> : "Sign Up"}
            </button>

            <p className="text-sm mb-4">
              Already have an account?{" "}
              <a href="/sign-in" className="text-blue-500 hover:underline">
                Login here!
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
