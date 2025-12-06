import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ApiProvider } from '@/context/ApiContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://astor.up.railway.app'),
  title: 'Astor Cumple 1 !',
  description: 'Te esperamos para compartir un día extraordinario , no faltes!',
  openGraph: {
    title: 'Astor Cumple 1 !',
    description: 'Te esperamos para compartir un día extraordinario , no faltes!',
    url: '/',
    images: [
      {
        url: '/metadata.jpeg', // relativo a metadataBase
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
  return (
    <html lang="es">
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
        {/* No hace falta repetir og: acá, Next ya los genera desde `metadata` */}
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
