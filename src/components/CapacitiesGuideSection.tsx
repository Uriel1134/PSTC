'use client';

import React from 'react';
import { Layers, PackageCheck, AlertCircle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CapacitiesGuideSection() {
  const capacitiesMatrix = [
    {
      binRange: '15 L à 20 L',
      bagRange: 'Sacs 20 L / 50 L',
      usage: 'Bureaux, chambres, blocs sanitaires et petites cuisines',
      frequency: 'Quotidienne',
      badge: 'Bureautique & Sanitaire',
      color: '#0284C7',
    },
    {
      binRange: '30 L à 50 L',
      bagRange: 'Sacs 50 L / 80 L',
      usage: 'Cuisines d’entreprises, commerces, restaurants et ménages',
      frequency: '1 à 2 fois par jour',
      badge: 'Restauration & Commerces',
      color: '#16A34A',
    },
    {
      binRange: '80 L à 100 L',
      bagRange: 'Sacs 80 L / 100 L',
      usage: 'Hôtels, établissements scolaires, cantines et espaces collectifs',
      frequency: '2 à 3 fois par semaine',
      badge: 'Collectivités & Hôtellerie',
      color: '#D97706',
    },
    {
      binRange: '120 L à 240 L',
      bagRange: 'Sacs 120 L / 240 L (Haute Résistance)',
      usage: 'Usage professionnel, voirie urbaine, grands sites et transit intensif',
      frequency: 'Rotation régulière par camions-bennes',
      badge: 'Voirie & Gros Volumes',
      color: '#DC2626',
    },
  ];

  const heavyContainers = [
    {
      capacity: '660 L',
      role: 'Collecte professionnelle & sites collectifs',
      details: '4 roues caoutchouc silencieuses, cuve PEHD monobloc nervurée, compatible bennes tasseuses.',
    },
    {
      capacity: '770 L',
      role: 'Marchés, grandes surfaces & zones commerciales',
      details: 'Volume intermédiaire optimisé pour les espaces à forte génération de cartons et déchets secs.',
    },
    {
      capacity: '1 100 L',
      role: 'Collectivités territoriales, industries & hôpitaux',
      details: 'Capacité maximale, tourillons de levage renforcés, couvercle amorti anti-pincement.',
    },
  ];

  return (
    <section id="guide-capacites" className="section section-capacities-guide">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Guide des Capacités & Choix des Sacs-Poubelle
          </h2>
          <p className="section-subtitle">
            Une matrice technique extraite de notre catalogue officiel pour adapter le litrage de vos bacs et le format de vos consommables aux flux réels de vos locaux.
          </p>
        </div>

        {/* Tableau / Cartes comparatives de litrage */}
        <div className="capacities-table-wrapper">
          <div className="capacities-grid">
            {capacitiesMatrix.map((item, idx) => (
              <div key={idx} className="capacity-card">
                <div className="capacity-card-header">
                  <span
                    className="capacity-badge"
                    style={{ borderColor: item.color, color: item.color }}
                  >
                    {item.badge}
                  </span>
                  <div className="capacity-bin-volume">{item.binRange}</div>
                </div>

                <div className="capacity-card-body">
                  <div className="capacity-bag-info">
                    <span className="capacity-bag-label">Format de sac préconisé :</span>
                    <strong className="capacity-bag-val">{item.bagRange}</strong>
                  </div>

                  <p className="capacity-usage-desc">{item.usage}</p>

                  <div className="capacity-meta">
                    <span className="capacity-freq">Fréquence indicative : {item.frequency}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bloc Grands Conteneurs sur Commande */}
        <div className="heavy-containers-box">
          <div className="heavy-containers-header">
            <h3 className="heavy-title">
              Grands Conteneurs 4 Roues sur Commande (660 L, 770 L, 1 100 L)
            </h3>
            <p className="heavy-subtitle">
              Pour les très grands volumes de déchets ménagers, industriels ou hospitaliers, PSTC ECOBIN fournit des conteneurs lourds certifiés EN 840 avec tourillons renforcés.
            </p>
          </div>

          <div className="heavy-grid">
            {heavyContainers.map((c, i) => (
              <div key={i} className="heavy-item">
                <div className="heavy-volume-tag">{c.capacity}</div>
                <h4 className="heavy-item-role">{c.role}</h4>
                <p className="heavy-item-desc">{c.details}</p>
              </div>
            ))}
          </div>

          <div className="heavy-footer-note">
            <CheckCircle2 size={18} style={{ color: 'var(--pstc-green-700)', flexShrink: 0 }} />
            <span>
              <strong>Personnalisation sur-mesure :</strong> Possibilité de marquage de votre logo d’entreprise ou armoiries municipales sur les cuves et couvercles, selon volumes de commande.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
