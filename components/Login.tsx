"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation"; // <- adjusted the import here

const Login: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/sign-in");
  }, [router]);

  return null;
};

export default Login;
