import "./globals.css";
import Navbar from "@/components/Navbar";
import { AppProvider } from "../AppContext";

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
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
