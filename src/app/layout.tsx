import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SessionContext } from "@/components/Session";
import { ThemeProvider } from "@/components/ui/themeProvider";
import { Footer } from "@/components/Footer";

const fontSans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});
const fontHeading = localFont({
  src: "../../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "CraftyKit",
  description:
    "Community-Crafted Component Hub: Your Creative Toolbox for Web Wizards and App Alchemists",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html className="scroll-smooth" suppressHydrationWarning lang="en">
      <body
        className={cn(
          " bg-background font-sans relative antialiased min-h-[100dvh] ",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SessionContext session={session}>
            {children}

            <Toaster />
          </SessionContext>
        </ThemeProvider>
      </body>
    </html>
  );
}
