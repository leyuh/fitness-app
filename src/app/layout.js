import "./globals.css";
import Navbar from "@/components/Navbar";
import { AppProvider } from "../AppContext";
import { Suspense } from "react";

export const metadata = {
  title: "Fitness App",
  description: "Awesome Fitness App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Navbar />
          <Suspense fallback={<div>Loading</div>}>
            {children}
          </Suspense>
        </AppProvider>
      </body>
    </html>
  );
}
