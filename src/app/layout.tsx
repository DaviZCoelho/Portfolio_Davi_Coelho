import type { Metadata } from "next";
import { Caveat, Indie_Flower, Shadows_Into_Light } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const indieFlower = Indie_Flower({
  variable: "--font-indie",
  subsets: ["latin"],
  weight: "400",
});

const shadowsIntoLight = Shadows_Into_Light({
  variable: "--font-shadows",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Davi - Desenvolvedor Full Stack",
  description: "Portfólio de Davi - Desenvolvedor Full Stack",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${caveat.variable} ${indieFlower.variable} ${shadowsIntoLight.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
