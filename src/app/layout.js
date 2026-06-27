import dns from "node:dns";
dns.setServers(["1.1.1.1", "1.0.0.1"]);

import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="bg-slate-900 text-slate-50 antialiased"
      >
        <Navbar />

        <main className="min-h-screen px-2">
          {children}
        </main>

        <Footer />

        {/* Toast Container */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#0b0e17",
              color: "#fff",
              border: "1px solid #ec4899",
              borderRadius: "12px",
            },
            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}