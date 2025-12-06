import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ApiProvider } from '@/context/ApiContext';

export const metadata: Metadata = {
  title: 'Astor Cumple 1 !',
  description: 'Te esperamos para compartir un día extraordinario , no faltes!',
  openGraph: {
    title: 'Astor Cumple 1 !',
    description: 'Te esperamos para compartir un día extraordinario , no faltes!',
    images: [
      {
        url: '/metadata.jpeg',
        width: 1200,
        height: 630,
        alt: 'Invitación al cumpleaños de Astor',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageUrl = process.env.NEXT_PUBLIC_API_URL
    ? `https://${process.env.NEXT_PUBLIC_API_URL.split('/api')[0]}`
    : '';

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <meta property="og:title" content="Astor Cumple 1 !" />
        <meta
          property="og:description"
          content="Te esperamos para compartir un día extraordinario , no faltes!"
        />
        <meta property="og:image" content={`${pageUrl}/metadata.jpeg`} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
      </head>
      <body className="font-body antialiased">
        <ApiProvider>
          {children}
          <Toaster />
        </ApiProvider>
      </body>
    </html>
  );
}