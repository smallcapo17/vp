import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main className="pt-20">{children}</main>
        <section id="contact">
          <Footer />
        </section>
      </body>
    </html>
  );
}