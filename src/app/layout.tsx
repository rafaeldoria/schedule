import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { Header } from "@/components/header";
import { ScheduleModalProvider } from "@/providers/scheduleModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-900" suppressHydrationWarning>
        <AuthProvider>
          <ScheduleModalProvider>
            {/* <Header /> */}
            {children}
          </ScheduleModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
