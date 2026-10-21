import type { Metadata } from 'next';
import './globals.css';
import { QuoteProvider } from '../context/QuoteContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://pstc-ecobin.com'),
  title: 'PSTC SARL | Prestation de Service Technique et Commerciale - BTP, Réseaux, Solaire & Négoce',
  description: 'Société multiservice de référence au Bénin : travaux BTP & génie civil, réseaux & télécoms, énergie solaire, sécurité, commerce général, fournitures tertiaires et gestion environnementale.',
  keywords: [
    'PSTC SARL',
    'Prestation de Service Technique et Commerciale',
    'BTP Bénin',
    'réseaux informatiques Cotonou',
    'énergie solaire Bénin',
    'commerce automobile Cotonou',
    'fournitures de bureau Bénin',
    'gestion environnementale Bénin',
    'Cotonou Bénin',
  ],
  authors: [{ name: 'PSTC SARL' }],
  openGraph: {
    title: 'PSTC SARL | Prestation de Service Technique et Commerciale',
    description: 'Partenaire multiservice de premier plan au Bénin : BTP, réseaux & télécoms, énergie solaire, négoce et fournitures.',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/hero-urban.jpg',
        width: 1200,
        height: 630,
        alt: 'PSTC SARL - Prestation de Service Technique et Commerciale Cotonou Bénin',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/images/logo-ecobin.png" />
      </head>
      <body>
        <QuoteProvider>{children}</QuoteProvider>
      </body>
    </html>
  );
}
