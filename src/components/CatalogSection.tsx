'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, ShoppingCart, Eye, Check } from 'lucide-react';
import { PRODUCTS, CATEGORIES, Product } from '../data/products';

interface CatalogSectionProps {
  onSelectProduct: (product: Product) => void;
  onAddToQuote: (product: Product, quantity: number) => void;
  quoteItemIds: string[];
}

export default function CatalogSection({
  onSelectProduct,
  onAddToQuote,
  quoteItemIds,
}: CatalogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filtrage combiné par catégorie et recherche mot-clé
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.reference.toLowerCase().includes(q) ||
        product.categoryLabel.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.material.toLowerCase().includes(q) ||
        product.applications.some((app) => app.toLowerCase().includes(q));

      return matchCategory && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="catalogue" className="section">
      <div className="container">
        {/* En-tête de la section Catalogue */}
        <div className="section-header">
          <h2 className="section-title">
            Notre Gamme Complète de Matériels & Équipements (50 Références)
          </h2>
          <p className="section-subtitle">
            Consultez les caractéristiques techniques détaillées, dimensions et normes de conformité. Ajoutez directement les articles souhaités pour constituer votre devis proforma officiel.
          </p>
        </div>

        {/* Barre de Recherche et Compteur */}
        <div className="catalog-header-bar">
          <div className="catalog-search-row">
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                className="search-input"
                placeholder="Rechercher par référence (ex: LH-HW-240D), litrage (ex: 660L), matière ou secteur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="catalog-counter">
              <strong>{filteredProducts.length}</strong> référence{filteredProducts.length > 1 ? 's' : ''} affichée{filteredProducts.length > 1 ? 's' : ''}
            </div>
          </div>

          {/* Onglets des Catégories */}
          <div className="category-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`category-tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span>{cat.label}</span>
                <span className="tab-badge">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grille des Produits */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-700)', marginBottom: 8 }}>
              Aucune référence ne correspond à votre recherche « {searchQuery} »
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--slate-500)', marginBottom: 16 }}>
              Essayez avec un mot-clé plus générique ou réinitialisez vos filtres.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="btn btn-primary btn-sm"
            >
              Réinitialiser le catalogue
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => {
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
                  </div>

                  {/* Corps de la Carte */}
                  <div className="product-body">
                    <span className="product-category-label">{product.categoryLabel}</span>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>

                    {/* Table des Spécifications */}
                    <div className="specs-table">
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
                      {product.weight && (
                        <div className="spec-row">
                          <span className="spec-name">Poids unitaire :</span>
                          <span className="spec-value">{product.weight}</span>
                        </div>
                      )}
                      <div className="spec-row">
                        <span className="spec-name">Matière :</span>
                        <span className="spec-value" style={{ maxWidth: '55%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {product.material}
                        </span>
                      </div>
                      {product.moq && (
                        <div className="spec-row">
                          <span className="spec-name">Conditionnement :</span>
                          <span className="spec-value" style={{ color: 'var(--pstc-blue-700)' }}>
                            {product.moq}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Palette de Couleurs */}
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

                    {/* Boutons d'Action */}
                    <div className="product-footer">
                      <button
                        onClick={() => onAddToQuote(product, 1)}
                        className={`btn-add-quote ${isInQuote ? 'added' : ''}`}
                        title="Ajouter au devis proforma"
                      >
                        {isInQuote ? (
                          <>
                            <Check size={16} />
                            <span>Ajouté au Devis</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={16} />
                            <span>Ajouter au Devis</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => onSelectProduct(product)}
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
        )}
      </div>
    </section>
  );
}
