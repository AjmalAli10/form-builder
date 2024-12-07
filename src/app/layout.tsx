import "./globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-600">
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              maxWidth: '500px',
              margin: '0 auto 20px auto',
            },
          }}
        />
      </body>
    </html>
  );
}
