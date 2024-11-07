import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Configure PublicSans-Regular as a local font
const publicSansRegular = localFont({
  src: "./fonts/PublicSans-Regular.ttf",
  variable: "--font-public-sans-regular",
  weight: "400", // Regular font weight
});

// Configure PublicSans-Bold as a local font
const publicSansBold = localFont({
  src: "./fonts/PublicSans-Bold.ttf",
  variable: "--font-public-sans-bold",
  weight: "700", // Bold font weight
});

// Configure PublicSans-VariableFont as a local font
const publicSansVariable = localFont({
  src: "./fonts/PublicSans-VariableFont_wght.ttf",
  variable: "--font-public-sans-variable",
  weight: "100 900", // Variable font weight range
});

const publicSansItalicVariable = localFont({
  src: "./fonts/PublicSans-Italic-VariableFont_wght.ttf",
  variable: "--font-public-sans-italic-variable",
  weight: "100 900",
  style: "italic",
});

export const metadata: Metadata = {
  title: "Personal Finance App",
  description: "For personal finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${publicSansRegular.variable} ${publicSansBold.variable} ${publicSansVariable.variable} ${publicSansItalicVariable.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
