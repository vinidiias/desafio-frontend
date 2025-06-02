import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import { Toolbar } from "@mui/material";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <Navbar />
          <Toolbar />
          <main className="flex flex-col h-screen">{children}</main>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
