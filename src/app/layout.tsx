import type { Metadata } from 'next';
import './globals.css';
import ThemeRegistry from './ThemeRegistry';

export const metadata: Metadata = {
  title: 'Regulatory & Compliance Task Portal',
  description: 'compliance form and over project',
  keywords: 'compliance form ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
