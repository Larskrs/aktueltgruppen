
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { io } from "socket.io-client";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    absolute: "Aktuelt Studio"
  },
  description: "Ditt digitale hjemmested for film og medie produksjon. ",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {/* Layout UI */}
        <main>{children}</main>
      </body>
    </html>
  )
}