import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-900 suppressHydrationWarning">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
