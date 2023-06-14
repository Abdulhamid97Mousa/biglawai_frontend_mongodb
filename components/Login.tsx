"use client";

import { signIn, useSession } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { FormEventHandler, useState } from "react";
import { ClipLoader } from "react-spinners";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../utils/firebase";

interface UserInfo {
  email: string;
  password: string;
}

interface SignUpInfo extends UserInfo {
  confirmPassword: string;
}

const Login: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    password: "",
  });
  const [signUpInfo, setSignUpInfo] = useState<SignUpInfo>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setIsLoggingIn(true);

    const auth = getAuth();

    try {
      // Sign in with Firebase first
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      );

      // After successfully signing in with Firebase, sign in with NextAuth
      if (userCredential.user) {
        signIn("credentials", {
          // This will vary depending on your NextAuth credentials provider setup
          email: userCredential.user.email,
          password: userInfo.password,
          redirect: true,
        });

        // Alert that login was successful
        alert("you're logged in successfully, please wait!");

        // Create a new Firestore document
        await addDoc(
          collection(db, "users", userCredential.user.email!, "chats"),
          {
            userId: userCredential.user.email!,
            createdAt: serverTimestamp(),
          }
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error logging in: Wrong password");
        alert("Failed to log in: Wrong password");
      }
    }

    setIsLoggingIn(false);
  };

  const handleSignUp: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setIsSigningUp(true);

    const auth = getAuth();
    const db = getFirestore();

    try {
      // Make sure passwords match
      if (signUpInfo.password !== signUpInfo.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Sign up with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signUpInfo.email,
        signUpInfo.password
      );

      if (userCredential.user) {
        // Hash the password - consider a higher number in production
        // const hashedPassword = await bcrypt.hash(signUpInfo.password, 10);
        // Here we create the user document in Firestore. We're only storing the email for now.
        await setDoc(doc(db, "users", userCredential.user.email!), {
          email: signUpInfo.email,
          password: signUpInfo.password,
        });
        alert("Signed up successfully!");
      } else {
        throw new Error("No user credential returned from Firebase");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error signing up:", error.message);
        alert("Failed to sign up: " + error.message);
      }
    }

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
              placeholder="Confirm Password"
              value={signUpInfo.confirmPassword}
              onChange={({ target }) =>
                setSignUpInfo({ ...signUpInfo, confirmPassword: target.value })
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
        </div>
      </div>
    </div>
  );
};

export default Login;
