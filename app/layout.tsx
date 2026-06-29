import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_NAME = "Bichae Today";
const SITE_DESCRIPTION =
  "A daily, independent deep dive into one exceptional K-beauty product — full ingredient analysis, verified global pricing, and community consensus.";

export const metadata: Metadata = {
  metadataBase: new URL("https://bichae.today"),
  title: {
    default: `${SITE_NAME} — Daily K-Beauty Science & Price Intelligence`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: [
    "K-beauty",
    "Korean skincare review",
    "Best K-beauty sunscreen 2026",
    "SKIN1004 Madagascar Centella sun serum",
    "Anua PDRN serum review",
    "Olive Young global shipping",
    "Stylevana vs YesStyle price comparison",
    "Amazon K-beauty deals",
    "Glass skin routine",
    "INCI ingredient analysis",
    "Bichae Today",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Daily K-Beauty Science & Price Intelligence`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Daily K-Beauty Science & Price Intelligence`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

// Applies the persisted theme before paint to avoid a flash of the wrong theme.
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable}`}>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
