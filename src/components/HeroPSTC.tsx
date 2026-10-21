'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  FileCheck,
  ShieldCheck,
  Building2,
  TrendingUp,
  Boxes,
  Recycle,
  Clock,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface HeroPSTCProps {
  onOpenQuoteDrawer?: () => void;
}

export default function HeroPSTC({ onOpenQuoteDrawer }: HeroPSTCProps) {
  return (
    <div className="hero-corporate-wrapper">
      {/* Grand Hero Immersif Institutionnel Groupe PSTC SARL */}
      <section className="hero-corporate">
        <div className="hero-corporate-bg">
          <Image
            src="/images/btp-travaux.png"
            alt="PSTC SARL - Prestation de Service Technique et Commerciale Cotonou Bénin"
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
              L’Excellence Multiservice pour les Entreprises, Collectivités &amp; Chantiers.
            </h1>

            <p className="hero-corporate-lead">
              Partenaire stratégique au Bénin et dans l’espace UEMOA : travaux <strong>BTP &amp; génie civil</strong>, <strong>infrastructures réseaux &amp; télécoms</strong>, <strong>énergie solaire</strong>, négoce commercial, fournitures professionnelles et gestion environnementale.
            </p>

            <div className="hero-corporate-actions">
              <a href="#poles-activites" className="btn-corp-primary">
                <span>Découvrir nos 4 Pôles Métiers</span>
                <ArrowRight size={17} />
              </a>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Bonjour PSTC SARL, je souhaite demander un devis pour un projet / des prestations.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-corp-secondary"
              >
                <MessageCircle size={17} />
                <span>Demander un Devis WhatsApp</span>
              </a>

              <a href={`tel:${COMPANY_INFO.phoneCommercial}`} className="btn-corp-outline-call">
                <Phone size={16} />
                <span>Contact Direct</span>
              </a>
            </div>

            <div className="hero-corporate-trust">
              <div className="trust-pill">
                <ShieldCheck size={15} />
                <span>RCCM &amp; IFU en Règle Fiscale</span>
              </div>
              <div className="trust-pill">
                <Building2 size={15} />
                <span>4 Pôles d’Expertises Intégrés</span>
              </div>
              <div className="trust-pill">
                <Clock size={15} />
                <span>Réponse Proforma sous 24h</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cartes Métiers Embarquées : Les 4 Pôles de PSTC SARL */}
      <div className="hero-docked-wrapper">
        <div className="container">
          <div className="docked-cards-grid docked-cards-4">
            {/* Carte 1 : Prestations Techniques */}
            <Link href="/services/prestations-techniques" className="docked-card">
              <div className="docked-card-content">
                <span className="docked-card-category">Pôle 01 • Ingénierie</span>
                <h3 className="docked-card-title">Prestations Techniques</h3>
                <p className="docked-card-desc">BTP, réseaux télécoms, énergie solaire &amp; sécurité.</p>
                <span className="docked-card-link">
                  Voir la page dédiée <ArrowRight size={14} />
                </span>
              </div>
              <div className="docked-card-thumb">
                <Building2 size={32} className="docked-thumb-icon" />
              </div>
            </Link>

            {/* Carte 2 : Solutions Commerciales */}
            <Link href="/services/solutions-commerciales" className="docked-card">
              <div className="docked-card-content">
                <span className="docked-card-category">Pôle 02 • Négoce</span>
                <h3 className="docked-card-title">Solutions Commerciales</h3>
                <p className="docked-card-desc">Commerce auto, négoce général et produits agricoles.</p>
                <span className="docked-card-link">
                  Voir la page dédiée <ArrowRight size={14} />
                </span>
              </div>
              <div className="docked-card-thumb">
                <TrendingUp size={32} className="docked-thumb-icon" />
              </div>
            </Link>

            {/* Carte 3 : Fournitures & Consommables */}
            <Link href="/services/fournitures-consommables" className="docked-card">
              <div className="docked-card-content">
                <span className="docked-card-category">Pôle 03 • Dotation B2B</span>
                <h3 className="docked-card-title">Fournitures &amp; Consommables</h3>
                <p className="docked-card-desc">Bureautique, mobilier, matériel médical &amp; énergie.</p>
                <span className="docked-card-link">
                  Voir la page dédiée <ArrowRight size={14} />
                </span>
              </div>
              <div className="docked-card-thumb">
                <Boxes size={32} className="docked-thumb-icon" />
              </div>
            </Link>

            {/* Carte 4 : Gestion Environnementale */}
            <Link href="/services/gestion-environnementale" className="docked-card">
              <div className="docked-card-content">
                <span className="docked-card-category">Pôle 04 • Salubrité</span>
                <h3 className="docked-card-title">Gestion Environnementale</h3>
                <p className="docked-card-desc">Hygiène, espaces verts, bacs de voirie &amp; EPI.</p>
                <span className="docked-card-link">
                  Voir la page dédiée <ArrowRight size={14} />
                </span>
              </div>
              <div className="docked-card-thumb">
                <Recycle size={32} className="docked-thumb-icon" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
