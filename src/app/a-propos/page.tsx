'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Building2,
  ShieldCheck,
  TrendingUp,
  Boxes,
  Recycle,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  MapPin,
  Clock,
  Phone,
  Mail,
  Award,
  MessageCircle,
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductModal from '../../components/ProductModal';
import QuoteDrawer from '../../components/QuoteDrawer';
import { useQuote } from '../../context/QuoteContext';
import { COMPANY_INFO } from '../../data/company';

export default function AProposPage() {
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

  const values = [
    {
      title: 'Rigueur & Conformité Technique',
      desc: 'Tous nos travaux BTP, réseaux et fournitures répondent aux normes professionnelles reconnues et aux cahiers des charges les plus exigeants.',
      icon: Award,
    },
    {
      title: 'Transparence & Compétitivité',
      desc: 'Bordereaux de prix unitaires détaillés, fiches techniques claires et devis proforma délivrés sous 24 à 48 heures ouvrées.',
      icon: ShieldCheck,
    },
    {
      title: 'Réactivité & Proximité',
      desc: 'Implantation stratégique à Cotonou avec des équipes mobiles prêtes à intervenir rapidement sur tout le territoire national et dans la sous-région.',
      icon: Clock,
    },
    {
      title: 'Synergie Multidisciplinaire',
      desc: 'Un interlocuteur unique pour coordonner l’ensemble de vos corps d’état techniques, approvisionnements marchands et fournitures de bureau.',
      icon: Building2,
    },
  ];

  const poles = [
    {
      num: '01',
      title: 'Prestations Techniques',
      desc: 'Génie civil BTP, câblage réseaux & télécoms, énergie solaire, climatisation, sécurité électronique et maintenance.',
      href: '/services/prestations-techniques',
      icon: Building2,
    },
    {
      num: '02',
      title: 'Solutions Commerciales',
      desc: 'Commerce et flottes automobiles, négoce général import-export et distribution de produits agroalimentaires certifiés.',
      href: '/services/solutions-commerciales',
      icon: TrendingUp,
    },
    {
      num: '03',
      title: 'Fournitures & Consommables',
      desc: 'Papeterie, informatique bureautique, mobilier de bureau, matériel biomédical, énergie et équipements de protection individuelle (EPI).',
      href: '/services/fournitures-consommables',
      icon: Boxes,
    },
    {
      num: '04',
      title: 'Gestion Environnementale',
      desc: 'Hygiène, entretien de bâtiments, bacs roulants certifiés EN 840 et solutions de tri sélectif.',
      href: '/services/gestion-environnementale',
      icon: Recycle,
    },
  ];

  return (
    <>
      <Header activeNav="about" />

      <main className="about-page-main">
        {/* Hero À Propos */}
        <section className="service-page-hero">
          <div className="container">
            <nav className="breadcrumb-nav">
              <Link href="/">Accueil</Link>
              <ChevronRight size={14} />
              <span className="current">À Propos de PSTC SARL</span>
            </nav>

            <div className="service-hero-content">
              <h1 className="service-hero-title">
                L’Excellence Multiservice au Service de Votre Croissance
              </h1>
              <p className="service-hero-lead">
                <strong>PSTC SARL (Prestation de Service Technique et Commerciale)</strong> est une entreprise béninoise structurée pour répondre avec précision aux besoins des entreprises, institutions publiques et chantiers industriels.
              </p>

              <div className="service-hero-actions">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Bonjour PSTC SARL, je souhaite demander des informations institutionnelles et un devis de partenariat.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-corp-primary"
                >
                  <MessageCircle size={17} />
                  <span>Demander un Devis WhatsApp</span>
                  <ArrowRight size={17} />
                </a>
                <Link href="/contact" className="btn-corp-outline-call">
                  <Phone size={16} />
                  <span>Contacter la Direction</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Identité & Chiffres Clés */}
        <section className="section about-identity-section">
          <div className="container">
            <div className="about-identity-grid">
              <div className="identity-text-col">
                <div className="section-kicker-clean">
                  <span>NOTRE HISTOIRE &amp; AMBITION</span>
                </div>
                <h2 className="section-title">
                  Un Modèle d’Intégration Unique au Bénin
                </h2>
                <p className="section-subtitle" style={{ marginBottom: 20 }}>
                  Créée avec la vision d'offrir un guichet multiservice fiable aux décideurs économiques, <strong>PSTC SARL</strong> réunit des compétences transversales souvent dispersées : du génie civil à l'informatique réseau, du négoce automobile aux fournitures médicales et à la salubrité environnementale.
                </p>
                <p style={{ color: 'var(--slate-600)', lineHeight: 1.7, marginBottom: 28 }}>
                  Notre modèle repose sur la rigueur opérationnelle, des relations constructeurs directes pour un approvisionnement sans intermédiaire superflu, et une présence constante auprès de nos clients jusqu'à la réception définitive des ouvrages et commandes.
                </p>

                {/* Données Légales Encadrées */}
                <div className="legal-info-card">
                  <div className="legal-row">
                    <span className="legal-label">Raison Sociale :</span>
                    <strong className="legal-value">{COMPANY_INFO.parentCompanyFullName} ({COMPANY_INFO.parentCompany})</strong>
                  </div>
                  <div className="legal-row">
                    <span className="legal-label">Numéro IFU :</span>
                    <strong className="legal-value">{COMPANY_INFO.ifuNumber}</strong>
                  </div>
                  <div className="legal-row">
                    <span className="legal-label">Registre du Commerce :</span>
                    <strong className="legal-value">{COMPANY_INFO.rccmNumber}</strong>
                  </div>
                  <div className="legal-row">
                    <span className="legal-label">Siège Social :</span>
                    <span className="legal-value">{COMPANY_INFO.address}</span>
                  </div>
                </div>
              </div>

              {/* Photo Institutionnelle */}
              <div className="identity-media-col">
                <div className="identity-image-wrapper">
                  <Image
                    src="/images/hero-urban.jpg"
                    alt="PSTC SARL Cotonou Bénin"
                    fill
                    sizes="(max-width: 992px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="identity-badge-float">
                    <ShieldCheck size={28} />
                    <div>
                      <strong>100% En Règle</strong>
                      <span>Marchés Publics &amp; Privés</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nos 4 Pôles d'Excellence */}
        <section className="section section-bg-light">
          <div className="container">
            <div className="section-header text-center max-w-3xl mx-auto">
              <h2 className="section-title">Nos 4 Pôles d’Expertise</h2>
              <p className="section-subtitle">
                Chaque pôle dispose d’encadrements spécialisés et de moyens matériels adaptés pour garantir une exécution dans les règles de l'art.
              </p>
            </div>

            <div className="about-poles-grid">
              {poles.map((p) => {
                const Icon = p.icon;
                return (
                  <Link key={p.num} href={p.href} className="about-pole-card">
                    <div className="about-pole-num">{p.num}</div>
                    <div className="about-pole-icon">
                      <Icon size={24} />
                    </div>
                    <h3 className="about-pole-title">{p.title}</h3>
                    <p className="about-pole-desc">{p.desc}</p>
                    <span className="about-pole-link">
                      Découvrir la page dédiée <ArrowRight size={14} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Nos Engagements Fondateurs */}
        <section className="section">
          <div className="container">
            <div className="section-header text-center max-w-3xl mx-auto">
              <div className="section-kicker-clean">
                <span>NOS PRINCIPES DIRECTEURS</span>
              </div>
              <h2 className="section-title">Quatre Engagements pour Votre Sérénité</h2>
              <p className="section-subtitle">
                De la première prise de contact à la livraison finale, nous appliquons une déontologie stricte d’efficacité et de transparence.
              </p>
            </div>

            <div className="about-values-grid">
              {values.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div key={idx} className="about-value-item">
                    <div className="about-val-icon">
                      <Icon size={24} />
                    </div>
                    <h3 className="about-val-title">{val.title}</h3>
                    <p className="about-val-desc">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Bas de Page */}
        <section className="section-about-clean" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="about-cta-bar">
              <div className="about-cta-text">
                <h4>Vous souhaitez rencontrer notre équipe dirigeante ou commerciale ?</h4>
                <p>Nous vous accueillons à nos bureaux à Cotonou ou nous déplaçons directement sur vos chantiers et sites.</p>
              </div>
              <div className="about-cta-buttons">
                <Link href="/contact" className="btn-about-quote">
                  <span>Prendre Contact</span>
                  <ArrowRight size={16} />
                </Link>
                <a href={`tel:${COMPANY_INFO.phoneCommercial}`} className="btn-about-call">
                  <Phone size={15} />
                  <span>{COMPANY_INFO.phoneCommercial}</span>
                </a>
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
