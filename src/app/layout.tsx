import type { Metadata } from "next";
import SiteShell from "src/components/SiteShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Victor Huang",
  icons: { icon: "/icons/icon4.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-gray-950">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
