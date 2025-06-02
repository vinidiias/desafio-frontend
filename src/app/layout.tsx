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
          <main className="flex justify-center h-[calc(100%-64px)]">{children}</main>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
