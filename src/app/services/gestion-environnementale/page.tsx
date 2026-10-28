'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Trash2,
  Layers,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  FileCheck,
  Phone,
  ShoppingCart,
  MessageCircle,
  Building2,
} from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ProductModal from '../../../components/ProductModal';
import QuoteDrawer from '../../../components/QuoteDrawer';
import { useQuote } from '../../../context/QuoteContext';
import { COMPANY_INFO } from '../../../data/company';

export default function GestionEnvironnementalePage() {
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
      id: 'hygiene-entretien',
      title: 'Hygiène & Produits d’Entretien',
      subtitle: 'Produits homologués, sacs haute densité & accessoires',
      image: '/images/hygiene-produits-entretien.png',
      icon: Sparkles,
      points: [
        'Fournitures de produits d’entretien professionnels et désinfectants homologués',
        'Sacs poubelle renforcés haute densité (50L, 100L, 120L et 240L étanches)',
        'Chariots de ménage professionnels, raclettes et distributeurs sanitaires',
        'Matériels et équipements complets de propreté pour sites tertiaires et ERP',
      ],
    },
    {
      id: 'entretien-batiments',
      title: 'Entretien & Nettoyage de Bâtiments',
      subtitle: 'Locaux professionnels, bureaux, sièges sociaux & surfaces commerciales',
      image: '/images/entretien-nettoyage-batiments.png',
      icon: Building2,
      points: [
        'Nettoyage approfondi et entretien régulier de bureaux et sièges d’entreprises',
        'Remise en état après travaux, décapage et vitrerie haute technicité',
        'Désinfection, dépoussiérage et propreté intégrale des espaces tertiaires',
        'Assainissement, gestion des déchets courants et maintenance de propreté',
      ],
    },
    {
      id: 'poubelles-bacs',
      title: 'Poubelles & Bacs Roulants de Collecte',
      subtitle: 'Conformité stricte à la norme européenne EN 840',
      image: '/images/products/conteneur-4-roues-vert.png',
      icon: Trash2,
      points: [
        'Bacs roulants 2 roues robustes : 30L, 50L, 80L, 100L, 120L, 240L et 360L',
        'Grands conteneurs 4 roues de voirie : 660L, 770L et 1100L avec frein centralisé',
        'Fabrication 100% Polyéthylène Haute Densité (PEHD) vierge traité anti-UV',
        'Prises DIN renforcées compatibles avec lève-conteneurs de camions-bennes',
      ],
    },
    {
      id: 'tri-selectif',
      title: 'Stations de Tri Sélectif Multi-Flux',
      subtitle: 'Bornes 3 à 5 flux, codes couleurs & filière DASRI',
      image: '/images/products/tri-5-bacs.png',
      icon: Layers,
      points: [
        'Îlots et stations de tri 3, 4 et 5 flux adaptés aux bureaux et lieux publics',
        'Codes couleurs normalisés (Bleu, Jaune, Vert, Gris, Marron) pour valorisation RSE',
        'Poubelles hospitalières étanches à pédale pour Déchets d’Activités de Soins (DASRI)',
        'Conseil en dimensionnement et disposition stratégique des points de collecte',
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
              <span className="current">Gestion Environnementale</span>
            </nav>

            <div className="service-hero-content">
              <h1 className="service-hero-title">
                Solutions de Gestion Environnementale
              </h1>
              <p className="service-hero-lead">
                Salubrité, hygiène professionnelle, entretien de bâtiments, bacs roulants certifiés EN 840 et solutions de tri sélectif pour les entreprises, administrations et établissements de santé.
              </p>

              <div className="service-hero-actions">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Bonjour PSTC SARL, je souhaite demander un devis pour des prestations de gestion environnementale / salubrité.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-corp-primary"
                >
                  <MessageCircle size={17} />
                  <span>Demander un Devis Salubrité (WhatsApp)</span>
                </a>
                <Link href="/catalogue?category=poubelles" className="btn-corp-secondary">
                  <ShoppingCart size={16} />
                  <span>Catalogue Poubelles &amp; Bacs</span>
                </Link>
                <a href={`tel:${COMPANY_INFO.phoneCommercial}`} className="btn-corp-outline-call">
                  <Phone size={16} />
                  <span>{COMPANY_INFO.phoneCommercial}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Détail des Domaines Environnementaux */}
        <section className="section service-details-section">
          <div className="container">
            <div className="service-details-header">
              <h2 className="section-title">
                Quatre Domaines d’Hygiène, Salubrité &amp; Gestion des Déchets
              </h2>
              <p className="section-subtitle">
                Des équipements conformes aux normes internationales les plus exigeantes pour préserver vos environnements et valoriser vos engagements RSE.
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
                        <div className="domain-icon-box" style={{ color: '#059669', backgroundColor: 'rgba(5, 150, 105, 0.1)' }}>
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
                        {item.id === 'hygiene-entretien' && (
                          <Link
                            href="/catalogue?category=hygiene"
                            className="btn-card-quote"
                            style={{ backgroundColor: '#2B8A3E', color: '#ffffff' }}
                          >
                            <Sparkles size={14} />
                            <span>Voir les produits d’hygiène &amp; entretien</span>
                            <ArrowRight size={14} />
                          </Link>
                        )}
                        {(item.id === 'poubelles-bacs' || item.id === 'tri-selectif') && (
                          <Link
                            href="/catalogue?category=poubelles"
                            className="btn-card-quote"
                            style={{ backgroundColor: '#004B93', color: '#ffffff' }}
                          >
                            <ShoppingCart size={14} />
                            <span>Voir tout le catalogue Poubelles &amp; Conteneurs</span>
                            <ArrowRight size={14} />
                          </Link>
                        )}
                        <a
                          href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(`Bonjour PSTC SARL, je souhaite demander un devis pour la prestation environnementale suivante : *${item.title}*.\nMerci de me recontacter.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-card-quote"
                        >
                          <MessageCircle size={14} />
                          <span>Devis via WhatsApp</span>
                          <ArrowRight size={14} />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Bannière de contact */}
            <div className="service-bottom-cta">
              <div className="service-cta-text">
                <h3>Besoin de conteneurs normalisés ou d'un plan de gestion des déchets ?</h3>
                <p>Nos conseillers effectuent une étude de vos volumes et vous soumettent un devis proforma avec délais de livraison garantis.</p>
              </div>
              <div className="service-cta-btns">
                <Link
                  href="/catalogue?category=poubelles"
                  className="btn-about-quote"
                  style={{ backgroundColor: '#004B93', color: '#ffffff' }}
                >
                  <ShoppingCart size={16} />
                  <span>Catalogue Poubelles &amp; Conteneurs</span>
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Bonjour PSTC SARL, je souhaite demander un devis proforma pour des conteneurs normalisés ou un plan de gestion des déchets.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-about-quote"
                >
                  <MessageCircle size={16} />
                  <span>Demander un Devis WhatsApp</span>
                  <ArrowRight size={16} />
                </a>
                <Link href="/contact" className="btn-about-call">
                  <span>Contact Direction</span>
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
