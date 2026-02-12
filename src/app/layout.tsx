import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: "GOBO",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon2.png" />
        <link rel="shortcut icon" href="/favicon2.png" />
        <link rel="apple-touch-icon" href="/favicon2.png" />
      </head>
      <body>
        <div className="site-background">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}