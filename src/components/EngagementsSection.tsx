'use client';

import React from 'react';
import { Sparkles, Shield, DollarSign, MapPin, Building, HeartPulse, Utensils, GraduationCap, Factory, Users, Truck, Check } from 'lucide-react';

export default function EngagementsSection() {
  const commitments = [
    {
      title: 'Propreté',
      subtitle: 'Hygiène & Qualité de Vie',
      description:
        'Des solutions étudiées pour les usages quotidiens, assurant un niveau sanitaire irréprochable dans les espaces de vie et de travail.',
      icon: Sparkles,
      color: '#16A34A',
      bgColor: '#DCFCE7',
    },
    {
      title: 'Robustesse',
      subtitle: 'Durabilité Éprouvée',
      description:
        'Des produits rigoureusement sélectionnés en PEHD vierge et acier galvanisé pour résister aux contraintes domestiques et industrielles.',
      icon: Shield,
      color: '#0284C7',
      bgColor: '#E0F2FE',
    },
    {
      title: 'Accessibilité',
      subtitle: 'Compétitivité B2B',
      description:
        'Une politique tarifaire transparente pensée pour le marché local et sous-régional, avec une offre sur devis proforma rapide sous 24h.',
      icon: DollarSign,
      color: '#D97706',
      bgColor: '#FEF3C7',
    },
    {
      title: 'Proximité',
      subtitle: 'Implantation Locale',
      description:
        'Implantée à Cotonou (Dandji), PSTC ECOBIN garantit un stock disponible, un suivi commercial personnalisé et une livraison dans toute la sous-région.',
      icon: MapPin,
      color: '#4F46E5',
      bgColor: '#EEF2FF',
    },
  ];

  const clientTypes = [
    { label: 'Communes & Collectivités', icon: Building },
    { label: 'Hôpitaux & Centres de Santé', icon: HeartPulse },
    { label: 'Hôtels & Restaurants (HORECA)', icon: Utensils },
    { label: 'Écoles & Universités', icon: GraduationCap },
    { label: 'Entreprises & Bureaux', icon: Users },
    { label: 'Industries & Plateformes BTP', icon: Factory },
    { label: 'Sociétés de Nettoyage & Facility', icon: Check },
    { label: 'Grossistes & Revendeurs', icon: Truck },
  ];

  return (
    <section id="engagements" className="section section-engagements">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Quatre Engagements pour un Environnement Meilleur
          </h2>
          <p className="section-subtitle">
            Implantée à Cotonou, la marque PSTC ECOBIN associe équipements de collecte, consommables de nettoyage et protection des équipes avec des exigences strictes de fiabilité.
          </p>
        </div>

        {/* Grille des 4 Engagements */}
        <div className="engagements-grid">
          {commitments.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="engagement-card">
                <div
                  className="engagement-icon-wrapper"
                  style={{ backgroundColor: item.bgColor, color: item.color }}
                >
                  <Icon size={26} />
                </div>
                <h3 className="engagement-card-title">{item.title}</h3>
                <span className="engagement-card-sub">{item.subtitle}</span>
                <p className="engagement-card-text">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bandeau des Clients & Secteurs Servis */}
        <div className="clients-banner">
          <div className="clients-banner-header">
            <h3 className="clients-banner-title">
              Une Réponse Sur-Mesure Adaptée à Chaque Secteur d’Activité
            </h3>
            <p className="clients-banner-desc">
              Que vous soyez une administration publique, un complexe hôtelier, un hôpital ou un chantier industriel, nous composons la dotation technique conforme à vos flux de déchets réels.
            </p>
          </div>

          <div className="clients-chips-grid">
            {clientTypes.map((client, index) => {
              const ClientIcon = client.icon;
              return (
                <div key={index} className="client-chip-card">
                  <div className="client-chip-icon">
                    <ClientIcon size={18} />
                  </div>
                  <span className="client-chip-label">{client.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
