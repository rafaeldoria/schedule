import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { Header } from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-900" suppressHydrationWarning>
        <AuthProvider>
          {/* <Header /> */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
