import "./globals.css";

export const metadata = {
  title: "GOBO",
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
      </body>
    </html>
  );
}