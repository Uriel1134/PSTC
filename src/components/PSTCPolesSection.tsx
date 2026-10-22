'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface PoleItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  image: string;
  accentColor: string;
  overview: string;
  domains: string[];
}

const POLES: PoleItem[] = [
  {
    id: 'prestations-techniques',
    number: '01',
    title: 'Prestations Techniques',
    shortTitle: 'Technique & BTP',
    tagline: 'BTP, génie civil, infrastructures réseaux, énergie solaire & sécurité électronique',
    image: '/images/btp-travaux.png',
    accentColor: '#004B93',
    overview:
      'Bureau d’études, conduite de chantiers de génie civil, installations électriques, réseaux informatiques et maintenance multitechnique certifiée pour vos infrastructures au Bénin.',
    domains: [
      'Bâtiment & Génie Civil',
      'Réseaux & Télécoms',
      'Énergie Solaire & Froid',
      'Vidéosurveillance & Sécurité',
      'Maintenance Technique',
      'Signalétique & Impression',
    ],
  },
  {
    id: 'solutions-commerciales',
    number: '02',
    title: 'Solutions Commerciales',
    shortTitle: 'Commerce & Négoce',
    tagline: 'Commerce automobile, négoce général et denrées agroalimentaires certifiées',
    image: '/images/commerce-general-logistique.jpg',
    accentColor: '#16A34A',
    overview:
      'Approvisionnement direct des entreprises et institutions en flottes automobiles, véhicules neufs et utilitaires, denrées vivrières et négoce général.',
    domains: [
      'Commerce Automobile & Flottes',
      'Négoce Général & Distribution',
      'Produits Agroalimentaires',
      'Sourcing & Logistique UEMOA',
    ],
  },
  {
    id: 'fournitures-consommables',
    number: '03',
    title: 'Fournitures & Consommables',
    shortTitle: 'Fournitures B2B',
    tagline: 'Bureautique, informatique, mobilier tertiaire, matériel médical & énergie',
    image: '/images/fournitures-consommables-bg.png',
    accentColor: '#D97706',
    overview:
      'Partenaire unique pour la dotation intégrale de vos bureaux, administrations et centres hospitaliers avec bordereaux de prix unitaires transparents et livraison sécurisée.',
    domains: [
      'Fournitures & Papeterie',
      'Parc Informatique & Toners',
      'Mobilier de Bureau Ergonomique',
      'Équipements Médicaux & DASRI',
      'Groupes Électrogènes & Onduleurs',
    ],
  },
  {
    id: 'gestion-environnementale',
    number: '04',
    title: 'Gestion Environnementale',
    shortTitle: 'Environnement & Salubrité',
    tagline: 'Salubrité publique, entretien des espaces verts, conteneurs certifiés EN 840 et EPI',
    image: '/images/hero-urban.jpg',
    accentColor: '#059669',
    overview:
      'Prestations intégrées de salubrité urbaine et tertiaire, entretien paysager, conteneurs 2 et 4 roues normalisés EN 840, tri sélectif et équipements de protection individuelle.',
    domains: [
      'Salubrité & Hygiène des Sites',
      'Aménagement & Espaces Verts',
      'Bacs Roulants Norme EN 840',
      'Tri Sélectif RSE',
      'Équipements de Protection (EPI)',
    ],
  },
];

const AUTOPLAY_DELAY = 6000;

interface PSTCPolesSectionProps {
  onOpenQuoteDrawer?: () => void;
}

export default function PSTCPolesSection({ onOpenQuoteDrawer }: PSTCPolesSectionProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const total = POLES.length;

  const goTo = useCallback((idx: number) => {
    setCurrentIndex((idx + total) % total);
  }, [total]);

  const next = useCallback(() => {
    goTo(currentIndex + 1);
  }, [currentIndex, goTo]);

  const prev = useCallback(() => {
    goTo(currentIndex - 1);
  }, [currentIndex, goTo]);

  // Autoplay fluide
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIdx) => (prevIdx + 1) % total);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  // Support tactile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) next();
    else if (diff < -50) prev();
    setTouchStartX(null);
    setIsPaused(false);
  };

  return (
    <section
      id="poles-activites"
      className="poles-hero-carousel-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Carrousel des 4 Pôles d’Excellence PSTC SARL"
    >
      {/* Piste de défilement horizontal (Vrai carrousel animé avec transition translateX) */}
      <div
        className="poles-carousel-track"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {POLES.map((pole, idx) => (
          <div key={pole.id} className="poles-carousel-slide">
            {/* L'image en fond complet de la diapositive */}
            <div className="poles-slide-bg">
              <Image
                src={pole.image}
                alt={pole.title}
                fill
                sizes="100vw"
                className="poles-slide-img"
                style={{ objectFit: 'cover' }}
                priority={idx === 0}
                quality={90}
              />
              {/* Voile sombre sobre pour lisibilité et élégance */}
              <div className="poles-slide-overlay" />
            </div>

            {/* Contenu textuel sobre superposé au premier plan */}
            <div className="container poles-slide-container">
              <div className="poles-slide-content">
                <span className="poles-slide-kicker">
                  PÔLE {pole.number} • {pole.shortTitle}
                </span>

                <h2 className="poles-slide-title">{pole.title}</h2>
                <p className="poles-slide-tagline">{pole.tagline}</p>
                <p className="poles-slide-desc">{pole.overview}</p>

                {/* Domaines d'intervention sous forme de tags discrets (sans liste de puces) */}
                <div className="poles-slide-tags">
                  {pole.domains.map((dom, dIdx) => (
                    <span key={dIdx} className="poles-slide-tag">
                      {dom}
                    </span>
                  ))}
                </div>

                {/* Bouton sobre vers la page dédiée */}
                <div className="poles-slide-actions">
                  <Link
                    href={`/services/${pole.id}`}
                    className="btn-poles-slide-primary"
                    style={{ backgroundColor: pole.accentColor }}
                  >
                    <span>Consulter la page dédiée</span>
                    <ArrowRight size={16} />
                  </Link>

                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                      `Bonjour PSTC SARL, je souhaite demander des informations et un devis pour le Pôle ${pole.number} (${pole.title}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-poles-slide-wa"
                  >
                    <MessageCircle size={16} />
                    <span>Demander un devis</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Flèches de navigation circulaire gauche / droite */}
      <button
        onClick={prev}
        className="poles-carousel-arrow prev"
        aria-label="Pôle précédent"
        title="Précédent"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={next}
        className="poles-carousel-arrow next"
        aria-label="Pôle suivant"
        title="Suivant"
      >
        <ChevronRight size={24} />
      </button>

      {/* Barre de navigation sobre en bas (Onglets / Indicateurs numérotés) */}
      <div className="poles-carousel-bottom-bar">
        <div className="container poles-bottom-container">
          <div className="poles-bottom-tabs">
            {POLES.map((pole, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={pole.id}
                  onClick={() => goTo(idx)}
                  className={`poles-bottom-tab ${isActive ? 'active' : ''}`}
                >
                  <span className="tab-idx">0{idx + 1}</span>
                  <span className="tab-title">{pole.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
