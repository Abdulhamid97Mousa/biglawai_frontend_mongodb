"use client";

import React, { useState, FormEventHandler } from "react";
import { signIn, useSession } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import "@/styles/sign-in.css";
import Company_logo from "/public/Images/logo-c2-2.png";
import hero from "/public/Images/sign-in-hero.png";
import Image from "next/image";

interface UserInfo {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    password: "",
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setIsLoggingIn(true);

    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userInfo.email,
          password: userInfo.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      const result = await signIn("credentials", {
        email: userInfo.email,
        password: userInfo.password,
        callbackUrl: `${window.location.origin}/Logged-in/Dashboard`,
        redirect: false,
      });

      if (result && !result.error) {
        console.log(result?.url!, "this is sign-in");
        router.push(result?.url!);
      } else {
        throw new Error(result?.error || "NextAuth signIn returned undefined");
      }
    } catch (error) {
      console.error("Login failed", error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred");
      }
    }

    setIsLoggingIn(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="flex bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <div className="w-1/2 pr-8 mt-[100px] px-10 mr-5">
          <Image src={hero} alt="Sign In Hero" priority={true} />
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

          <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
          <p className="mb-4">Sign In to use the ChatBot</p>

          <form onSubmit={handleLogin}>
            <label className="block mb-2 text-sm font-medium">Your Email</label>
            <input
              type="email"
              placeholder="Email"
              className="mb-4 p-2 w-full border rounded-md"
              value={userInfo.email}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, email: target.value })
              }
            />

            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="mb-4 p-2 w-full border rounded-md"
              value={userInfo.password}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, password: target.value })
              }
            />

            <a href="#" className="text-blue-500 hover:underline mb-4 block">
              Recover Password?
            </a>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="bg-blue-500 text-white p-2 rounded-md w-full mb-4"
            >
              {isLoggingIn ? <ClipLoader color="#000" size={15} /> : "Login"}
            </button>

            <p className="text-sm mb-4">
              If you don’t have an account, you can{" "}
              <a href="/sign-up" className="text-blue-500 hover:underline">
                Register here!
              </a>
            </p>
          </form>

          <div className="flex justify-between items-center">
            <span className="border-b w-1/4"></span>
            <span className="text-sm text-gray-500">Or continue with</span>
            <span className="border-b w-1/4"></span>
          </div>

          <div className="flex space-x-4 mt-4">
            <button
              type="button"
              onClick={() => signIn("google")}
              className="bg-gray-800 text-white p-2 gap-1 rounded-md w-full flex items-center justify-center space-x-2"
            >
              <GoogleIcon style={{ fontSize: "20px" }} />
              Google
            </button>

            <button
              type="button"
              onClick={() => signIn("github")}
              className="bg-gray-500 text-white p-2 gap-1 rounded-md w-full flex items-center justify-center space-x-2"
            >
              <GitHubIcon style={{ fontSize: "20px" }} />
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
