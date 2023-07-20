// These styles apply to every route in the application
import "../styles/globals.css";
import NavbarLogin from "../components/NavbarLogin";
import Footer from "../components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html>
        <body>
          {<NavbarLogin />}
          {children}
          {<Footer />}
        </body>
      </html>
    </>
  );
}
