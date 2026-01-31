import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DigiMed | Intelligent Medical Report Analysis",
  description: "Next-generation OCR and entity extraction for medical professionals.",
};

import AuthGuard from "@/components/AuthGuard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (theme === 'dark' || (!theme && supportDarkMode)) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <AuthGuard>
          {children}
        </AuthGuard>
      </body>
    </html>
  );
}
