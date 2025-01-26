import type { Metadata } from 'next';
import { ReactNode } from 'react';
import '../ui/globals.css';

export const metadata: Metadata = {
  title: {
	  template: '%s | Quantum Care',
    default: 'Quantum Care'
  },
  description: 'a healthcare appointment management system built with next.js and spring boot.',
	icons: { icon: '/stethoscope.png' }
};

export default function RootLayout({ children }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}