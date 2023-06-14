"use client";

import { signIn} from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { FormEventHandler, useState } from "react";
import { ClipLoader } from "react-spinners";

function Login() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    password: "",
    fullName: "",
    repassword: "",
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: true,
    });

    setIsLoggingIn(false);
  };

  const handleSignUp: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setIsSigningUp(true);

    // Perform sign up logic here
    console.log(signUpInfo);

    setIsSigningUp(false);
  };


  return (
    <div className="bg-[#ecf7ff] min-h-screen flex flex-col items-center justify-center space-x-4">
      <div className="mb-5"></div>
      <div className="flex space-x-4">
        <div className="flex flex-col border-2 w-[400px] border-[#d4d4d4] bg-white rounded-lg text-center ">
          <h2 className="font-bold text-2xl mt-2">Log In</h2>
          <form
            className="sign-in-form mb-5 mt-5 text-center flex flex-col"
            onSubmit={handleLogin}
          >
            <input
              className="h-[40px] w-[320px]"
              value={userInfo.email}
              type="email"
              placeholder="Email"
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, email: target.value })
              }
            />
            <input
              className="h-[40px] w-[320px]"
              type="password"
              placeholder="********"
              value={userInfo.password}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, password: target.value })
              }
            />

            <button
              type="submit"
              disabled={isLoggingIn}
              className="h-[40px] w-[100px] rounded-md border border-black mt-3"
            >
              {isLoggingIn ? <ClipLoader color="#000" size={15} /> : "Login"}
            </button>
          </form>
          <div className="flex flex-col items-center justify-center text-center mb-10">
            <div className="flex h-[60px] w-[320px] items-center cursor-pointer justify-center rounded-md border border-gray-300 bg-white">
              <FcGoogle fontSize={30} className="mr-3"></FcGoogle>
              <button
                type="button"
                onClick={() => signIn("google")}
                className="text-black font-bold animate-pulse"
              >
                Sign In with Google
              </button>
            </div>
            <div className="flex h-[60px] w-[320px] items-center cursor-pointer justify-center rounded-md border border-gray-300 bg-white">
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

        <div className="flex flex-col border-2 w-[400px] border-[#d4d4d4] bg-white rounded-lg text-center ">
          <h2 className="font-bold text-2xl mt-2">Sign Up</h2>
          <form
            className="sign-up-form mb-5 mt-5 text-center flex flex-col"
            onSubmit={handleSignUp}
          >
            <input
              className="h-[40px] w-[320px]"
              value={signUpInfo.fullName}
              type="text"
              placeholder="Full Name"
              onChange={({ target }) =>
                setSignUpInfo({ ...signUpInfo, fullName: target.value })
              }
            />
            <input
              className="h-[40px] w-[320px]"
              value={signUpInfo.email}
              type="email"
              placeholder="Email"
              onChange={({ target }) =>
                setSignUpInfo({ ...signUpInfo, email: target.value })
              }
            />
            <input
              className="h-[40px] w-[320px]"
              type="password"
              placeholder="Password"
              value={signUpInfo.password}
              onChange={({ target }) =>
                setSignUpInfo({ ...signUpInfo, password: target.value })
              }
            />
            <input
              className="h-[40px] w-[320px]"
              type="password"
              placeholder="Re-Enter Password"
              value={signUpInfo.repassword}
              onChange={({ target }) =>
                setSignUpInfo({ ...signUpInfo, repassword: target.value })
              }
            />
            <button
              type="submit"
              disabled={isSigningUp}
              className="h-[40px] w-[100px] rounded-md border border-black mt-3"
            >
              {isSigningUp ? <ClipLoader color="#000" size={15} /> : "Sign Up"}
            </button>
          </form>
          <div className="flex flex-col items-center justify-center text-center mb-10">
            <div className="flex h-[60px] w-[320px] items-center cursor-pointer justify-center rounded-md border border-gray-300 bg-white">
              <FcGoogle fontSize={30} className="mr-3"></FcGoogle>
              <button
                type="button"
                onClick={() => signIn("google")}
                className="text-black font-bold animate-pulse"
              >
                Sign Up with Google
              </button>
            </div>
            <div className="flex h-[60px] w-[320px] items-center cursor-pointer justify-center rounded-md border border-gray-300 bg-white">
              <AiFillGithub fontSize={30} className="mr-3"></AiFillGithub>
              <button
                type="button"
                onClick={() => signIn("github")}
                className="text-black font-bold animate-pulse"
              >
                Sign Up with Github
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
