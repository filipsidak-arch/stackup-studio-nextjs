import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Stackup Studio – Weby, které fungují",
  description: "Profesionální webové stránky pro podnikatele a lokální firmy. Bez agentury, rychle a za férovou cenu.",
  metadataBase: new URL("https://stackupstudio.cz"),
  openGraph: {
    title: "Stackup Studio – Weby, které fungují",
    description: "Profesionální webové stránky pro podnikatele a lokální firmy. Bez agentury, rychle a za férovou cenu.",
    url: "https://stackupstudio.cz",
    siteName: "Stackup Studio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stackup Studio – Weby, které fungují",
      },
    ],
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stackup Studio – Weby, které fungují",
    description: "Profesionální webové stránky pro podnikatele a lokální firmy. Bez agentury, rychle a za férovou cenu.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
