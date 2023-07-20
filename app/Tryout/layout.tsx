import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { SessionProvider } from "../../components/SessionProvider";
import Login from "../../components/Login";
import ClientProvider from "../../components/ClientProvider";
import SideBar from "@/components/SideBar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <SessionProvider session={session}>
        {!session ? (
          <>
            <Login />
          </>
        ) : (
          <div className="flex bg-[#ecf7ff] h-screen ">
            <div className="flex  bg-[#ecf7ff] w-full">
              <div className="flex-col ml-4 sm:ml-6 md:ml-8 lg:ml-12 xl:ml-20 mb-20 max-w-xs md:min-w-[20rem]">
                <SideBar />
              </div>
              <div className="flex-grow mr-20">
                <ClientProvider />
                {children}
              </div>
            </div>
          </div>
        )}
      </SessionProvider>
    </>
  );
}
