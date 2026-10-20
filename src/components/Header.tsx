'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail, ShoppingCart, ArrowRight, Download, Menu, X, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { COMPANY_INFO } from '../data/company';
import { useQuote } from '../context/QuoteContext';

interface HeaderProps {
  quoteCount?: number;
  onOpenQuoteDrawer?: () => void;
  activeNav?: 'home' | 'catalogue';
}

export default function Header({
  quoteCount,
  onOpenQuoteDrawer,
  activeNav,
}: HeaderProps) {
  const quoteContext = useQuote();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const effectiveQuoteCount = quoteCount ?? quoteContext.quoteCount;
  const effectiveOpenQuoteDrawer = onOpenQuoteDrawer ?? quoteContext.openQuoteDrawer;

  return (
    <>
      {/* Topbar Institutionnelle Épurée (1 seule ligne propre) */}
      <div className="topbar">
        <div className="container topbar-content">
          <div className="topbar-left">
            <span className="topbar-tag">GROUPE PSTC SARL</span>
            <span className="topbar-sep">•</span>
            <span className="topbar-location">Bénin & Afrique de l’Ouest</span>
          </div>

          <div className="topbar-right">
            <a href={`tel:${COMPANY_INFO.phoneCommercial}`} className="topbar-contact-item">
              <Phone size={13} />
              <span>{COMPANY_INFO.phoneCommercial}</span>
            </a>
            <span className="topbar-sep topbar-desktop-only">•</span>
            <a href={`mailto:${COMPANY_INFO.emailCommercial}`} className="topbar-contact-item topbar-desktop-only">
              <Mail size={13} />
              <span>{COMPANY_INFO.emailCommercial}</span>
            </a>
            <span className="topbar-sep topbar-desktop-only">•</span>
            <a
              href="/catalogue-pstc-ecobin.pdf"
              download="Catalogue_PSTC_ECOBIN_20_pages.pdf"
              className="topbar-contact-item topbar-desktop-only"
              title="Télécharger le catalogue officiel 20 pages au format PDF"
            >
              <Download size={13} />
              <span>Catalogue PDF (20 p.)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Barre de Navigation Principale Aérée */}
      <header className="header-main">
        <div className="container header-container">
          {/* Les Deux Logos Officiels du Groupe : PSTC SARL d'abord, puis PSTC ECOBIN */}
          <div className="brand-group">
            <Link href="/" className="brand-logo-item" title="PSTC SARL - Accueil Groupe">
              <div className="logo-sarl-wrapper">
                <Image
                  src="/images/logo-pstc-sarl.png"
                  alt="Logo PSTC SARL - Maison Mère"
                  fill
                  sizes="158px"
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </Link>

            <div className="brand-logos-divider" />

            <Link href="/" className="brand-logo-item" title="PSTC ECOBIN - Salubrité & Tri Sélectif">
              <div className="logo-ecobin-wrapper">
                <Image
                  src="/images/logo-ecobin.png"
                  alt="Logo PSTC ECOBIN"
                  fill
                  sizes="108px"
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Menu Simple & Lisible Desktop */}
          <nav className="nav-desktop">
            <ul className="nav-menu">
              <li>
                <Link
                  href="/catalogue"
                  className={`nav-item ${activeNav === 'catalogue' ? 'nav-item-active' : ''}`}
                >
                  Catalogue
                </Link>
              </li>
              <li>
                <Link href="/#secteurs" className="nav-item">Secteurs</Link>
              </li>
              <li>
                <Link href="/#institutionnel" className="nav-item">L'Entreprise</Link>
              </li>
              <li>
                <Link href="/#conformite" className="nav-item">Normes & Durabilité</Link>
              </li>
            </ul>
          </nav>

          {/* Actions Droite */}
          <div className="header-actions">
            <a
              href="/catalogue-pstc-ecobin.pdf"
              download="Catalogue_PSTC_ECOBIN_20_pages.pdf"
              className="btn btn-pdf-action header-desktop-pdf"
              title="Télécharger le Catalogue Officiel PDF (20 pages)"
            >
              <Download size={14} />
              <span>Catalogue PDF</span>
            </a>

            <button
              onClick={effectiveOpenQuoteDrawer}
              className="btn btn-quote-action"
              aria-label="Accéder au devis proforma"
            >
              <ShoppingCart size={16} />
              <span className="quote-action-text">Devis Proforma</span>
              {effectiveQuoteCount > 0 && (
                <span className="badge-quote-count">{effectiveQuoteCount}</span>
              )}
            </button>

            {/* Bouton Hamburger Mobile (< 992px) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn-mobile-nav-toggle"
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Tiroir de Navigation Mobile (< 992px) */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-backdrop" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-top">
              <span className="mobile-nav-tag">Navigation Groupe</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-nav-close-btn"
                aria-label="Fermer le menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="mobile-nav-links">
              <Link
                href="/catalogue"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`mobile-nav-link ${activeNav === 'catalogue' ? 'active' : ''}`}
              >
                <span>Catalogue Professionnel (62 Réf.)</span>
                <ChevronRight size={16} />
              </Link>
              <Link
                href="/#secteurs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-nav-link"
              >
                <span>Secteurs & Solutions Métiers</span>
                <ChevronRight size={16} />
              </Link>
              <Link
                href="/#institutionnel"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-nav-link"
              >
                <span>L'Entreprise (PSTC SARL)</span>
                <ChevronRight size={16} />
              </Link>
              <Link
                href="/#conformite"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-nav-link"
              >
                <span>Normes & Durabilité (EN 840)</span>
                <ChevronRight size={16} />
              </Link>
            </nav>

            <div className="mobile-nav-actions">
              <a
                href="/catalogue-pstc-ecobin.pdf"
                download="Catalogue_PSTC_ECOBIN_20_pages.pdf"
                className="btn-mobile-pdf-action"
              >
                <Download size={16} />
                <span>Télécharger le Catalogue PDF (20 p.)</span>
              </a>

              <div className="mobile-nav-contacts">
                <a href={`tel:${COMPANY_INFO.phoneCommercial}`} className="mobile-contact-row">
                  <Phone size={15} />
                  <span>{COMPANY_INFO.phoneCommercial}</span>
                </a>
                <a href={`mailto:${COMPANY_INFO.emailCommercial}`} className="mobile-contact-row">
                  <Mail size={15} />
                  <span>{COMPANY_INFO.emailCommercial}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
