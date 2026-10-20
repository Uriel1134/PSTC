'use client';

import React from 'react';
import { Search, ClipboardList, Settings, CheckCircle2, FileText, ArrowRight, PhoneCall, Mail } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface OrderProcessSectionProps {
  onOpenQuoteDrawer: () => void;
}

export default function OrderProcessSection({ onOpenQuoteDrawer }: OrderProcessSectionProps) {
  const steps = [
    {
      num: '01',
      title: 'Repérer les Modèles',
      desc: 'Parcourez notre catalogue interactif en ligne ou notre catalogue PDF 20 pages pour identifier les références et contenants nécessaires.',
      icon: Search,
      highlight: 'Réf. techniques ou N° de visuel',
    },
    {
      num: '02',
      title: 'Indiquer les Quantités',
      desc: 'Précisez le litrage souhaité (ex: 240L, 660L), les coloris de tri, les tailles des vêtements ou EPI et le lieu de livraison (Bénin ou sous-région).',
      icon: ClipboardList,
      highlight: 'Volumes, tailles & site de livraison',
    },
    {
      num: '03',
      title: 'Décrire les Usages & Exigences',
      desc: 'Informez-nous sur le type d’établissement (hôpital DASRI, voirie, hôtel, industrie) et vos exigences particulières de personnalisation (marquage logo).',
      icon: Settings,
      highlight: 'Contraintes du site & personnalisation',
    },
    {
      num: '04',
      title: 'Validation de l’Offre Proforma',
      desc: 'Notre service commercial vous transmet un devis proforma officiel avec délais de livraison garantis, certificat de conformité et conditions de règlement.',
      icon: CheckCircle2,
      highlight: 'Offre chiffrée sous 24h ouvrées',
    },
  ];

  return (
    <section id="processus-commande" className="section section-order-process">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Comment Préparer & Passer Votre Commande
          </h2>
          <p className="section-subtitle">
            Une procédure en 4 étapes claires, extraite de la page 19 de notre catalogue, pour faciliter la prise en charge rapide de vos demandes d’approvisionnement par la direction commerciale de PSTC SARL.
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
              Prêt à Dimensionner Vos Équipements de Salubrité ?
            </h3>
            <p className="order-cta-desc">
              Constituez votre sélection directement sur ce portail web en ajoutant les articles à votre devis proforma officiel, ou échangez directement avec notre direction commerciale pour un audit de site.
            </p>

            <div className="order-cta-buttons">
              <button
                onClick={onOpenQuoteDrawer}
                className="btn-order-cta-primary"
              >
                <FileText size={18} />
                <span>Constituer mon Devis Proforma en Ligne</span>
                <ArrowRight size={17} />
              </button>

              <a
                href={`tel:${COMPANY_INFO.phoneCommercial}`}
                className="btn-order-cta-secondary"
              >
                <PhoneCall size={18} />
                <span>Contacter la Direction : {COMPANY_INFO.phoneCommercial}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
