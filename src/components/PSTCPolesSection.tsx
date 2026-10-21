'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Wrench,
  Building2,
  Network,
  SunMedium,
  ShieldAlert,
  Sparkles,
  Printer,
  TrendingUp,
  Truck,
  Globe,
  Wheat,
  Boxes,
  FileText,
  Laptop,
  Armchair,
  Stethoscope,
  Video,
  Zap,
  Recycle,
  Trash2,
  Layers,
  HardHat,
  ArrowRight,
  CheckCircle2,
  Download,
  FileCheck,
  MessageCircle,
} from 'lucide-react';
import { PSTC_POLES, PSTCPole, PoleItem } from '../data/pstc-poles';
import { COMPANY_INFO } from '../data/company';

// Mapping dynamique des icônes
const ICON_MAP: Record<string, React.ElementType> = {
  Wrench,
  Building2,
  Network,
  SunMedium,
  ShieldAlert,
  Sparkles,
  Printer,
  TrendingUp,
  Truck,
  Globe,
  Wheat,
  Boxes,
  FileText,
  Laptop,
  Armchair,
  Stethoscope,
  Video,
  Zap,
  Recycle,
  Trash2,
  Layers,
  HardHat,
};

interface PSTCPolesSectionProps {
  onOpenQuoteDrawer?: () => void;
}

export default function PSTCPolesSection({ onOpenQuoteDrawer }: PSTCPolesSectionProps) {
  const [activePoleId, setActivePoleId] = useState<string>('all');

  const displayedPoles =
    activePoleId === 'all'
      ? PSTC_POLES
      : PSTC_POLES.filter((p) => p.id === activePoleId);

  return (
    <section id="poles-activites" className="section pstc-poles-section">
      <div className="container">
        {/* En-tête de la section */}
        <div className="section-header text-center max-w-3xl mx-auto">
          <h2 className="section-title">
            Quatre Pôles d’Excellence pour Répondre à Tous Vos Besoins
          </h2>
          <p className="section-subtitle">
            De la réalisation de chantiers techniques et du négoce commercial jusqu’à l’approvisionnement en fournitures et la gestion environnementale, découvrez nos expertises intégrées pour les entreprises, collectivités et institutions.
          </p>
        </div>

        {/* Barre de Filtre par Pôle (Onglets modernes & responsifs) */}
        <div className="poles-filter-bar">
          <button
            onClick={() => setActivePoleId('all')}
            className={`poles-tab-btn ${activePoleId === 'all' ? 'active' : ''}`}
          >
            <span>Tous les 4 Pôles</span>
            <span className="tab-count">4</span>
          </button>
          {PSTC_POLES.map((pole) => {
            const Icon = ICON_MAP[pole.iconName] || Wrench;
            return (
              <button
                key={pole.id}
                onClick={() => setActivePoleId(pole.id)}
                className={`poles-tab-btn ${activePoleId === pole.id ? 'active' : ''}`}
              >
                <Icon size={16} />
                <span>{pole.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Affichage des Pôles et de leurs Cartes */}
        <div className="poles-container">
          {displayedPoles.map((pole) => {
            const PoleIcon = ICON_MAP[pole.iconName] || Wrench;
            return (
              <div key={pole.id} id={pole.id} className="pole-block">
                {/* Bandeau d'en-tête du Pôle */}
                <div className="pole-block-header">
                  <div className="pole-badge-num">
                    <span>{pole.number}</span>
                  </div>
                  <div className="pole-block-title-wrap">
                    <div className="pole-icon-inline">
                      <PoleIcon size={20} />
                      <span className="pole-kicker">{pole.shortTitle}</span>
                    </div>
                    <h3 className="pole-title">{pole.title}</h3>
                    <p className="pole-overview">{pole.overview}</p>
                  </div>
                  <div className="pole-block-action">
                    <Link href={`/services/${pole.id}`} className="btn-pole-header-link">
                      <span>Page Dédiée</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Grille des cartes illustrées pour ce Pôle */}
                <div className="pole-items-grid">
                  {pole.items.map((item) => {
                    const ItemIcon = ICON_MAP[item.iconName] || CheckCircle2;
                    return (
                      <article key={item.id} className="pole-item-card">
                        {/* Image d'illustration réelle */}
                        <div className="pole-card-media">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover' }}
                          />
                          <div className="pole-card-media-overlay" />
                          {item.tag && (
                            <span className="pole-card-tag">{item.tag}</span>
                          )}
                        </div>

                        {/* Corps de la carte */}
                        <div className="pole-card-body">
                          <div className="pole-card-heading">
                            <div className="pole-card-icon-box">
                              <ItemIcon size={18} />
                            </div>
                            <div>
                              <h4 className="pole-card-title">{item.title}</h4>
                              {item.subtitle && (
                                <span className="pole-card-sub">{item.subtitle}</span>
                              )}
                            </div>
                          </div>

                          {/* Liste à puces aérée & non surchargée */}
                          <ul className="pole-card-bullets">
                            {item.bulletPoints.map((pt, idx) => (
                              <li key={idx} className="pole-bullet-point">
                                <CheckCircle2 size={14} className="bullet-check" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Bouton d'action direct vers WhatsApp avec message pré-rempli */}
                          <div className="pole-card-footer">
                            <a
                              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                                `Bonjour PSTC SARL, je souhaite demander un devis pour la prestation suivante :\n• Service : ${item.title}\n• Pôle : ${pole.title}\n\nMerci de me recontacter avec votre meilleure proposition technique et commerciale.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-card-quote"
                              title={`Demander un devis via WhatsApp pour ${item.title}`}
                            >
                              <MessageCircle size={15} />
                              <span>Demander un devis WhatsApp</span>
                              <ArrowRight size={14} />
                            </a>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* Lien vers la page dédiée de ce pôle */}
                <div className="pole-bottom-bar">
                  <Link href={`/services/${pole.id}`} className="btn-pole-bottom-link">
                    <span>Consulter toutes les prestations détaillées du Pôle {pole.number} ({pole.title})</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
