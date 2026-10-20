'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ShieldCheck, ArrowUpRight, Award, FileText, Download } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export default function Footer() {
  return (
    <footer id="contact" className="footer-main">
      <div className="container">
        <div className="footer-grid">
          {/* Colonne 1 : Entreprise Mère & Marque */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ position: 'relative', width: '160px', height: '48px' }}>
                <Image
                  src="/images/logo-ecobin.png"
                  alt="Logo PSTC ECOBIN"
                  fill
                  style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                />
              </div>
            </div>

            <p className="footer-about-text">
              <strong>PSTC ECOBIN</strong> est la division de solutions professionnelles de collecte, d’hygiène, de tri sélectif et d’EPI développée par <strong>{COMPANY_INFO.parentCompany} ({COMPANY_INFO.parentCompanyFullName})</strong>.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '0.82rem', color: 'var(--slate-400)', marginBottom: 16 }}>
              <div>{COMPANY_INFO.ifuNumber}</div>
              <div>{COMPANY_INFO.rccmNumber}</div>
            </div>

            <a
              href="/catalogue-pstc-ecobin.pdf"
              download="Catalogue_PSTC_ECOBIN_20_pages.pdf"
              className="btn btn-sm btn-outline-white"
              style={{ padding: '8px 14px', fontSize: '0.82rem', gap: 6 }}
              title="Télécharger le catalogue officiel complet"
            >
              <Download size={15} />
              <span>Catalogue PDF (20 p.)</span>
            </a>
          </div>

          {/* Colonne 2 : Liens Rapides */}
          <div>
            <h4 className="footer-col-title">Navigation Métier</h4>
            <ul className="footer-links">
              <li>
                <a href="#catalogue" className="footer-link">Bacs Roulants 2 Roues (30L-360L)</a>
              </li>
              <li>
                <a href="#catalogue" className="footer-link">Conteneurs Lourds 4 Roues (660L-1100L)</a>
              </li>
              <li>
                <a href="#guide-capacites" className="footer-link">Guide des Capacités & Sacs</a>
              </li>
              <li>
                <a href="#tri-selectif" className="footer-link">Charte du Tri Sélectif (4 Flux)</a>
              </li>
              <li>
                <a href="#processus-commande" className="footer-link">Processus de Commande B2B</a>
              </li>
              <li>
                <a href="#catalogue-pdf" className="footer-link">Téléchargement Catalogue PDF</a>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Normes & Secteurs */}
          <div>
            <h4 className="footer-col-title">Engagements & Secteurs</h4>
            <ul className="footer-links">
              <li>
                <a href="#secteurs" className="footer-link">Collectivités & Mairies</a>
              </li>
              <li>
                <a href="#secteurs" className="footer-link">Hôtels, Résidences & HORECA</a>
              </li>
              <li>
                <a href="#secteurs" className="footer-link">Cliniques & Centres Hospitaliers</a>
              </li>
              <li>
                <a href="#secteurs" className="footer-link">Industries & Chantiers BTP</a>
              </li>
              <li>
                <a href="#conformite" className="footer-link">Normes Européennes EN 840</a>
              </li>
              <li>
                <a href="#conformite" className="footer-link">Résistance UV & Climat Tropical</a>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Coordonnées Officielles */}
          <div>
            <h4 className="footer-col-title">Direction Commerciale</h4>
            
            <div className="footer-contact-item">
              <MapPin size={18} />
              <div>
                <strong>Siège Administratif & Commercial :</strong><br />
                {COMPANY_INFO.address}
              </div>
            </div>

            <div className="footer-contact-item">
              <Phone size={18} />
              <div>
                <strong>Commandes & Devis B2B :</strong><br />
                {COMPANY_INFO.phoneCommercial}
              </div>
            </div>

            <div className="footer-contact-item">
              <Mail size={18} />
              <div>
                <strong>Courriel Officiel :</strong><br />
                <a href={`mailto:${COMPANY_INFO.emailCommercial}`} style={{ color: '#E2E8F0', textDecoration: 'underline' }}>
                  {COMPANY_INFO.emailCommercial}
                </a>
              </div>
            </div>

            <div className="footer-contact-item">
              <Clock size={18} />
              <div>
                <strong>Permanence :</strong><br />
                {COMPANY_INFO.workingHours}
              </div>
            </div>
          </div>
        </div>

        {/* Ligne Inférieure Mentions Légales */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} <strong>PSTC SARL</strong> — Tous droits réservés. Marque commerciale <strong>PSTC ECOBIN</strong>.
          </div>
          <div className="footer-legal-links">
            <span>Bénin • Togo • Côte d’Ivoire • Afrique de l’Ouest</span>
            <span>Conformité RSE & Salubrité Publique</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
