'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Eye, Check, ArrowRight, Download, Filter } from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';
import { useQuote } from '../context/QuoteContext';

// 8 Références phares représentatives de la gamme PSTC ECOBIN
const FEATURED_IDS = [
  'poubelle-roulante-hdpe',     // Poubelle roulante 100L, 120L & 240L
  'poubelle-plastique-hdpe',    // Poubelle plastique 80L
  'conteneur-industriel-hdpe',  // Conteneur industriel 660L & 1100L
  'lh-stjt-60l',                // Poubelle de tri 60L
  'lh-jt-15l',                  // Poubelle Médicale DASRI 15L
  'lh-sac-pro',                 // Sac poubelle PE
  'epi-ja',                     // Gilet Haute Visibilité EPI
  'epi-casque-h01-bleu',        // Casque de Sécurité Chantier
];

const TABS = [
  { id: 'all', label: 'Toute la sélection (8)' },
  { id: 'bacs', label: 'Bacs Roulants 2 & 4 Roues' },
  { id: 'tri', label: 'Tri Sélectif & Propreté' },
  { id: 'medical', label: 'Santé & DASRI' },
  { id: 'epi', label: 'EPI & Sécurité' },
];

export default function FeaturedProductsSection() {
  const { quoteItems, addToQuote, setSelectedProduct } = useQuote();
  const [activeTab, setActiveTab] = useState<string>('all');

  const quoteItemIds = useMemo(() => quoteItems.map((item) => item.product.id), [quoteItems]);

  // Récupération des 8 produits phares
  const featuredProducts = useMemo(() => {
    const list = FEATURED_IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(
      (p): p is Product => p !== undefined
    );

    if (activeTab === 'all') return list;
    if (activeTab === 'bacs') {
      return list.filter((p) => p.category === 'bacs-2-roues' || p.category === 'conteneurs-4-roues');
    }
    if (activeTab === 'tri') {
      return list.filter((p) => p.category === 'tri-selectif' || p.category === 'interieur-bureau');
    }
    if (activeTab === 'medical') {
      return list.filter((p) => p.category === 'medical-dasri');
    }
    if (activeTab === 'epi') {
      return list.filter(
        (p) =>
          p.category === 'epi-vetements' ||
          p.category === 'epi-protection' ||
          p.category === 'signalisation-urgence'
      );
    }
    return list;
  }, [activeTab]);

  return (
    <section id="catalogue" className="section section-featured">
      <div className="container">
        {/* En-tête de la section */}
        <div className="section-header">
          <h2 className="section-title">
            Nos Matériels & Conteneurs les Plus Sollicités
          </h2>
          <p className="section-subtitle">
            Un aperçu représentatif de nos bacs roulants certifiés <strong>EN 840</strong>, bornes de tri sélectif et équipements de protection. Consultez l'ensemble de nos <strong>62 références</strong> sur notre catalogue complet dédié.
          </p>
        </div>

        {/* Filtres rapides par famille */}
        <div className="featured-tabs-wrapper">
          <div className="featured-tabs">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`featured-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grille des 8 Produits Phares */}
        <div className="products-grid featured-grid">
          {featuredProducts.map((product) => {
            const isInQuote = quoteItemIds.includes(product.id);

            return (
              <div key={product.id} className="product-card">
                {/* Visuel & Badges */}
                <div className="product-image-container">
                  <Image
                    src={product.image || '/images/bac-240l.jpg'}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    style={{ objectFit: 'contain', padding: 16 }}
                    loading="lazy"
                  />
                  <div className="product-ref-badge">{product.reference}</div>
                  {product.standard && (
                    <div className="product-norm-badge">{product.standard}</div>
                  )}
                  {product.availableSizes && (
                    <div style={{
                      position: 'absolute',
                      bottom: 8,
                      left: 8,
                      right: 8,
                      backgroundColor: 'rgba(43, 138, 62, 0.92)',
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '4px 8px',
                      borderRadius: 'var(--radius-sm)',
                      backdropFilter: 'blur(4px)',
                      textAlign: 'center',
                      letterSpacing: '0.01em',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      zIndex: 2,
                    }}>
                      Tailles : {product.availableSizes}
                    </div>
                  )}
                </div>

                {/* Corps de la Carte */}
                <div className="product-body">
                  <span className="product-category-label">{product.categoryLabel}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>

                  {/* Table des Spécifications synthétique */}
                  <div className="specs-table">
                    {product.availableSizes && (
                      <div className="spec-row" style={{ backgroundColor: 'rgba(43, 138, 62, 0.08)', borderRadius: 4, padding: '2px 6px', margin: '2px -6px' }}>
                        <span className="spec-name" style={{ color: 'var(--pstc-green-800)', fontWeight: 700 }}>Tailles dispo :</span>
                        <span className="spec-value" style={{ fontWeight: 800, color: 'var(--pstc-green-800)' }}>{product.availableSizes}</span>
                      </div>
                    )}
                    {product.capacity && (
                      <div className="spec-row">
                        <span className="spec-name">Capacité :</span>
                        <span className="spec-value">{product.capacity}</span>
                      </div>
                    )}
                    <div className="spec-row">
                      <span className="spec-name">Dimensions :</span>
                      <span className="spec-value">{product.dimensions}</span>
                    </div>
                    {product.material && (
                      <div className="spec-row">
                        <span className="spec-name">Matière :</span>
                        <span
                          className="spec-value"
                          style={{
                            maxWidth: '55%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {product.material}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Coloris */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="color-swatches">
                      <span className="color-swatches-label">Coloris :</span>
                      {product.colors.slice(0, 3).map((col, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '0.72rem',
                            backgroundColor: 'var(--slate-100)',
                            padding: '2px 6px',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--slate-700)',
                            fontWeight: 600,
                          }}
                        >
                          {col}
                        </span>
                      ))}
                      {product.colors.length > 3 && (
                        <span style={{ fontSize: '0.72rem', color: 'var(--slate-500)', fontWeight: 600 }}>
                          +{product.colors.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Boutons d'Action */}
                  <div className="product-footer">
                    <button
                      onClick={() => addToQuote(product, 1)}
                      className={`btn-add-quote ${isInQuote ? 'added' : ''}`}
                      title="Ajouter au devis proforma"
                    >
                      {isInQuote ? (
                        <>
                          <Check size={16} />
                          <span>Ajouté</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={16} />
                          <span>Ajouter au Devis</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="btn-view-details"
                      title="Voir la fiche technique complète"
                    >
                      <Eye size={16} style={{ display: 'inline', marginRight: 4 }} />
                      <span>Fiche</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bannière d'Appel vers le Catalogue Complet (62 Références) */}
        <div className="catalog-explore-banner">
          <div className="catalog-explore-content">
            <span className="catalog-explore-tag">GAMME COMPLÈTE PSTC ECOBIN</span>
            <h3 className="catalog-explore-title">
              Consultez l'ensemble de nos 62 références normalisées
            </h3>
            <p className="catalog-explore-desc">
              Bacs roulants de 30L à 1100L, conteneurs lourds de voirie, stations de tri sélectif, poubelles sanitaires, DASRI et équipements de protection individuelle (EPI). Recherche avancée et filtres par catégorie.
            </p>
          </div>

          <div className="catalog-explore-actions">
            <Link href="/catalogue" className="btn-explore-catalog-cta">
              <span>Voir tout le catalogue ({PRODUCTS.length} références)</span>
              <ArrowRight size={18} />
            </Link>

            <a
              href="/catalogue-pstc-ecobin.pdf"
              download="Catalogue_PSTC_ECOBIN_21_pages.pdf"
              className="btn-explore-catalog-pdf"
              title="Télécharger le catalogue officiel en PDF"
            >
              <Download size={16} />
              <span>Télécharger le PDF (21 p.)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
