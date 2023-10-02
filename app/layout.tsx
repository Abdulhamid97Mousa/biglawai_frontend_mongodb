// These styles apply to every route in the application
import "../styles/globals.css";
import NavbarLogin from "../components/NavbarLogin";
import Footer from "../components/Footer";
import ClientProvider from "@/components/ClientProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html>
        <body>
          <NavbarLogin />
          <ClientProvider />
          {children}
          <Footer />
        </body>
      </html>
    </>
  );
}
