import type { Metadata } from "next";;
import "./globals.css";
import Provider from "@/provider/Provider";

export const metadata: Metadata = {
  title: "High Times Barcelona",
  description: "The best available ganja club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        <Provider>
          
        {children}
        </Provider>
      </body>
    </html>
  );
}
