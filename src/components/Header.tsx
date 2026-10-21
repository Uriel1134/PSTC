'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import {
  Phone,
  Mail,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  BookOpen,
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link';
import { COMPANY_INFO } from '../data/company';
import { useQuote } from '../context/QuoteContext';

interface HeaderProps {
  quoteCount?: number;
  onOpenQuoteDrawer?: () => void;
  activeNav?: 'home' | 'services' | 'catalogue' | 'about' | 'contact';
}

export default function Header({
  quoteCount,
  onOpenQuoteDrawer,
  activeNav,
}: HeaderProps) {
  const quoteContext = useQuote();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Bloquer le scroll d'arrière-plan quand le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const dropdownRef = useRef<HTMLLIElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const effectiveQuoteCount = quoteCount ?? quoteContext.quoteCount;
  const effectiveOpenQuoteDrawer = onOpenQuoteDrawer ?? quoteContext.openQuoteDrawer;

  const servicesList = [
    {
      title: 'Prestations Techniques',
      href: '/services/prestations-techniques',
    },
    {
      title: 'Solutions Commerciales',
      href: '/services/solutions-commerciales',
    },
    {
      title: 'Fournitures & Consommables',
      href: '/services/fournitures-consommables',
    },
    {
      title: 'Gestion Environnementale',
      href: '/services/gestion-environnementale',
    },
  ];

  // Gestion sécurisée de la fermeture au clic en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 220); // 220ms de tolérance pour un survol fluide sans disparition intempestive
  };

  return (
    <>
      {/* Topbar Institutionnelle PSTC SARL */}
      <div className="topbar">
        <div className="container topbar-content">
          <div className="topbar-left">
            <span className="topbar-tag">PSTC SARL</span>
            <span className="topbar-sep">•</span>
            <span className="topbar-location">Prestation de Service Technique et Commerciale • Cotonou, Bénin</span>
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
          </div>
        </div>
      </div>

      {/* Barre de Navigation Principale */}
      <header className="header-main">
        <div className="container header-container">
          {/* Logo Unique Officiel : PSTC SARL */}
          <Link href="/" className="brand-logo-item" title="PSTC SARL - Accueil">
            <div className="logo-sarl-wrapper">
              <Image
                src="/images/logo-pstc-sarl.png"
                alt="Logo PSTC SARL"
                fill
                sizes="(max-width: 768px) 130px, 175px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </Link>

          {/* Menu Simple, Sober & Structuré Desktop */}
          <nav className="nav-desktop">
            <ul className="nav-menu">
              {/* 1. Accueil */}
              <li>
                <Link
                  href="/"
                  className={`nav-item ${activeNav === 'home' ? 'nav-item-active' : ''}`}
                >
                  Accueil
                </Link>
              </li>

              {/* 2. Services (Dropdown Sober & Pro, sans bug de disparition) */}
              <li
                ref={dropdownRef}
                className="nav-item-dropdown-wrapper"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={`nav-item nav-item-btn ${activeNav === 'services' ? 'nav-item-active' : ''}`}
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                  aria-expanded={isServicesDropdownOpen}
                >
                  <span>Services</span>
                  <ChevronDown size={14} className={`dropdown-chevron ${isServicesDropdownOpen ? 'rotate' : ''}`} />
                </button>

                {/* Dropdown Sobre & Professionnel */}
                {isServicesDropdownOpen && (
                  <div
                    className="services-dropdown-sober"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <ul className="dropdown-sober-list">
                      {servicesList.map((svc) => (
                        <li key={svc.href}>
                          <Link
                            href={svc.href}
                            className="dropdown-sober-link"
                            onClick={() => setIsServicesDropdownOpen(false)}
                          >
                            <span>{svc.title}</span>
                            <ChevronRight size={14} className="dropdown-link-arrow" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>

              {/* 3. Catalogue */}
              <li>
                <Link
                  href="/catalogue"
                  className={`nav-item ${activeNav === 'catalogue' ? 'nav-item-active' : ''}`}
                >
                  Catalogue
                </Link>
              </li>

              {/* 4. À Propos */}
              <li>
                <Link
                  href="/a-propos"
                  className={`nav-item ${activeNav === 'about' ? 'nav-item-active' : ''}`}
                >
                  À Propos
                </Link>
              </li>

              {/* 5. Contact */}
              <li>
                <Link
                  href="/contact"
                  className={`nav-item ${activeNav === 'contact' ? 'nav-item-active' : ''}`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Actions Droite */}
          <div className="header-actions">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                effectiveOpenQuoteDrawer();
              }}
              className="btn btn-quote-action"
              aria-label="Accéder au panier de devis proforma"
            >
              <ShoppingCart size={18} />
              <span className="quote-action-text">Devis Proforma</span>
              {effectiveQuoteCount > 0 && (
                <span className="badge-quote-count">{effectiveQuoteCount}</span>
              )}
            </button>

            {/* Bouton Hamburger Mobile (< 992px) */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMobileMenuOpen((prev) => !prev);
              }}
              className="btn-mobile-nav-toggle"
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Tiroir de Navigation Mobile (< 992px) rendu via Portal direct sur document.body */}
      {mounted && isMobileMenuOpen && createPortal(
        <div
          className="mobile-nav-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsMobileMenuOpen(false);
            }
          }}
        >
          <div className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-top">
              <span className="mobile-nav-tag">PSTC SARL • Menu</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileMenuOpen(false);
                }}
                className="mobile-nav-close-btn"
                aria-label="Fermer le menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="mobile-nav-links">
              {/* Accueil */}
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`mobile-nav-link ${activeNav === 'home' ? 'active' : ''}`}
              >
                <span>Accueil</span>
                <ChevronRight size={16} />
              </Link>

              {/* Services Header */}
              <div
                className="mobile-nav-accordion-header"
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              >
                <span>Services</span>
                <ChevronDown
                  size={16}
                  style={{
                    transform: isMobileServicesOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}
                />
              </div>

              {/* Sub-services */}
              {isMobileServicesOpen && (
                <div className="mobile-nav-sublinks">
                  {servicesList.map((svc) => (
                    <Link
                      key={svc.href}
                      href={svc.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="mobile-nav-sublink"
                    >
                      <span>{svc.title}</span>
                      <ChevronRight size={14} />
                    </Link>
                  ))}
                </div>
              )}

              {/* Catalogue */}
              <Link
                href="/catalogue"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`mobile-nav-link ${activeNav === 'catalogue' ? 'active' : ''}`}
              >
                <span>Catalogue Produits &amp; Équipements</span>
                <ChevronRight size={16} />
              </Link>

              {/* À Propos */}
              <Link
                href="/a-propos"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`mobile-nav-link ${activeNav === 'about' ? 'active' : ''}`}
              >
                <span>À Propos de PSTC SARL</span>
                <ChevronRight size={16} />
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`mobile-nav-link ${activeNav === 'contact' ? 'active' : ''}`}
              >
                <span>Direction Commerciale &amp; Contact</span>
                <ChevronRight size={16} />
              </Link>
            </nav>

            <div className="mobile-nav-actions">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Bonjour PSTC SARL, je souhaite demander des informations et un devis.")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-mobile-whatsapp-action"
              >
                <MessageCircle size={18} />
                <span>Devis Direct WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  effectiveOpenQuoteDrawer();
                }}
                className="btn-quote-action"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <ShoppingCart size={16} />
                <span>Voir le Panier Catalogue ({effectiveQuoteCount})</span>
              </button>

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
        </div>,
        document.body
      )}
    </>
  );
}
