'use client';

import React from 'react';
import {
  FileText,
  Package,
  GlassWater,
  Trash2,
  CheckCircle2,
  XCircle,
  MapPin,
  Sparkles,
  ShieldCheck,
  Check,
} from 'lucide-react';

export default function SortingGuideSection() {
  const streams = [
    {
      colorName: 'Bleu',
      title: 'Papiers & Cartons',
      codeHex: '#004B93',
      badgeBg: '#EBF3FA',
      icon: FileText,
      accepted: [
        'Documents bureautiques & archives',
        'Journaux, magazines et revues',
        'Cartons plats et ondulés pliés',
        'Chemises et intercalaires papier',
      ],
      forbidden: [
        'Papiers gras ou souillés',
        'Mouchoirs et essuie-mains usagés',
        'Gobelets plastifiés ou pelliculés',
      ],
      idealFor: 'Bureaux, administrations, salles de réunion et imprimeries',
    },
    {
      colorName: 'Jaune',
      title: 'Plastiques & Emballages',
      codeHex: '#D97706',
      badgeBg: '#FEF3C7',
      icon: Package,
      accepted: [
        'Bouteilles d’eau minérale et sodas',
        'Flacons et bidons PEHD détergents',
        'Canettes métalliques et conserves',
        'Films et suremballages plastiques propres',
      ],
      forbidden: [
        'Sacs plastique souillés de déchets organiques',
        'Barquettes en polystyrène sales',
        'Petits objets plastique composites',
      ],
      idealFor: 'Cafétérias, salles de pause, terrasses et cantines',
    },
    {
      colorName: 'Vert',
      title: 'Verre & Bocaux',
      codeHex: '#2B8A3E',
      badgeBg: '#E6F6EC',
      icon: GlassWater,
      accepted: [
        'Bouteilles de boisson en verre',
        'Pots, flacons et bocaux alimentaires',
        'Bouteilles d’huile et jus en verre',
      ],
      forbidden: [
        'Vaisselle brisée, faïence et porcelaine',
        'Miroirs, vitrages et pare-brises',
        'Ampoules, tubes néons et optiques',
      ],
      idealFor: 'Bars, restaurants, réceptions d’hôtels et cuisines collectives',
    },
    {
      colorName: 'Gris / Noir',
      title: 'Déchets Résiduels (Tout-Venant)',
      codeHex: '#334155',
      badgeBg: '#F1F5F9',
      icon: Trash2,
      accepted: [
        'Restes alimentaires non compostables',
        'Papiers et emballages souillés',
        'Poussières et résidus de balayage',
        'Déchets banals non recyclables',
      ],
      forbidden: [
        'Piles, accumulateurs et batteries',
        'Déchets de soins médicaux DASRI',
        'Produits chimiques, solvants et peintures',
      ],
      idealFor: 'Tous locaux en complément systématique des flux recyclables',
    },
  ];

  const deploymentRules = [
    {
      step: '01',
      title: 'Toujours regrouper en îlots',
      desc: 'Ne laissez jamais une poubelle isolée. L’association systématique de 2 à 4 flux réduit jusqu’à 70% les erreurs de tri.',
    },
    {
      step: '02',
      title: 'Signalétique visuelle claire',
      desc: 'Associez un code couleur net et un pictogramme compréhensible sur le couvercle pour un geste immédiat et sans hésitation.',
    },
    {
      step: '03',
      title: 'Emplacement stratégique',
      desc: 'Imposez les îlots aux points de génération majeurs : machines à café, sorties de cantine, halls d’entrée et couloirs de transit.',
    },
    {
      step: '04',
      title: 'Coordination avec le collecteur',
      desc: 'Assurez-vous que le circuit de collecte interne est synchronisé avec les horaires de ramassage de la société de salubrité.',
    },
  ];

  return (
    <section id="tri-selectif" className="section section-sorting-guide">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Charte & Code Couleurs du Tri Sélectif Professionnel
          </h2>
          <p className="section-subtitle">
            Directement issu des préconisations de notre catalogue officiel (page 18), ce code à 4 flux normalisés optimise la valorisation des déchets et renforce votre démarche RSE au Bénin.
          </p>
        </div>

        {/* Les 4 Flux de Tri Sélectif (Design Épuré & Zéro Émoji) */}
        <div className="sorting-streams-grid">
          {streams.map((stream, idx) => {
            const StreamIcon = stream.icon;

            return (
              <div key={idx} className="sorting-stream-card">
                {/* Ligne d'accentuation couleur en haut */}
                <div
                  className="stream-top-bar"
                  style={{ backgroundColor: stream.codeHex }}
                />

                <div className="stream-content">
                  {/* En-tête de carte avec icône vectorielle */}
                  <div className="stream-header-row">
                    <div
                      className="stream-icon-box"
                      style={{
                        backgroundColor: stream.badgeBg,
                        color: stream.codeHex,
                      }}
                    >
                      <StreamIcon size={22} />
                    </div>

                    <div className="stream-title-group">
                      <span
                        className="stream-badge"
                        style={{
                          color: stream.codeHex,
                          backgroundColor: stream.badgeBg,
                        }}
                      >
                        Flux {stream.colorName}
                      </span>
                      <h3 className="stream-title">{stream.title}</h3>
                    </div>
                  </div>

                  {/* Bloc Déchets Admis */}
                  <div className="stream-list-box accepted">
                    <div className="stream-list-header">
                      <CheckCircle2 size={15} className="list-icon-check" />
                      <span className="stream-list-label">Déchets Admis</span>
                    </div>
                    <ul className="stream-items">
                      {stream.accepted.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Bloc Déchets Proscrits */}
                  <div className="stream-list-box forbidden">
                    <div className="stream-list-header">
                      <XCircle size={15} className="list-icon-cross" />
                      <span className="stream-list-label">Déchets Proscrits</span>
                    </div>
                    <ul className="stream-items">
                      {stream.forbidden.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Zone de préconisation */}
                  <div className="stream-target-location">
                    <MapPin size={13} className="stream-location-icon" />
                    <span><strong>Recommandé :</strong> {stream.idealFor}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4 Règles d’implantation en entreprise & collectivités */}
        <div className="deployment-rules-wrapper">
          <div className="deployment-rules-intro">
            <h3 className="deployment-rules-title">
              Les 4 Bonnes Pratiques d’Implantation sur Site
            </h3>
            <p className="deployment-rules-desc">
              Pour garantir l’efficacité de votre politique de propreté et la conformité lors des audits environnementaux.
            </p>
          </div>

          <div className="deployment-rules-grid">
            {deploymentRules.map((rule, index) => (
              <div key={index} className="deployment-rule-card">
                <div className="rule-step-badge">{rule.step}</div>
                <h4 className="rule-title">{rule.title}</h4>
                <p className="rule-desc">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
