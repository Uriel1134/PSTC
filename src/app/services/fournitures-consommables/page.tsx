'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FileText,
  Laptop,
  Armchair,
  Stethoscope,
  Video,
  Zap,
  HardHat,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  FileCheck,
  Phone,
  MessageCircle,
} from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ProductModal from '../../../components/ProductModal';
import QuoteDrawer from '../../../components/QuoteDrawer';
import { useQuote } from '../../../context/QuoteContext';
import { COMPANY_INFO } from '../../../data/company';

export default function FournituresConsommablesPage() {
  const {
    quoteItems,
    isQuoteDrawerOpen,
    openQuoteDrawer,
    closeQuoteDrawer,
    selectedProduct,
    setSelectedProduct,
    addToQuote,
    updateQuantity,
    removeItem,
    clearQuote,
  } = useQuote();

  const services = [
    {
      id: 'fournitures-administratives',
      title: 'Fournitures Administratives & Scolaires',
      subtitle: 'Papeterie professionnelle, classement & archivage',
      image: '/images/fournitures-administratives-scolaires.png',
      icon: FileText,
      points: [
        'Papeterie professionnelle et ramettes de papier certifiées haute qualité',
        'Classeurs, pochettes, chemises, boîtes d’archives et articles de reliure',
        'Lots de fournitures scolaires en gros pour collectivités et écoles',
        'Articles de bureau courants et consommables administratifs',
      ],
    },
    {
      id: 'fournitures-informatiques',
      title: 'Fournitures Informatiques & Bureautiques',
      subtitle: 'Postes de travail, copieurs & consommables d’impression',
      image: '/images/image copy 5.png',
      icon: Laptop,
      points: [
        'Ordinateurs de bureau, stations de travail portables et serveurs',
        'Imprimantes multifonctions, scanners réseau et photocopieurs',
        'Toners, tambours et cartouches d’encre d’origine constructeur',
        'Périphériques informatiques, onduleurs individuels et câblage',
      ],
    },
    {
      id: 'mobilier-bureau',
      title: 'Mobilier & Matériels de Bureau',
      subtitle: 'Agencement tertiaire, ergonomie & rangements',
      image: '/images/presentation-mobilier-bureau.png',
      icon: Armchair,
      points: [
        'Bureaux opérationnels, tables de réunion et cloisons modulaires',
        'Fauteuils ergonomiques, sièges de direction et chaises visiteur',
        'Armoires métalliques monoblocs fermant à clé, caissons et vestiaires',
        'Agencement complet et conception d’espaces de travail modernes',
      ],
    },
    {
      id: 'equipements-medicaux',
      title: 'Matériels & Équipements Médicaux',
      subtitle: 'Dispositifs biomédicaux, consommables & mobilier clinique',
      image: '/images/materiels-equipements-medicaux.png',
      icon: Stethoscope,
      points: [
        'Appareils de diagnostic clinique, tensiomètres, stéthoscopes et balances',
        'Mobilier médical : lits d’hospitalisation, paravents, tables d’examen',
        'Consommables médicaux stériles à usage unique (gants, compresses, seringues)',
        'Solutions DASRI pour la collecte sécurisée des déchets d’activités de soins',
      ],
    },
    {
      id: 'audiovisuel-telecoms',
      title: 'Équipements Audiovisuels & Télécoms',
      subtitle: 'Visioconférence, sonorisation & téléphonie d’entreprise',
      image: '/images/equipements-audiovisuels-telecoms.png',
      icon: Video,
      points: [
        'Écrans professionnels, vidéoprojecteurs et barres de visioconférence 4K',
        'Sonorisation complète de salles de réunion et systèmes de micros sans fil',
        'Centraux téléphoniques PABX/IPBX et combinés numériques IP',
        'Supports muraux, connectique HDMI/VGA et baies audiovisuelles',
      ],
    },
    {
      id: 'equipements-energetiques',
      title: 'Équipements Énergétiques & Secours',
      subtitle: 'Groupes électrogènes, onduleurs & régulateurs',
      image: '/images/equipements-energetiques-secours.png',
      icon: Zap,
      points: [
        'Groupes électrogènes industriels insonorisés de 10 kVA à 500 kVA',
        'Onduleurs on-line double conversion haute capacité pour datacenters',
        'Régulateurs automatiques de tension (AVR) pour la protection des équipements',
        'Batteries stationnaires solaires et systèmes d’inverseurs automatiques',
      ],
    },
    {
      id: 'epi-securite',
      title: 'Équipements de Protection Individuelle (EPI)',
      subtitle: 'Sécurité et protection certifiée CE des équipes de terrain',
      image: '/images/presentation-epi.png',
      icon: HardHat,
      points: [
        'Gilets haute visibilité fluo avec bandes réfléchissantes certifiés EN 471',
        'Casques de sécurité ventilés, lunettes de protection et masques respiratoires',
        'Gants de manutention résistants aux coupures et gants nitrile étanches',
        'Chaussures de sécurité coquées S3 antidérapantes et tenues de pluie imperméables',
      ],
    },
  ];

  return (
    <>
      <Header activeNav="services" />

      <main className="service-page-main">
        {/* En-tête de la page Service */}
        <section className="service-page-hero">
          <div className="container">
            {/* Fil d'Ariane */}
            <nav className="breadcrumb-nav">
              <Link href="/">Accueil</Link>
              <ChevronRight size={14} />
              <span>Services</span>
              <ChevronRight size={14} />
              <span className="current">Fournitures &amp; Consommables</span>
            </nav>

            <div className="service-hero-content">
              <h1 className="service-hero-title">
                Fournitures &amp; Consommables B2B
              </h1>
              <p className="service-hero-lead">
                Un interlocuteur unique pour l’approvisionnement intégral de vos bureaux, administrations, hôpitaux et chantiers : papeterie, informatique, mobilier ergonomique, matériel biomédical, équipements énergétiques et équipements de protection individuelle (EPI).
              </p>

              <div className="service-hero-actions">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Bonjour PSTC SARL, je souhaite demander un bordereau de prix / devis pour des fournitures et consommables B2B.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-corp-primary"
                >
                  <MessageCircle size={17} />
                  <span>Bordereau de Prix via WhatsApp</span>
                </a>
                <a href={`tel:${COMPANY_INFO.phoneCommercial}`} className="btn-corp-outline-call">
                  <Phone size={16} />
                  <span>Tél : {COMPANY_INFO.phoneCommercial}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Détail des Fournitures */}
        <section className="section service-details-section">
          <div className="container">
            <div className="service-details-header">
              <h2 className="section-title">
                Sept Familles de Fournitures &amp; Équipements Professionnels
              </h2>
              <p className="section-subtitle">
                Des références sélectionnées auprès des constructeurs certifiés avec garantie de conformité et livraison rapide.
              </p>
            </div>

            <div className="service-domains-grid">
              {services.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.id} id={item.id} className="service-domain-card">
                    <div className="service-domain-media">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="service-domain-overlay" />
                    </div>

                    <div className="service-domain-body">
                      <div className="domain-heading">
                        <div className="domain-icon-box" style={{ color: '#2B8A3E', backgroundColor: 'rgba(43, 138, 62, 0.1)' }}>
                          <Icon size={20} />
                        </div>
                        <div>
                          <h3 className="domain-title">{item.title}</h3>
                          <span className="domain-sub">{item.subtitle}</span>
                        </div>
                      </div>

                      <ul className="domain-points-list">
                        {item.points.map((pt, idx) => (
                          <li key={idx} className="domain-point">
                            <CheckCircle2 size={15} className="bullet-check" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="domain-card-footer" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        {item.id === 'epi-securite' && (
                          <Link
                            href="/catalogue?gamme=epi"
                            className="btn-card-quote"
                            style={{ backgroundColor: '#2B8A3E', color: '#ffffff' }}
                          >
                            <HardHat size={14} />
                            <span>Découvrir le Catalogue EPI</span>
                            <ArrowRight size={14} />
                          </Link>
                        )}
                        <a
                          href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(`Bonjour PSTC SARL, je souhaite demander une cotation pour les fournitures suivantes : *${item.title}*.\nMerci de me recontacter.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-card-quote"
                        >
                          <MessageCircle size={14} />
                          <span>Cotation via WhatsApp</span>
                          <ArrowRight size={14} />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Encart Découverte des Gammes d'EPI */}
            <div
              className="epi-discovery-banner"
              style={{
                marginTop: 48,
                marginBottom: 48,
                padding: '36px 40px',
                borderRadius: 'var(--radius-xl, 16px)',
                background: 'linear-gradient(135deg, #002244 0%, #003366 45%, #1B5E20 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 32,
                flexWrap: 'wrap',
                border: '1px solid rgba(72, 187, 120, 0.25)',
                boxShadow: '0 20px 45px -15px rgba(0, 34, 68, 0.5)',
              }}
            >
              <div style={{ maxWidth: 660 }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 14px',
                    borderRadius: 999,
                    backgroundColor: 'rgba(43, 138, 62, 0.25)',
                    border: '1px solid rgba(72, 187, 120, 0.4)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#86EFAC',
                    marginBottom: 12,
                  }}
                >
                  <HardHat size={16} />
                  <span>SÉCURITÉ &amp; PROTECTION DU PERSONNEL</span>
                </div>
                <h3
                  style={{
                    fontSize: '1.65rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    marginBottom: 10,
                    lineHeight: 1.3,
                  }}
                >
                  Découvrez nos Gammes Complètes d'EPI
                </h3>
                <p style={{ fontSize: '0.98rem', color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
                  Casques de chantier, gilets haute visibilité, gants anticoupure, combinaisons de protection et accessoires homologués CE : consultez l'ensemble de nos références directement dans le catalogue.
                </p>
              </div>

              <div>
                <Link
                  href="/catalogue?gamme=epi"
                  className="btn-corp-primary"
                  style={{
                    backgroundColor: '#2B8A3E',
                    color: '#ffffff',
                    fontWeight: 800,
                    padding: '16px 28px',
                    borderRadius: 'var(--radius-md, 10px)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    fontSize: '1.02rem',
                    textDecoration: 'none',
                    boxShadow: '0 10px 25px -5px rgba(43, 138, 62, 0.55)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <HardHat size={20} />
                  <span>Découvrir les gammes d'EPI</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Bannière d'Action */}
            <div className="service-bottom-cta">
              <div className="service-cta-text">
                <h3>Vous préparez une commande de rentrée ou une dotation d'entreprise ?</h3>
                <p>Envoyez-nous votre liste d'articles ou bordereau quantitatif estimatif : nous vous transmettons notre meilleure offre sous 24h.</p>
              </div>
              <div className="service-cta-btns">
                <Link
                  href="/catalogue?gamme=epi"
                  className="btn-about-call"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                >
                  <HardHat size={16} />
                  <span>Catalogue EPI</span>
                </Link>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Bonjour PSTC SARL, je souhaite transmettre une liste de fournitures pour une cotation proforma.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-about-quote"
                >
                  <MessageCircle size={16} />
                  <span>Demander une Cotation WhatsApp</span>
                  <ArrowRight size={16} />
                </a>
                <Link href="/contact" className="btn-about-call">
                  <span>Contacter le Service Achats</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToQuote={addToQuote}
        isAlreadyInQuote={
          selectedProduct
            ? quoteItems.some((item) => item.product.id === selectedProduct.id)
            : false
        }
      />

      <QuoteDrawer
        isOpen={isQuoteDrawerOpen}
        onClose={closeQuoteDrawer}
        items={quoteItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearQuote={clearQuote}
      />
    </>
  );
}
