'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Truck,
  Globe,
  Wheat,
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

export default function SolutionsCommercialesPage() {
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
      id: 'commerce-automobile',
      title: 'Commerce Automobile & Flottes',
      subtitle: 'Véhicules neufs, utilitaires & pièces de rechange',
      image: '/images/image copy 3.png',
      icon: Truck,
      points: [
        'Vente et approvisionnement en véhicules neufs et d’occasion certifiés',
        'Constitution et renouvellement de flottes d’entreprises et utilitaires',
        'Fourniture de pièces de rechange d’origine et accessoires automobiles',
        'Accompagnement et conseil en gestion de parc roulant',
      ],
    },
    {
      id: 'commerce-general',
      title: 'Commerce Général & Import-Export',
      subtitle: 'Négoce international, sourcing & distribution',
      image: '/images/commerce-general-logistique.jpg',
      icon: Globe,
      points: [
        'Négoce commercial sur le marché béninois et dans l’espace UEMOA',
        'Importation et exportation de marchandises diverses pour professionnels',
        'Sourcing international de biens d’équipement et de consommation',
        'Prise en charge logistique et livraison directe sur vos sites',
      ],
    },
    {
      id: 'produits-agricoles',
      title: 'Produits Agricoles & Agroalimentaires',
      subtitle: 'Filières vivrières, céréales & denrées de rente',
      image: '/images/image copy 4.png',
      icon: Wheat,
      points: [
        'Commercialisation de produits vivriers et denrées de rente',
        'Distribution de produits agroalimentaires transformés de qualité contrôlée',
        'Approvisionnement en céréales, légumineuses et tubercules pour collectivités',
        'Conditionnement sécurisé respectant les exigences sanitaires et de traçabilité',
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
              <span className="current">Solutions Commerciales</span>
            </nav>

            <div className="service-hero-content">
              <h1 className="service-hero-title">
                Solutions Commerciales &amp; Import-Export
              </h1>
              <p className="service-hero-lead">
                Un pôle d’approvisionnement stratégique pour les flottes de véhicules d’entreprise, le négoce général de marchandises et la distribution de denrées agroalimentaires certifiées au Bénin et dans la sous-région.
              </p>

              <div className="service-hero-actions">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Bonjour PSTC SARL, je souhaite demander une cotation commerciale (véhicules, négoce ou denrées).")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-corp-primary"
                >
                  <MessageCircle size={17} />
                  <span>Cotation Commerciale via WhatsApp</span>
                </a>
                <a href={`tel:${COMPANY_INFO.phoneCommercial}`} className="btn-corp-outline-call">
                  <Phone size={16} />
                  <span>Tél : {COMPANY_INFO.phoneCommercial}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Détail des Domaines Commerciaux */}
        <section className="section service-details-section">
          <div className="container">
            <div className="service-details-header">
              <h2 className="section-title">
                Trois Domaines de Négoce &amp; Logistique B2B
              </h2>
              <p className="section-subtitle">
                Des circuits d’approvisionnement sécurisés et compétitifs pour vos investissements en mobilité et distribution marchande.
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
                        <div className="domain-icon-box" style={{ color: '#16A34A', backgroundColor: 'rgba(22, 163, 74, 0.1)' }}>
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

                      <div className="domain-card-footer">
                        <a
                          href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(`Bonjour PSTC SARL, je souhaite obtenir une cotation pour le service commercial suivant : *${item.title}*.\nMerci de me recontacter.`)}`}
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

            {/* Bannière de contact */}
            <div className="service-bottom-cta">
              <div className="service-cta-text">
                <h3>Besoin d’un approvisionnement en volume ou d’un véhicule ?</h3>
                <p>Notre service commercial étudie vos besoins spécifiques et vous fournit une cotation avec délais et garanties contractuelles.</p>
              </div>
              <div className="service-cta-btns">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Bonjour PSTC SARL, je souhaite demander un devis proforma pour des approvisionnements commerciaux en volume.")}`}
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
