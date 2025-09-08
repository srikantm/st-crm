import '@/app/ui/global.css'
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { SpeedInsights } from "@vercel/speed-insights/next"
import React from 'react';
import { AppProvider } from './context/AppContext';


export const metadata: Metadata = {
  title: {
    template: '%s | EngageCore CRM',
    default: 'EngageCore CRM',
  },
  description: 'CRM to create and manage leads, quotations, invoices & payments ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <React.StrictMode>
          {/* <AppProvider> */}
            {children}
          {/* </AppProvider> */}
          <SpeedInsights />
        </React.StrictMode>
      </body>
    </html>
  );
}
