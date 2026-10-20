'use client';

import React from 'react';
import Image from 'next/image';
import { Check, Compass, Target, Shield, Recycle } from 'lucide-react';

export default function InstitutionalIntro() {
  return (
    <section id="institutionnel" className="section section-bg-light">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Une Marque Stratégique Portée par l’Excellence de PSTC SARL
          </h2>
          <p className="section-subtitle">
            PSTC ECOBIN n’est pas un simple distributeur de poubelles, mais une division technique d’ingénierie et de fournitures professionnelles dédiée à la propreté urbaine, la sécurité au travail et l’économie circulaire.
          </p>
        </div>

        <div className="institution-grid">
          {/* Colonne Gauche : Histoire, Vision et 4 Piliers */}
          <div className="institution-content">
            <div style={{ position: 'relative', width: '220px', height: '65px', marginBottom: 20 }}>
              <Image
                src="/images/logo-pstc-sarl.png"
                alt="Logo PSTC SARL"
                fill
                style={{ objectFit: 'contain', objectPosition: 'left' }}
              />
            </div>

            <p className="institution-tagline">
              Accompagner la modernisation écologique et l’hygiène en République du Bénin et dans toute la zone UEMOA.
            </p>

            <div className="institution-paragraphs">
              <p>
                Créée sous l’égide de <strong>PSTC SARL (Prestation de Service Technique et Commerciale)</strong>, la marque <strong>PSTC ECOBIN</strong> répond à l’urgence d’une professionnalisation accrue de la gestion des déchets et des équipements sanitaires en Afrique de l’Ouest.
              </p>
              <p>
                De la voirie municipale aux blocs opératoires hospitaliers, des sièges de multinationales aux plateformes logistiques industrielles, notre vocation est de livrer du matériel durable, normalisé et immédiatement exploitable par les services d’exploitation.
              </p>
            </div>

            {/* Les 4 Valeurs Fondatrices */}
            <div className="institution-values">
              <div className="value-card">
                <div className="value-card-header">
                  <Compass size={18} />
                  <span className="value-card-title">Créer & Concevoir</span>
                </div>
                <p className="value-card-desc">
                  Dimensionnement sur-mesure des parcs de conteneurs selon les flux de déchets réels.
                </p>
              </div>

              <div className="value-card">
                <div className="value-card-header">
                  <Shield size={18} />
                  <span className="value-card-title">Fabriquer & Sourcer</span>
                </div>
                <p className="value-card-desc">
                  Partenariats industriels exclusifs garantissant un PEHD 100% vierge et le respect de la norme EN 840.
                </p>
              </div>

              <div className="value-card">
                <div className="value-card-header">
                  <Target size={18} />
                  <span className="value-card-title">Aménager les Espaces</span>
                </div>
                <p className="value-card-desc">
                  Mise en place d’îlots de tri sélectif harmonieux pour valoriser l’image de marque de nos clients.
                </p>
              </div>

              <div className="value-card">
                <div className="value-card-header">
                  <Recycle size={18} />
                  <span className="value-card-title">Innover & Sécuriser</span>
                </div>
                <p className="value-card-desc">
                  Intégration d’EPI haute performance et de protocoles DASRI pour protéger les équipes sur le terrain.
                </p>
              </div>
            </div>
          </div>

          {/* Colonne Droite : Vitrine Institutionnelle & Garanties */}
          <div className="institution-showcase">
            <span className="showcase-badge">Garanties & Engagements B2B</span>
            <h3 className="showcase-title">
              La Référence des Marchés Publics et Privés au Bénin
            </h3>
            <p className="showcase-desc">
              Nous apportons aux directions des achats et aux responsables RSE une sécurité contractuelle totale : fiches techniques certifiées, bordereaux de prix unitaires (BPU) transparents et capacité logistique de déploiement immédiat.
            </p>

            <ul className="showcase-points">
              <li className="showcase-point">
                <Check size={18} />
                <span><strong>Entreprise enregistrée :</strong> RCCM et IFU en parfaite conformité fiscale.</span>
              </li>
              <li className="showcase-point">
                <Check size={18} />
                <span><strong>Traçabilité des matières :</strong> Polyéthylène Haute Densité certifié sans adjonction de matière régénérée dégradante.</span>
              </li>
              <li className="showcase-point">
                <Check size={18} />
                <span><strong>Assistance au dimensionnement :</strong> Étude gratuite des volumes et des rotations pour les projets d’envergure.</span>
              </li>
              <li className="showcase-point">
                <Check size={18} />
                <span><strong>Support après-vente :</strong> Disponibilité des pièces détachées (roues, axes en acier galvanisé, couvercles, pédales).</span>
              </li>
            </ul>

            <div className="showcase-footer">
              <div>
                <div className="showcase-footer-label">Périmètre d'intervention</div>
                <div className="showcase-footer-value">Bénin &amp; Espace CEDEAO</div>
              </div>
              <a href="#contact" className="btn-showcase-contact">
                <span>Contacter la Direction</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
