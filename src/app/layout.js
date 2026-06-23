import dns from "node:dns"
dns.setServers(['1.1.1.1', '1.0.0.1']);

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";



export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning
        className="bg-slate-900 text-slate-50 antialiased">
        <Navbar />
        <main className=" px-2 min-h-screen">
          {children}
        </main>

        <Footer/>
      </body>
    </html>
  );
}