'use client';

import React, { useState, useMemo } from 'react';
import { ShoppingCart, Lightbulb, CheckCircle2 } from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';

interface SizingSimulatorProps {
  onAddMultipleToQuote: (items: { product: Product; quantity: number }[]) => void;
}

export default function SizingSimulator({ onAddMultipleToQuote }: SizingSimulatorProps) {
  const [facilityType, setFacilityType] = useState<'hotel' | 'hospital' | 'office' | 'school' | 'factory'>('office');
  const [occupancy, setOccupancy] = useState<number>(150);
  const [collectionFreq, setCollectionFreq] = useState<'daily' | 'thrice' | 'twice'>('thrice');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Calcul du volume et recommandations
  const calculation = useMemo(() => {
    let litersPerUnitPerDay = 2.5; // Base bureau
    let unitLabel = 'collaborateurs';

    switch (facilityType) {
      case 'hotel':
        litersPerUnitPerDay = 6.0; // 6L par chambre occupée / jour
        unitLabel = 'chambres / suites';
        break;
      case 'hospital':
        litersPerUnitPerDay = 8.5; // 8.5L par lit (incluant déchets médicaux)
        unitLabel = 'lits d’hospitalisation';
        break;
      case 'office':
        litersPerUnitPerDay = 3.0; // 3L par collaborateur
        unitLabel = 'postes de travail';
        break;
      case 'school':
        litersPerUnitPerDay = 1.5; // 1.5L par élève/étudiant
        unitLabel = 'élèves & enseignants';
        break;
      case 'factory':
        litersPerUnitPerDay = 7.0; // 7L par ouvrier/technicien
        unitLabel = 'opérateurs en poste';
        break;
    }

    const totalWeeklyLiters = Math.round(occupancy * litersPerUnitPerDay * 7);

    // Fréquence de collecte
    let rotationsPerWeek = 3;
    if (collectionFreq === 'daily') rotationsPerWeek = 6;
    if (collectionFreq === 'twice') rotationsPerWeek = 2;

    const volumePerRotation = Math.round(totalWeeklyLiters / rotationsPerWeek);

    // Détermination des équipements recommandés
    const recommendations: { productRef: string; name: string; qty: number; reason: string }[] = [];

    if (volumePerRotation >= 2000) {
      const num1100 = Math.ceil((volumePerRotation * 0.7) / 1100);
      recommendations.push({
        productRef: 'LH-HW-1100L',
        name: 'Grande Benne Roulante 1100L',
        qty: num1100,
        reason: 'Stockage centralisé et collecte mécanisée gros volume',
      });
      recommendations.push({
        productRef: 'LH-HW-240D',
        name: 'Bacs Roulants 240L Tri Sélectif',
        qty: 4,
        reason: 'Points d’apport volontaire et tri sélectif intermédiaire',
      });
    } else if (volumePerRotation >= 1000) {
      const num660 = Math.ceil((volumePerRotation * 0.7) / 660);
      recommendations.push({
        productRef: 'LH-HW-660A',
        name: 'Conteneurs 4 Roues 660L',
        qty: num660,
        reason: 'Collecte principale en local poubelle',
      });
      recommendations.push({
        productRef: 'LH-HW-120H',
        name: 'Bacs Roulants 120L',
        qty: 3,
        reason: 'Collecte par étage ou par aile de bâtiment',
      });
    } else {
      const num240 = Math.ceil(volumePerRotation / 240);
      recommendations.push({
        productRef: 'LH-HW-240D',
        name: 'Bacs Roulants Voirie 240L',
        qty: Math.max(2, num240),
        reason: 'Dimensionnement adapté au flux hebdomadaire',
      });
    }

    // Si hôpital / santé : ajout obligatoire de la filière DASRI
    if (facilityType === 'hospital') {
      recommendations.push({
        productRef: 'LH-JT-30L',
        name: 'Poubelles Médicales DASRI à Pédale 30L',
        qty: Math.max(4, Math.round(occupancy / 10)),
        reason: 'Conformité filière déchets infectieux et blocs',
      });
      recommendations.push({
        productRef: 'REF-SN01',
        name: 'Gants Nitrile Pur Haute Protection',
        qty: 20,
        reason: 'Protection du personnel soignant et d’hygiène',
      });
    } else {
      // Pour les autres : stations de tri intérieur
      recommendations.push({
        productRef: 'LH-XT-20P',
        name: 'Îlots de Tri Modulaire 3 Flux',
        qty: Math.max(2, Math.round(occupancy / 40)),
        reason: 'Tri bureautique (Papier / Plastique / Résiduel)',
      });
    }

    // Dotation sécurité agents d'entretien
    recommendations.push({
      productRef: 'REF-JA',
      name: 'Gilets Haute Visibilité Multi-Poches',
      qty: Math.max(2, Math.round(occupancy / 50)),
      reason: 'Sécurité de l’équipe de propreté lors des sorties de bacs',
    });

    return {
      totalWeeklyLiters,
      volumePerRotation,
      unitLabel,
      recommendations,
    };
  }, [facilityType, occupancy, collectionFreq]);

  // Ajouter tous les produits calculés au devis
  const handleAddAllToQuote = () => {
    const itemsToAdd: { product: Product; quantity: number }[] = [];

    calculation.recommendations.forEach((rec) => {
      const found = PRODUCTS.find((p) => p.reference === rec.productRef);
      if (found) {
        itemsToAdd.push({
          product: found,
          quantity: rec.qty,
        });
      }
    });

    if (itemsToAdd.length > 0) {
      onAddMultipleToQuote(itemsToAdd);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 4000);
    }
  };

  return (
    <section id="simulateur" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Simulateur de Dimensionnement de Salubrité
          </h2>
          <p className="section-subtitle">
            Estimez le litrage hebdomadaire généré par votre établissement et obtenez une préconisation technique immédiate pour votre dotation en conteneurs et équipements de protection.
          </p>
        </div>

        <div className="simulator-box">
          <div className="simulator-grid">
            {/* Formulaire de Paramétrage */}
            <div className="simulator-form-panel">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--pstc-blue-900)', marginBottom: 20 }}>
                1. Caractéristiques de votre Établissement
              </h3>

              <div className="sim-field">
                <label className="sim-label">Type d’infrastructure :</label>
                <select
                  value={facilityType}
                  onChange={(e) => setFacilityType(e.target.value as any)}
                  className="sim-select"
                >
                  <option value="office">Siège Social / Immeuble de Bureaux</option>
                  <option value="hotel">Hôtel / Résidence Hôtelière</option>
                  <option value="hospital">Hôpital / Clinique / Centre de Santé (DASRI)</option>
                  <option value="school">Université / Établissement Scolaire</option>
                  <option value="factory">Usine / Entrepôt / Plateforme Logistique</option>
                </select>
              </div>

              <div className="sim-field">
                <label className="sim-label">
                  Capacité / Effectif moyen ({calculation.unitLabel}) :
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <input
                    type="range"
                    min="20"
                    max="1000"
                    step="10"
                    value={occupancy}
                    onChange={(e) => setOccupancy(Number(e.target.value))}
                    style={{ flex: 1, accentColor: 'var(--pstc-blue-700)' }}
                  />
                  <input
                    type="number"
                    min="10"
                    max="5000"
                    value={occupancy}
                    onChange={(e) => setOccupancy(Math.max(1, Number(e.target.value)))}
                    className="sim-input"
                    style={{ width: '90px', textAlign: 'center' }}
                  />
                </div>
              </div>

              <div className="sim-field">
                <label className="sim-label">Fréquence de passage des bennes de salubrité :</label>
                <div className="sim-radio-group">
                  <button
                    type="button"
                    className={`sim-radio-btn ${collectionFreq === 'daily' ? 'selected' : ''}`}
                    onClick={() => setCollectionFreq('daily')}
                  >
                    Quotidienne (6-7j / 7)
                  </button>
                  <button
                    type="button"
                    className={`sim-radio-btn ${collectionFreq === 'thrice' ? 'selected' : ''}`}
                    onClick={() => setCollectionFreq('thrice')}
                  >
                    3 fois par semaine
                  </button>
                  <button
                    type="button"
                    className={`sim-radio-btn ${collectionFreq === 'twice' ? 'selected' : ''}`}
                    onClick={() => setCollectionFreq('twice')}
                    style={{ gridColumn: 'span 2' }}
                  >
                    2 fois par semaine (Collecte standard)
                  </button>
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--pstc-blue-50)', padding: 16, borderRadius: 'var(--radius-md)', border: '1px solid rgba(0,75,147,0.2)' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--pstc-blue-900)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Lightbulb size={18} style={{ color: 'var(--pstc-blue-700)', flexShrink: 0 }} />
                  <span><strong>Indice de calcul :</strong> Basé sur les ratios moyens constatés par les services de salubrité urbaine en milieu tropical urbain (densité moyenne 0,22 kg/L).</span>
                </p>
              </div>
            </div>

            {/* Résultats et Recommandation d'Équipements */}
            <div className="simulator-results-panel">
              <div className="results-header">
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--pstc-green-700)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  2. Préconisation Technique Optimale
                </span>
                <h3 className="results-title">Besoins Dimensionnés pour votre Site</h3>
              </div>

              <div className="results-volume-display">
                <div>
                  <div className="res-vol-value">{calculation.totalWeeklyLiters.toLocaleString()} L</div>
                  <div className="res-vol-label">Volume total estimé par semaine</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-800)' }}>
                    ~{calculation.volumePerRotation.toLocaleString()} L
                  </div>
                  <div className="res-vol-label">À absorber par rotation de collecte</div>
                </div>
              </div>

              <div className="rec-equipments-list">
                {calculation.recommendations.map((rec, idx) => (
                  <div key={idx} className="rec-equip-card">
                    <div className="rec-equip-info">
                      <div className="rec-equip-qty">×{rec.qty}</div>
                      <div>
                        <div className="rec-equip-name">{rec.name}</div>
                        <div className="rec-equip-detail">{rec.reason} (Réf : {rec.productRef})</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 'auto', paddingTop: 16 }}>
                <button
                  onClick={handleAddAllToQuote}
                  className="btn btn-simulator-add"
                  style={{ width: '100%', padding: '14px 20px', fontSize: '1rem' }}
                >
                  <ShoppingCart size={18} />
                  <span>
                    {addedSuccess
                      ? 'Recommandation transférée dans le devis !'
                      : 'Transférer ce dimensionnement dans mon devis proforma'}
                  </span>
                </button>
                {addedSuccess && (
                  <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--pstc-green-700)', fontSize: '0.85rem', fontWeight: 700, marginTop: 8 }}>
                    <CheckCircle2 size={16} />
                    <span>Les matériels recommandés ont été ajoutés à votre panier de devis officiel.</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
