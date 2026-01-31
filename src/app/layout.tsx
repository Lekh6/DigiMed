import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DigiMed | Intelligent Medical Report Analysis",
  description: "Next-generation OCR and entity extraction for medical professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
