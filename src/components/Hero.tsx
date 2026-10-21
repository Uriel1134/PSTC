'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, FileCheck, ShieldCheck, Layers, Award } from 'lucide-react';

interface HeroProps {
  onOpenQuoteDrawer: () => void;
}

export default function Hero({ onOpenQuoteDrawer }: HeroProps) {
  return (
    <div className="hero-corporate-wrapper">
      {/* Grand Hero Immersif Type Veolia / SUEZ */}
      <section className="hero-corporate">
        <div className="hero-corporate-bg">
          <Image
            src="/images/btp-travaux.png"
            alt="PSTC SARL - Prestation de Service Technique et Commerciale Bénin"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="hero-corporate-overlay" />
        </div>

        <div className="container hero-corporate-container">
          <div className="hero-corporate-body">

            <h1 className="hero-corporate-title">
              L’Excellence de la Salubrité, du Tri et de la Protection Professionnelle.
            </h1>

            <p className="hero-corporate-lead">
              Fournisseur de référence en équipements de voirie certifiés <strong>EN 840</strong> et solutions d’hygiène pour les collectivités territoriales, les centres hospitaliers, le secteur hôtelier et les industries.
            </p>

            <div className="hero-corporate-actions">
              <Link href="/catalogue" className="btn-corp-primary">
                <span>Explorer le Catalogue (62 Réf.)</span>
                <ArrowRight size={17} />
              </Link>

              <button onClick={onOpenQuoteDrawer} className="btn-corp-secondary">
                <FileCheck size={17} />
                <span>Demander un Devis Proforma</span>
              </button>
            </div>

            <div className="hero-corporate-trust">
              <div className="trust-pill">
                <ShieldCheck size={15} />
                <span>Norme Européenne EN 840</span>
              </div>
              <div className="trust-pill">
                <Layers size={15} />
                <span>100% PEHD Vierge Traité Anti-UV</span>
              </div>
              <div className="trust-pill">
                <Award size={15} />
                <span>Filière Sanitaire DASRI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cartes Métiers Embarquées (Docked Pillars - Signature Grands Groupes) */}
      <div className="hero-docked-wrapper">
        <div className="container">
          <div className="docked-cards-grid">
            {/* Carte 1 : Voirie */}
            <a href="#catalogue" className="docked-card">
              <div className="docked-card-content">
                <span className="docked-card-category">Voirie & Collectivités</span>
                <h3 className="docked-card-title">Bacs & Conteneurs 120L à 1100L</h3>
                <p className="docked-card-desc">PEHD haute densité, conformité lève-conteneur benne DIN.</p>
                <span className="docked-card-link">
                  Voir la gamme <ArrowRight size={14} />
                </span>
              </div>
              <div className="docked-card-thumb">
                <Image
                  src="/images/products/conteneur-4-roues-vert.png"
                  alt="Conteneurs 4 roues"
                  width={75}
                  height={75}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </a>

            {/* Carte 2 : Tri Sélectif */}
            <a href="#catalogue" className="docked-card">
              <div className="docked-card-content">
                <span className="docked-card-category">Économie Circulaire</span>
                <h3 className="docked-card-title">Stations de Tri 3 & 5 Flux</h3>
                <p className="docked-card-desc">Bornes intérieures et extérieures pour bureaux, hôtels et ERP.</p>
                <span className="docked-card-link">
                  Voir la gamme <ArrowRight size={14} />
                </span>
              </div>
              <div className="docked-card-thumb">
                <Image
                  src="/images/products/tri-5-bacs.png"
                  alt="Stations de tri sélectif"
                  width={75}
                  height={75}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </a>

            {/* Carte 3 : Santé & DASRI */}
            <a href="#catalogue" className="docked-card">
              <div className="docked-card-content">
                <span className="docked-card-category">Milieu Hospitalier</span>
                <h3 className="docked-card-title">Bacs Médicaux & DASRI</h3>
                <p className="docked-card-desc">Poubelles à commande au pied étanches avec marquage Biohazard.</p>
                <span className="docked-card-link">
                  Voir la gamme <ArrowRight size={14} />
                </span>
              </div>
              <div className="docked-card-thumb">
                <Image
                  src="/images/products/poubelle-gris-anthracite.png"
                  alt="Bacs DASRI"
                  width={75}
                  height={75}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </a>

            {/* Carte 4 : EPI */}
            <a href="#catalogue" className="docked-card">
              <div className="docked-card-content">
                <span className="docked-card-category">Protection du Personnel</span>
                <h3 className="docked-card-title">Équipements de Sécurité (EPI)</h3>
                <p className="docked-card-desc">Gilets haute visibilité, gants anti-coupure HPPE, casques et kits.</p>
                <span className="docked-card-link">
                  Voir la gamme <ArrowRight size={14} />
                </span>
              </div>
              <div className="docked-card-thumb">
                <Image
                  src="/images/products/gilet-ja.png"
                  alt="Gilet de sécurité"
                  width={75}
                  height={75}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
