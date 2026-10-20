'use client';

import React from 'react';
import { Building2, ShieldAlert, Hotel, Factory, Briefcase, ArrowRight } from 'lucide-react';
import { SECTORS } from '../data/company';

interface SectorsSectionProps {
  onQuickFilter: (keyword: string) => void;
}

export default function SectorsSection({ onQuickFilter }: SectorsSectionProps) {
  const getSectorIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 size={24} />;
      case 'ShieldAlert':
        return <ShieldAlert size={24} />;
      case 'Hotel':
        return <Hotel size={24} />;
      case 'Factory':
        return <Factory size={24} />;
      case 'Briefcase':
        return <Briefcase size={24} />;
      default:
        return <Building2 size={24} />;
    }
  };

  return (
    <section id="secteurs" className="section section-bg-light">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Des Réponses Adaptées aux Contraintes de Chaque Secteur
          </h2>
          <p className="section-subtitle">
            Chaque activité génère des flux de déchets et des risques spécifiques. PSTC ECOBIN dimensionne des parcs cohérents, conformes aux exigences réglementaires et sanitaires.
          </p>
        </div>

        <div className="sectors-grid">
          {SECTORS.map((sector) => (
            <div key={sector.id} className="sector-card">
              <span className="sector-badge">{sector.badge}</span>
              <div className="sector-icon-box">{getSectorIcon(sector.icon)}</div>
              <h3 className="sector-title">{sector.title}</h3>
              <div className="sector-subtitle">{sector.subtitle}</div>
              <p className="sector-description">{sector.description}</p>

              <div className="sector-recommended">
                <div className="sector-rec-label">Équipements types préconisés :</div>
                <div className="sector-chips">
                  {sector.productsRecommended.map((ref) => (
                    <button
                      key={ref}
                      onClick={() => {
                        onQuickFilter(ref);
                        const el = document.getElementById('catalogue');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="sector-chip"
                      title={`Rechercher la référence ${ref}`}
                    >
                      <span>{ref}</span>
                      <ArrowRight size={10} style={{ display: 'inline', marginLeft: 4 }} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
