import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { SessionProvider } from "../../components/SessionProvider";
import Login from "../../components/Login";

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
          <div className="flex flex-row h-screen">
            <div className="flex flex-col h-full flex-grow ">{children}</div>
          </div>
        )}
      </SessionProvider>
    </>
  );
}
