import "./globals.css";
import Provider from "./provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>BOLT.NEW</title>
        <link rel="icon" href="/thunder.png" type="image/png" />
      </head>
      <body>
        <Provider>
        {children}
        </Provider>
      </body>
    </html>
  );
}
