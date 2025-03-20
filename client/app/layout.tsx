import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Content Moderator",
  description: "This is a Content Moderator, this mark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-primary-950">{children}</body>
    </html>
  );
}
