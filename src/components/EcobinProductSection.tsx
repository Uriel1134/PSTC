'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
} from 'lucide-react';

interface EcobinProductSectionProps {
  onOpenQuoteDrawer?: () => void;
}

export default function EcobinProductSection({ onOpenQuoteDrawer }: EcobinProductSectionProps) {
  return (
    <section id="ecobin-produit" className="ecobin-spotlight-section" aria-labelledby="ecobin-spotlight-title">
      <div className="container">
        <div className="ecobin-spotlight-card">
          {/* Colonne Gauche : Titre institutionnel & Descriptif synthétique */}
          <div className="ecobin-spotlight-content">
            <h2 id="ecobin-spotlight-title" className="ecobin-spotlight-title">
              PSTC ECOBIN : La Solution Salubrité & Tri Sélectif au Bénin
            </h2>

            <p className="ecobin-spotlight-desc">
              Conçue, certifiée et distribuée par <strong>PSTC SARL</strong>, la gamme <strong>ECOBIN</strong> est la référence nationale en gestion moderne des déchets. Nous équipons les mairies, entreprises, hôpitaux et résidences avec des bacs roulants 2 et 4 roues normalisés <strong>EN 840</strong> (de 30L à 1 100L), des stations de tri sélectif RSE et des dispositifs médicaux DASRI étanches.
            </p>

            <div className="ecobin-spotlight-highlights">
              <div className="spotlight-highlight-item">
                <CheckCircle2 size={16} className="highlight-icon" />
                <span>Norme Européenne EN 840 (PEHD Vierge anti-UV)</span>
              </div>
              <div className="spotlight-highlight-item">
                <CheckCircle2 size={16} className="highlight-icon" />
                <span>Stock disponible en continu à Cotonou (Dandji)</span>
              </div>
              <div className="spotlight-highlight-item">
                <CheckCircle2 size={16} className="highlight-icon" />
                <span>Personnalisation sérigraphique (Logos & armoiries)</span>
              </div>
            </div>

            <div className="ecobin-spotlight-actions">
              <Link
                href="/catalogue?gamme=ecobin"
                className="btn-spotlight-primary"
                aria-label="Voir le catalogue des bacs et conteneurs Ecobin"
              >
                <span>Découvrir la Gamme ECOBIN</span>
                <ArrowRight size={17} />
              </Link>

              {onOpenQuoteDrawer && (
                <button
                  type="button"
                  onClick={onOpenQuoteDrawer}
                  className="btn-spotlight-secondary"
                  aria-label="Demander une cotation proforma pour Ecobin"
                >
                  <FileCheck size={17} />
                  <span>Demander un Devis</span>
                </button>
              )}
            </div>
          </div>

          {/* Colonne Droite : Le Grand Logo ECOBIN */}
          <div className="ecobin-spotlight-logo-wrap">
            <div className="spotlight-logo-container">
              <Image
                src="/images/logo-ecobin.png"
                alt="PSTC ECOBIN - Marque Déposée PSTC SARL"
                width={420}
                height={150}
                className="spotlight-big-logo"
                priority
              />
              <span className="spotlight-logo-caption">
                Une création et un produit exclusif de <strong>PSTC SARL</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
