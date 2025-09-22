import "./globals.css";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu">
      <body className="bg-gray-900 text-gray-100">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
