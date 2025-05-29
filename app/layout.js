import "./globals.css";
import Provider from "./provider";
import ConvexClientProvider from "./ConvexClientProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>BOLT.NEW</title>
        <link rel="icon" href="/thunder.png" type="image/png" />
      </head>
      <body>
        <ConvexClientProvider>
        <Provider>
        {children}
        </Provider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
