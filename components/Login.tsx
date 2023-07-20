"use client";

import { signIn, useSession } from "next-auth/react";

import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { FormEventHandler, useState } from "react";
import { ClipLoader } from "react-spinners";

interface UserInfo {
  email: string;
}

interface SignUpInfo extends UserInfo {
  username: string;
}

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);

  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
  });
  const [signUpInfo, setSignUpInfo] = useState<SignUpInfo>({
    username: "",
    email: "",
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  // const router = useRouter(); // Instantiate the router

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
        }),
      });

      const data = await response.json();

      //console.log("this data", data.chat.id);

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // If you reach this point, login was successful
      console.log("User successfully logged in");

      // Start session with NextAuth
      const result = await signIn("email", {
        email: userInfo.email,
        callbackUrl: `${window.location.origin}/Tryout/chat/${data.chat.id}`,
        redirect: false,
      });

      if (result && !result.error) {
        console.log("NextAuth session started successfully");
        alert("Please check your email to complete sign in");
        // Optionally, redirect user here using router.push
      } else {
        throw new Error(result?.error || "NextAuth signIn returned undefined");
      }
    } catch (error) {
      // Handle error here
      console.error("Login failed", error);
    }

    setIsLoggingIn(false);
  };

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
          username: signUpInfo.username,
          email: signUpInfo.email,
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
    <>
      <div className="bg-white min-h-screen flex flex-col items-center justify-center space-x-4">
        <div className="mb-5"></div>
        <div className="flex space-x-4">
          {isLogin ? (
            // This is the login form
            <div className="flex flex-col border-2 w-[400px] border-[#d4d4d4] bg-[#ecf7ff] rounded-lg text-center mb-[100px]">
              <h2 className="font-bold text-2xl mt-5">Login Form</h2>
              <form
                className="sign-in-form mb-5  text-center flex flex-col"
                onSubmit={handleLogin}
              >
                <input
                  className="h-[40px] w-[320px] border-gray-300 border-2"
                  value={userInfo.email}
                  type="email"
                  placeholder="Email"
                  onChange={({ target }) =>
                    setUserInfo({ ...userInfo, email: target.value })
                  }
                />
                {/*<input
                  className="h-[40px] w-[320px] border-gray-300 border-2"
                  value={userInfo.password}
                  type="password"
                  placeholder="Your password"
                  onChange={({ target }) =>
                    setUserInfo({ ...userInfo, password: target.value })
                  }
                /> */}

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="h-[40px] w-[100px] rounded-md  border-[#d4d4d4] border-2 mt-5 bg-white hover:bg-[#7c8db9] cursor-pointer"
                >
                  {isLoggingIn ? (
                    <ClipLoader color="#000" size={15} />
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
              <div className="flex flex-col items-center justify-center text-center mb-10">
                <div className="flex h-[60px] w-[320px] items-center cursor-pointer justify-center rounded-md border border-gray-300 bg-white mb-5">
                  <GoogleIcon
                    style={{ fontSize: "30px", marginRight: "3px" }}
                  />
                  <button
                    type="button"
                    onClick={() => signIn("google")}
                    className="text-black font-bold animate-pulse"
                  >
                    Sign In with Google
                  </button>
                </div>
                <div className="flex h-[60px] w-[320px] items-center cursor-pointer justify-center rounded-md border border-gray-300 bg-white">
                  <GitHubIcon
                    style={{ fontSize: "30px", marginRight: "3px" }}
                  />
                  <button
                    type="button"
                    onClick={() => signIn("github")}
                    className="text-black font-bold animate-pulse"
                  >
                    Sign In with Github
                  </button>
                </div>
                <div className="mt-5">
                  <p>
                    Don't have an account?{" "}
                    <a
                      className="font-bold hover:text-[#7c8db9]"
                      href="#"
                      onClick={() => setIsLogin(false)}
                    >
                      Sign up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // This is the sign up form
            <div className="flex flex-col border-2 w-[400px] border-[#d4d4d4] bg-[#ecf7ff] rounded-lg text-center mb-[100px]">
              <h2 className="font-bold text-2xl mt-5">Signup Form</h2>
              <form
                className="sign-up-form mb-5  text-center flex flex-col"
                onSubmit={handleSignUp}
              >
                <input
                  className="h-[40px] w-[320px]"
                  value={signUpInfo.username}
                  type="text"
                  placeholder="Username"
                  onChange={({ target }) =>
                    setSignUpInfo({ ...signUpInfo, username: target.value })
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
                <button
                  type="submit"
                  disabled={isSigningUp}
                  className="h-[40px] w-[100px] rounded-md border border-#d4d4d4 mt-5 bg-white hover:bg-[#7c8db9]"
                >
                  {isSigningUp ? (
                    <ClipLoader color="#000" size={15} />
                  ) : (
                    "Sign Up"
                  )}
                </button>
                <div className="mt-5">
                  <p>
                    Already have an account?{" "}
                    <a
                      className="font-bold hover:text-[#7c8db9]"
                      href="#"
                      onClick={() => setIsLogin(true)}
                    >
                      Login
                    </a>
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
