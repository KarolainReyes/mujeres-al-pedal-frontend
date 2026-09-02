import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mujeres al Pedal | VI Travesía 2026",
  description: "Comunidad de ciclismo femenino. Conoce la VI Travesía Mujeres al Pedal, elige tu ruta y descubre la merch oficial.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
