import { Dashboard } from "@/components/dashboard/layout";
import "./globals.css";



export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        <Dashboard>
          {children}
        </Dashboard>
      </body>
    </html>
  );
}
