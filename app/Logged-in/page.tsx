"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const FirstPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.includes("Logged-in")) {
      router.push("/Logged-in/Dashboard");
    }
  }, [router]);

  return <>Loading ...</>;
};

export default FirstPage;
