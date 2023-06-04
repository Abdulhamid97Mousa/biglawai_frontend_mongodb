// These styles apply to every route in the application
import "../../styles/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { SessionProvider } from "../../components/SessionProvider";
import SideBar from "../../components/SideBar";
import Login from "../../components/Login";
import ClientProvider from "../../components/ClientProvider";

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
          <div>
            <Login />
          </div>
        ) : (
          <div className="flex-col bg-[#ecf7ff] h-screen ">
            <div className="flex bg-[#ecf7ff]  ">
              <div className=" ml-[110px] mb-20  max-w-xs md:min-w-[20rem]">
                <SideBar />
              </div>
              <ClientProvider />
              <div className="bg-[#ecf7ff] flex-1 mr-20">{children}</div>
            </div>
          </div>
        )}
      </SessionProvider>
    </>
  );
}
