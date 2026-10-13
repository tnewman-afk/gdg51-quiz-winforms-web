import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GDG51 Quiz Application (WinForms Web Edition)',
  description: 'Browser Web edition of GDG51-71605-4117 WinForms quiz application',
  icons: {
    icon: '/images/car.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
