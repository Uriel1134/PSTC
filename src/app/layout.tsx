import type { Metadata } from 'next';
import './globals.css';
import { QuoteProvider } from '../context/QuoteContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://pstc-ecobin.com'),
  title: 'PSTC ECOBIN | Matériels de Salubrité, Bacs Roulants, Tri Sélectif & EPI - PSTC SARL',
  description: 'Fournisseur agréé de conteneurs de voirie, bacs roulants 120L à 1100L certifiés EN 840, poubelles médicales DASRI et équipements de protection individuelle au Bénin et en Afrique de l’Ouest.',
  keywords: [
    'PSTC ECOBIN',
    'PSTC SARL',
    'bacs roulants Bénin',
    'poubelle 240L Cotonou',
    'conteneur 660L 1100L',
    'tri sélectif Afrique de l’Ouest',
    'poubelle médicale DASRI',
    'équipements de protection individuelle EPI',
    'salubrité publique Bénin',
    'gestion des déchets Cotonou',
  ],
  authors: [{ name: 'PSTC SARL' }],
  openGraph: {
    title: 'PSTC ECOBIN | Solutions Professionnelles de Salubrité & Équipements de Sécurité',
    description: 'Bacs roulants en PEHD vierge anti-UV, conteneurs 4 roues normalisés EN 840, bornes de tri sélectif et EPI au Bénin.',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/hero-urban.jpg',
        width: 1200,
        height: 630,
        alt: 'PSTC ECOBIN - Salubrité et Tri Sélectif Bénin',
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
