import type { Metadata, Viewport } from "next";
import "./globals.css";
import { XPSystemProvider } from "@/components/effects/XPSystem";
import { CustomCursor } from "@/components/effects/CustomCursor";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "CHAOS.EXE v8.77 | Kandukuri Yaswanth Veer — UI/UX × AI Engineer",
  description: "A sentient operating system, academic crash report, and digital creative brain of Yaswanth Veer, shipping high-performance AI engines and beautiful interfaces from Bengaluru, India.",
  keywords: [
    "Kandukuri Yaswanth Veer",
    "Yaswanth Veer",
    "AI Engineer",
    "UI/UX Designer",
    "Next.js Developer",
    "Brutalist Portfolio",
    "Saveetha University",
    "Bengaluru Tech",
    "The Rythu",
    "Ziro AI",
    "SheCodes AI",
    "Breaking the Code"
  ],
  authors: [{ name: "Kandukuri Yaswanth Veer" }],
  openGraph: {
    title: "CHAOS.EXE v8.77 | Kandukuri Yaswanth Veer",
    description: "Sentient operating system portfolio rendering the creative brain of a UI/UX × AI Engineer.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "CHAOS.EXE v8.77 | Kandukuri Yaswanth Veer",
    description: "Sentient operating system portfolio of a UI/UX × AI Engineer.",
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E⚡%3C/text%3E%3C/svg%3E" />
      </head>
      <body className="antialiased select-none">
        <XPSystemProvider>
          <div className="noise-overlay" id="noise-overlay" />
          <div className="scanlines" id="scanlines" />
          {children}
          <CustomCursor />
        </XPSystemProvider>
      </body>
    </html>
  );
}
