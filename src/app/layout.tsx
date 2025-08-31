import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {

  title: "UFRB NUBEEP",
  description: "Núcleo Baiano de Estudantes de Engenharia de Produção - UFRB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
