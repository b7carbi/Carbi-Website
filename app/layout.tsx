import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "Carbi | First Car for Young Drivers - Low Insurance Group Cars",
  description: "Stop the overwhelming car search. We find low insurance group first cars for young drivers and connect you with trusted dealers.",
  openGraph: {
    title: "Carbi - Find Your First Car Without the Hassle",
    description: "Stop the overwhelming car search. We find low insurance group first cars for young drivers and connect you with trusted dealers.",
    type: "website",
    url: "https://carbi.co/",
    images: [{ url: "https://carbi.co/images/carbi-social-share.jpg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.variable} font-sans antialiased text-text-primary bg-background`}>
        {children}
      </body>
    </html>
  );
}
