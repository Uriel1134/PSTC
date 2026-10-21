'use client';

import React from 'react';
import { ShieldCheck, FileCheck, MapPin, Zap, ArrowRight, Phone, Mail } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface InstitutionalIntroProps {
  onOpenQuoteDrawer?: () => void;
}

export default function InstitutionalIntro({ onOpenQuoteDrawer }: InstitutionalIntroProps) {
  const corporateHighlights = [
    {
      icon: ShieldCheck,
      title: 'Conformité Fiscale & Légale',
      desc: `${COMPANY_INFO.ifuNumber} • ${COMPANY_INFO.rccmNumber}. Éligible aux marchés publics et privés.`,
    },
    {
      icon: Zap,
      title: 'Synergie Multitechnique',
      desc: 'Un interlocuteur unique pour vos chantiers BTP, réseaux, énergie solaire et fournitures.',
    },
    {
      icon: FileCheck,
      title: 'Transparence & Proforma Rapide',
      desc: 'Bordereaux de prix compétitifs et devis proforma détaillés transmis sous 24 à 48 heures.',
    },
    {
      icon: MapPin,
      title: 'Implantation & Déploiement',
      desc: 'Siège à Cotonou avec capacité d’intervention rapide sur tout le territoire national et dans l’espace UEMOA.',
    },
  ];

  return (
    <section id="institutionnel" className="section section-about-clean">
      <div className="container">
        {/* En-tête Épuré */}
        <div className="section-header text-center max-w-3xl mx-auto">
          <h2 className="section-title">
            Votre Partenaire Unique pour Vos Projets d’Envergure
          </h2>
          <p className="section-subtitle">
            Société multiservice basée à Cotonou, <strong>PSTC SARL</strong> centralise vos prestations techniques, votre approvisionnement marchand et vos fournitures professionnelles avec un engagement rigoureux de qualité.
          </p>
        </div>

        {/* 4 Cartes Atouts Synthétiques (Légères et Aérées) */}
        <div className="about-cards-grid">
          {corporateHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="about-card-clean">
                <div className="about-icon-box">
                  <Icon size={24} />
                </div>
                <h3 className="about-card-title">{item.title}</h3>
                <p className="about-card-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Bandeau d'Action Simplifié */}
        <div className="about-cta-bar">
          <div className="about-cta-text">
            <h4>Vous avez un appel d’offres ou un besoin d’approvisionnement ?</h4>
            <p>Notre équipe commerciale et technique est à votre disposition pour chiffrer votre projet.</p>
          </div>
          <div className="about-cta-buttons">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Bonjour PSTC SARL, je souhaite demander une cotation pour un appel d'offres / un projet d'entreprise.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-about-quote"
            >
              <span>Demander une Cotation WhatsApp</span>
              <ArrowRight size={16} />
            </a>
            <a href={`tel:${COMPANY_INFO.phoneCommercial}`} className="btn-about-call">
              <Phone size={15} />
              <span>{COMPANY_INFO.phoneCommercial}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
