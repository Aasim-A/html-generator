import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'HTML Generator',
  description:
    "A web app that let's you make tabs and set their content, then convert them to html to be added to LATROBE Moodle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <Header />
        <hr />
        <Navbar />
        <div className='flex-1 bg-white py-8 text-gray-900 dark:bg-gray-700 dark:text-gray-100'>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
