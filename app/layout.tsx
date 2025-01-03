import type { Metadata } from "next";
import { Poppins } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";
import "./globals.css";

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "StreamApp",
  description: "Streaming App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
          <body className={`${poppins.variable} antialiased`}>
            <ThemeProvider attribute="class" forcedTheme="dark" storageKey="stream-app">
              <Toaster
                toastOptions={{ 
                  classNames: {
                    success: "bg-[#212126] border-bluePrimary text-bluePrimary",
                    error: "bg-[#212126] border-red-500 text-red-500"
                  }
               }}
                theme="light" 
                position="top-right"
              />
              {children}
            </ThemeProvider>
          </body>
      </html>
    </ClerkProvider>
  );
}
