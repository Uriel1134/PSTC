'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Building2,
  Network,
  SunMedium,
  ShieldAlert,
  Printer,
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

export default function PrestationsTechniquesPage() {
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
      id: 'btp-travaux',
      title: 'Bâtiment, BTP & Travaux',
      subtitle: 'Génie civil, réfection & aménagements portuaires',
      image: '/images/btp-travaux.png',
      icon: Building2,
      points: [
        'Travaux de génie civil et constructions BTP',
        'Entretien courant et réfection complète de bâtiments',
        'Travaux de menuiserie bois et aluminium de précision',
        'Travaux spécialisés d’aménagement portuaire et maritime',
        'Forage hydraulique et adduction d’eau',
        'Plomberie sanitaire industrielle et tertiaire',
        'Travaux de peinture intérieure, extérieure et revêtements spéciaux',
      ],
    },
    {
      id: 'informatique-reseaux',
      title: 'Informatique, Réseaux & Télécommunications',
      subtitle: 'Câblage structuré, maintenance & téléphonie',
      image: '/images/reseaux-telecoms.jpg',
      icon: Network,
      points: [
        'Câblage structuré cuivre et fibre optique (baies de brassage)',
        'Installation et maintenance de réseaux informatiques et téléphonie IP',
        'Maintenance préventive et curative des parcs informatiques & électroniques',
        'Fourniture et intégration de matériels audiovisuels et télécoms',
      ],
    },
    {
      id: 'energie-climatisation',
      title: 'Électricité, Énergie & Climatisation',
      subtitle: 'Énergie solaire photovoltaïque & génie frigorifique',
      image: '/images/energie-solaire.jpg',
      icon: SunMedium,
      points: [
        'Étude, fourniture et installation de centrales solaires photovoltaïques',
        'Systèmes solaires hybrides et autonomes avec stockage batterie',
        'Maintenance et dépannage d’appareils de froid et climatisation tertiaire',
        'Installation et rénovation d’armoires électriques basse tension',
      ],
    },
    {
      id: 'securite-surveillance',
      title: 'Sécurité Électronique & Surveillance',
      subtitle: 'Contrôle d’accès, vidéosurveillance CCTV & alarmes',
      image: '/images/image.png',
      icon: ShieldAlert,
      points: [
        'Systèmes de contrôle d’accès biométrique, badges RFID et tourniquets',
        'Systèmes de détection et sécurité incendie avec centrales normalisées',
        'Systèmes d’alarmes anti-intrusion et détection périmétrique',
        'Vidéosurveillance IP haute définition avec enregistreurs sécurisés',
      ],
    },
    {
      id: 'impression-communication',
      title: 'Impression & Communication Visuelle',
      subtitle: 'Cachets professionnels, sérigraphie & signalétique',
      image: '/images/image copy.png',
      icon: Printer,
      points: [
        'Conception et fabrication de cachets et tampons professionnels',
        'Travaux de sérigraphie sur textiles, métal et supports rigides',
        'Signalétique de sécurité, plaques professionnelles et panneaux de chantier',
        'Impression institutionnelle pour administrations et entreprises',
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
              <span className="current">Prestations Techniques</span>
            </nav>

            <div className="service-hero-content">
              <h1 className="service-hero-title">
                Prestations Techniques &amp; Génie Civil
              </h1>
              <p className="service-hero-lead">
                Une équipe d’ingénieurs, techniciens et spécialistes pour concevoir, exécuter et maintenir vos chantiers BTP, infrastructures réseaux, installations solaires et dispositifs de sécurité au Bénin.
              </p>

              <div className="service-hero-actions">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Bonjour PSTC SARL, je souhaite demander un devis technique pour des travaux / chantiers BTP.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-corp-primary"
                >
                  <MessageCircle size={17} />
                  <span>Demander un Devis Technique (WhatsApp)</span>
                </a>
                <a href={`tel:${COMPANY_INFO.phoneCommercial}`} className="btn-corp-outline-call">
                  <Phone size={16} />
                  <span>Assistance Chantier : {COMPANY_INFO.phoneCommercial}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Détail des Domaines d'Intervention */}
        <section className="section service-details-section">
          <div className="container">
            <div className="service-details-header">
              <h2 className="section-title">
                Cinq Domaines de Compétences Techniques Intégrées
              </h2>
              <p className="section-subtitle">
                De la construction à la maintenance continue, découvrez l’ensemble de nos expertises opérationnelles.
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
                        <div className="domain-icon-box">
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
                          href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(`Bonjour PSTC SARL, je souhaite demander un devis pour la prestation technique suivante : *${item.title}*.\nMerci de me recontacter.`)}`}
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

            {/* Bannière d'appel à projet */}
            <div className="service-bottom-cta">
              <div className="service-cta-text">
                <h3>Vous avez un cahier des charges ou un appel d’offres en cours ?</h3>
                <p>Nos ingénieurs et chargés d’affaires effectuent une visite sur site et vous soumettent un devis proforma détaillé.</p>
              </div>
              <div className="service-cta-btns">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Bonjour PSTC SARL, j'ai un cahier des charges / appel d'offres technique et souhaite obtenir une cotation proforma.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-about-quote"
                >
                  <MessageCircle size={16} />
                  <span>Demander une Cotation WhatsApp</span>
                  <ArrowRight size={16} />
                </a>
                <Link href="/contact" className="btn-about-call">
                  <span>Nous Contacter</span>
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
