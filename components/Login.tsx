"use client";

import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";
import logo from "../images/log-2.jpg";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

function Login() {
  //sign in with google
  return (
    <div className="bg-[#ecf7ff] h-screen flex flex-col items-center justify-center text-center space-y-10 ">
      <Image src={logo} width={500} height={500} alt="logo" />
      <div className="block">
        <div className="flex h-[60px] w-[500px] items-center cursor-pointer justify-center rounded-md border border-gray-300 bg-white">
          <FcGoogle fontSize={30} className="mr-3"></FcGoogle>
          <button
            type="button"
            onClick={() => signIn("google")}
            className="text-black font-bold animate-pulse"
          >
            Sign In with Google
          </button>
        </div>
        <div className="flex h-[60px] w-[500px] items-center cursor-pointer justify-center rounded-md border border-gray-300 bg-white">
          <AiFillGithub fontSize={30} className="mr-3"></AiFillGithub>
          <button
            type="button"
            onClick={() => signIn("github")}
            className="text-black font-bold animate-pulse"
          >
            Sign In with Github
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
