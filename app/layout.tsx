// These styles apply to every route in the application
import "../styles/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import NavbarLogin from "../components/NavbarLogin";
import Footer from "../components/Footer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <NavbarLogin />
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
