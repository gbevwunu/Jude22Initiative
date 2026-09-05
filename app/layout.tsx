import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Inter, Sora } from "next/font/google";
import { ORG, SITE_URL } from "@/lib/constants";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["500", "600", "700"],
  variable: "--font-sora",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${ORG.name} | Mentorship, Character, and Purpose for Young Adults`,
    template: `%s | ${ORG.name}`,
  },
  description:
    "The Jude 22 Initiative changes the narrative young adults hear. We run discovery events in schools and universities and connect students with proven mentors.",
  applicationName: ORG.name,
  referrer: "strict-origin-when-cross-origin",
  authors: [{ name: ORG.name }],
  creator: ORG.name,
  publisher: ORG.name,
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: ORG.name,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b1f3a",
};

/**
 * Reading a request header opts every route into dynamic rendering, which is
 * what makes the per-request CSP nonce possible: Next only stamps a nonce
 * onto its script tags while rendering per request, so a statically
 * prerendered document would ship script tags the policy then blocks.
 *
 * The nonce itself is read and applied by Next, from the Content-Security-Policy
 * request header that middleware.ts sets. Reading it here is what forces the
 * dynamic path.
 */
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await headers();

  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navigation />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
