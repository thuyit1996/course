import { Inter } from "next/font/google";
import "./globals.css";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/autoplay";
// import { ThemeProvider } from "@/context/ThemeContext";
// import { SidebarProvider } from "@/context/SidebarContext";
import QueryProvider from "@/providers/QueryProvider";
import NextTopLoader from 'nextjs-toploader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AosProvider from "@/providers/AOSProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} dark:bg-gray-900`}>
        <AosProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </AosProvider>
        <NextTopLoader
          color="#605bff"
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
        <ToastContainer position="top-center" />
      </body>
    </html>
  );
}
