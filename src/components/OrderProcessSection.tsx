'use client';

import React from 'react';
import { Search, ClipboardList, Settings, CheckCircle2, FileText, ArrowRight, PhoneCall, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface OrderProcessSectionProps {
  onOpenQuoteDrawer?: () => void;
}

export default function OrderProcessSection({ onOpenQuoteDrawer }: OrderProcessSectionProps) {
  const steps = [
    {
      num: '01',
      title: 'Expression du Besoin',
      desc: 'Transmettez votre cahier des charges, liste d’équipements, bordereau de fournitures ou descriptif de chantier.',
      icon: Search,
      highlight: 'Cahier des charges ou liste d’articles',
    },
    {
      num: '02',
      title: 'Étude Technique & Sourcing',
      desc: 'Nos équipes techniques et commerciales analysent la faisabilité, les spécifications techniques et les quantités requises.',
      icon: Settings,
      highlight: 'Dimensionnement & conformité des normes',
    },
    {
      num: '03',
      title: 'Offre Proforma Chiffrée',
      desc: 'Nous vous délivrons un devis proforma officiel avec bordereau de prix unitaires, délais d’exécution et conditions de garantie.',
      icon: ClipboardList,
      highlight: 'Devis officiel transmis sous 24h à 48h',
    },
    {
      num: '04',
      title: 'Réalisation & Livraison',
      desc: 'Déploiement des équipes sur chantier ou livraison sécurisée sur site avec procès-verbal de conformité.',
      icon: CheckCircle2,
      highlight: 'Suivi rigoureux jusqu’à réception',
    },
  ];

  return (
    <section id="processus-commande" className="section section-order-process">
      <div className="container">
        <div className="section-header text-center max-w-3xl mx-auto">
          <h2 className="section-title">
            Comment Collaborer Avec PSTC SARL
          </h2>
          <p className="section-subtitle">
            Un processus transparent et réactif en 4 étapes pour la prise en charge immédiate de vos projets de travaux, négoce et fournitures par notre direction commerciale.
          </p>
        </div>

        {/* Grille des 4 Étapes */}
        <div className="order-steps-grid">
          {steps.map((step, idx) => {
            const StepIcon = step.icon;
            return (
              <div key={idx} className="order-step-card">
                <div className="order-step-top">
                  <span className="order-step-number">{step.num}</span>
                  <div className="order-step-icon">
                    <StepIcon size={20} />
                  </div>
                </div>

                <h3 className="order-step-title">{step.title}</h3>
                <p className="order-step-desc">{step.desc}</p>

                <div className="order-step-highlight">
                  <span>Point clé :</span> {step.highlight}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bannière d'Action & Devis Proforma Rapide */}
        <div className="order-cta-box">
          <div className="order-cta-content">
            <h3 className="order-cta-title">
              Vous Avez un Projet Technique ou un Marché à Pourvoir ?
            </h3>
            <p className="order-cta-desc">
              Soumettez votre demande de cotation directement en ligne ou sollicitez un rendez-vous avec nos chargés d'affaires pour une étude sur site.
            </p>

            <div className="order-cta-buttons">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Bonjour PSTC SARL, je souhaite demander une cotation proforma pour un projet technique / commercial.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-order-cta-primary"
              >
                <MessageCircle size={18} />
                <span>Demander un Devis via WhatsApp</span>
                <ArrowRight size={17} />
              </a>

              <a
                href={`tel:${COMPANY_INFO.phoneCommercial}`}
                className="btn-order-cta-secondary"
              >
                <PhoneCall size={18} />
                <span>Direction Commerciale : {COMPANY_INFO.phoneCommercial}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
