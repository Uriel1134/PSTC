'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export default function Footer() {
  return (
    <footer id="contact" className="footer-main">
      <div className="container">
        <div className="footer-grid">
          {/* Colonne 1 : Entreprise Mère */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <div style={{ position: 'relative', width: '160px', height: '44px' }}>
                <Image
                  src="/images/logo-pstc-sarl.png"
                  alt="Logo PSTC SARL"
                  fill
                  style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                />
              </div>
            </div>

            <p className="footer-about-text">
              <strong>{COMPANY_INFO.parentCompany} ({COMPANY_INFO.parentCompanyFullName})</strong> est une société multiservice de référence au Bénin : génie civil BTP, ingénierie réseaux &amp; télécoms, énergie solaire, négoce commercial, fournitures générales et gestion environnementale.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '0.82rem', color: 'var(--slate-400)', marginBottom: 16 }}>
              <div>{COMPANY_INFO.ifuNumber}</div>
              <div>{COMPANY_INFO.rccmNumber}</div>
            </div>
          </div>

          {/* Colonne 2 : Les 4 Pôles Métiers */}
          <div>
            <h4 className="footer-col-title">Nos 4 Pôles Métiers</h4>
            <ul className="footer-links">
              <li>
                <a href="/#prestations-techniques" className="footer-link">Pôle 01 : Prestations Techniques</a>
              </li>
              <li>
                <a href="/#solutions-commerciales" className="footer-link">Pôle 02 : Solutions Commerciales</a>
              </li>
              <li>
                <a href="/#fournitures-consommables" className="footer-link">Pôle 03 : Fournitures &amp; Consommables</a>
              </li>
              <li>
                <a href="/#gestion-environnementale" className="footer-link">Pôle 04 : Gestion Environnementale</a>
              </li>
              <li>
                <a href="/#institutionnel" className="footer-link">À Propos de PSTC SARL</a>
              </li>
              <li>
                <a href="/#processus-commande" className="footer-link">Processus de Commande</a>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Domaines d’Intervention */}
          <div>
            <h4 className="footer-col-title">Domaines d’Intervention</h4>
            <ul className="footer-links">
              <li>
                <a href="/#btp-travaux" className="footer-link">BTP, Forage &amp; Aménagement</a>
              </li>
              <li>
                <a href="/#informatique-reseaux" className="footer-link">Câblage Réseaux &amp; Télécoms</a>
              </li>
              <li>
                <a href="/#energie-climatisation" className="footer-link">Énergie Solaire &amp; Climatisation</a>
              </li>
              <li>
                <a href="/#securite-surveillance" className="footer-link">Sécurité &amp; Vidéosurveillance</a>
              </li>
              <li>
                <a href="/#commerce-auto" className="footer-link">Flottes Automobiles &amp; Logistique</a>
              </li>
              <li>
                <a href="/#hygiene-entretien" className="footer-link">Hygiène, Espaces Verts &amp; Salubrité</a>
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
            © {new Date().getFullYear()} <strong>PSTC SARL</strong> — Tous droits réservés. Prestation de Service Technique et Commerciale.
          </div>
          <div className="footer-legal-links">
            <span>Bénin • Togo • Côte d’Ivoire • Afrique de l’Ouest</span>
            <span>Conformité &amp; Marchés B2B</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
