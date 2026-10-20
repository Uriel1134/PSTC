'use client';

import React from 'react';
import Image from 'next/image';
import { Download, CheckCircle2, Eye, Recycle, HardHat, TrafficCone } from 'lucide-react';

const PDF_URL = '/catalogue-pstc-ecobin.pdf';
const PDF_FILENAME = 'Catalogue_PSTC_ECOBIN_20_pages.pdf';

const FAMILIES = [
  {
    icon: Recycle,
    title: 'Nettoyage, Gestion des Déchets & Hygiène',
    desc: 'Bacs roulants 15L à 1100L, stations de tri sélectif, sacs-poubelle renforcés, chariots de ménage et distributeurs sanitaires.',
  },
  {
    icon: HardHat,
    title: 'Équipements & Protection Professionnelle (EPI)',
    desc: 'Gilets haute visibilité, polos et tenues de pluie, gants de précision et anti-coupure, casques, lunettes et chaussures de sécurité.',
  },
  {
    icon: TrafficCone,
    title: 'Signalisation Routière & Sécurisation de Chantiers',
    desc: 'Cônes de balisage, balises lumineuses magnétiques, triangles de détresse et panneaux de signalisation temporaire.',
  },
];

export default function DownloadCatalogueSection() {
  return (
    <section id="catalogue-pdf" className="section section-download-catalogue">
      <div className="container">
        <div className="download-catalogue-card">
          <div className="download-catalogue-grid">
            {/* Colonne gauche : Présentation & contenu du catalogue */}
            <div className="download-catalogue-info">
              <h2 className="download-title">
                Téléchargez le catalogue complet
                <span className="download-title-sub">Édition 20 pages</span>
              </h2>

              <p className="download-lead">
                Retrouvez l’ensemble de nos gammes, spécifications dimensionnelles, normes de sécurité et solutions sectorielles dans un document PDF prêt pour vos comités d’achats et services d’exploitation.
              </p>

              <ul className="download-families">
                {FAMILIES.map(({ icon: Icon, title, desc }) => (
                  <li key={title} className="download-family-item">
                    <span className="family-icon" aria-hidden="true">
                      <Icon size={20} />
                    </span>
                    <div>
                      <h3 className="family-title">{title}</h3>
                      <p className="family-desc">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="download-actions">
                <a
                  href={PDF_URL}
                  download={PDF_FILENAME}
                  className="btn-download-main"
                  title="Télécharger le fichier PDF sur votre appareil"
                >
                  <Download size={18} />
                  <span>Télécharger le PDF · 9,3 Mo</span>
                </a>

                <a
                  href={PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-download-alt"
                  title="Consulter le catalogue en ligne"
                >
                  <Eye size={18} />
                  <span>Feuilleter en ligne</span>
                </a>
              </div>

              <ul className="download-meta-badges">
                <li className="download-meta-item">
                  <CheckCircle2 size={15} />
                  <span>Fiches techniques certifiées</span>
                </li>
                <li className="download-meta-item">
                  <CheckCircle2 size={15} />
                  <span>Format PDF interactif</span>
                </li>
                <li className="download-meta-item">
                  <CheckCircle2 size={15} />
                  <span>Disponibilité sous-régionale</span>
                </li>
              </ul>
            </div>

            {/* Colonne droite : Visuel du document */}
            <div className="download-catalogue-visual">
              <a
                href={PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="catalog-doc-stack"
                aria-label="Ouvrir le catalogue PSTC ECOBIN en PDF"
              >
                <span className="catalog-doc-sheet catalog-doc-sheet-back" aria-hidden="true" />
                <span className="catalog-doc-sheet catalog-doc-sheet-mid" aria-hidden="true" />

                <span className="catalog-doc-cover">
                  <span className="doc-cover-top">
                    <span className="doc-cover-logo">
                      <Image
                        src="/images/logo-pstc-sarl-trimmed.png"
                        alt="PSTC SARL"
                        fill
                        sizes="110px"
                        style={{ objectFit: 'contain', objectPosition: 'left center' }}
                      />
                    </span>
                    <span className="doc-cover-edition">Édition officielle</span>
                  </span>

                  <span className="doc-cover-photo">
                    <Image
                      src="/images/products/gamme-poubelles.png"
                      alt="Gamme de bacs et poubelles de tri PSTC ECOBIN"
                      fill
                      sizes="260px"
                      style={{ objectFit: 'cover' }}
                    />
                  </span>

                  <span className="doc-cover-body">
                    <span className="doc-cover-kicker">Catalogue produits</span>
                    <span className="doc-cover-title">Salubrité, tri sélectif &amp; protection professionnelle</span>
                  </span>
                </span>
              </a>

              <dl className="catalog-doc-stats">
                <div className="catalog-doc-stat">
                  <dt>Pages</dt>
                  <dd>20</dd>
                </div>
                <div className="catalog-doc-stat">
                  <dt>Références</dt>
                  <dd>62</dd>
                </div>
                <div className="catalog-doc-stat">
                  <dt>Familles</dt>
                  <dd>3</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
