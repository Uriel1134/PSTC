'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  ShoppingCart,
  Eye,
  Check,
  X,
  Filter,
  ArrowUpDown,
  Phone,
  FileCheck,
  ShieldCheck,
  Download,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductModal from '../../components/ProductModal';
import QuoteDrawer from '../../components/QuoteDrawer';
import { PRODUCTS, CATEGORIES, Product } from '../../data/products';
import { COMPANY_INFO } from '../../data/company';
import { useQuote } from '../../context/QuoteContext';

export default function CataloguePage() {
  const {
    quoteItems,
    addToQuote,
    isQuoteDrawerOpen,
    openQuoteDrawer,
    closeQuoteDrawer,
    selectedProduct,
    setSelectedProduct,
    updateQuantity,
    removeItem,
    clearQuote,
  } = useQuote();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStandard, setSelectedStandard] = useState<string>('all');
  const [selectedVolume, setSelectedVolume] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category') || params.get('cat');
      const search = params.get('search') || params.get('q');
      if (cat) {
        setSelectedCategory(cat);
      }
      if (search) {
        setSearchQuery(search);
      }
    }
  }, []);

  const quoteItemIds = useMemo(() => quoteItems.map((item) => item.product.id), [quoteItems]);

  // Extraire les litrages numériques pour le tri
  const getCapacityNumber = (cap?: string): number => {
    if (!cap) return 0;
    const match = cap.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  // Filtrage combiné (catégorie + recherche + norme + volume)
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Catégorie
      const matchCategory =
        selectedCategory === 'all' ||
        product.category === selectedCategory ||
        (selectedCategory === 'epi' &&
          (product.category === 'epi-protection' || product.category === 'epi-vetements'));

      // 2. Recherche textuelle
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.reference.toLowerCase().includes(q) ||
        (product.supplierRef && product.supplierRef.toLowerCase().includes(q)) ||
        product.categoryLabel.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.material.toLowerCase().includes(q) ||
        product.applications.some((app) => app.toLowerCase().includes(q));

      // 3. Norme
      let matchStandard = true;
      if (selectedStandard === 'en-840') {
        matchStandard = !!product.standard && product.standard.includes('EN 840');
      } else if (selectedStandard === 'dasri') {
        matchStandard =
          product.category === 'medical-dasri' ||
          (!!product.standard && product.standard.toLowerCase().includes('dasri'));
      } else if (selectedStandard === 'ce') {
        matchStandard = !!product.standard && product.standard.includes('CE');
      }

      // 4. Volume / Capacité
      let matchVolume = true;
      const volNum = getCapacityNumber(product.capacity);
      if (selectedVolume === 'small') {
        matchVolume = volNum > 0 && volNum <= 100;
      } else if (selectedVolume === 'standard') {
        matchVolume = volNum >= 120 && volNum <= 360;
      } else if (selectedVolume === 'large') {
        matchVolume = volNum >= 660;
      }

      return matchCategory && matchQuery && matchStandard && matchVolume;
    });
  }, [selectedCategory, searchQuery, selectedStandard, selectedVolume]);

  // Tri des produits filtrés
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'ref-asc') {
      list.sort((a, b) => a.reference.localeCompare(b.reference));
    } else if (sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'capacity-asc') {
      list.sort((a, b) => getCapacityNumber(a.capacity) - getCapacityNumber(b.capacity));
    } else if (sortBy === 'capacity-desc') {
      list.sort((a, b) => getCapacityNumber(b.capacity) - getCapacityNumber(a.capacity));
    }
    return list;
  }, [filteredProducts, sortBy]);

  // Vérifier si des filtres personnalisés sont actifs
  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery.trim() !== '' ||
    selectedStandard !== 'all' ||
    selectedVolume !== 'all';

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedStandard('all');
    setSelectedVolume('all');
    setSortBy('default');
  };

  const activeCategoryObject =
    selectedCategory === 'epi'
      ? {
          id: 'epi',
          label: 'Équipements de Protection Individuelle (EPI)',
          count: PRODUCTS.filter((p) => p.category === 'epi-protection' || p.category === 'epi-vetements').length,
        }
      : CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <>
      <Header activeNav="catalogue" />

      <main className="catalog-page-main">
        {/* En-tête / Bannière du Catalogue */}
        <section className="catalog-hero-banner">
          <div className="container">
            {/* Fil d'Ariane */}
            <div className="catalog-breadcrumbs">
              <Link href="/" className="breadcrumb-link">Accueil</Link>
              <ChevronRight size={14} className="breadcrumb-sep" />
              <span className="breadcrumb-current">Catalogue Professionnel</span>
            </div>

            <div className="catalog-hero-grid">
              <div>
                <h1 className="catalog-hero-title">
                  Catalogue Officiel des Équipements de Salubrité & Tri Sélectif
                </h1>
                <p className="catalog-hero-subtitle">
                  Consultez nos <strong>{PRODUCTS.length} références professionnelles</strong> : bacs roulants 2 et 4 roues (30L à 1100L), bennes multibennes et ampliroll, bornes de tri sélectif, fûts DASRI sécurisés, matériels de nettoyage et équipements de protection individuelle (EPI). Ajoutez directement les articles pour constituer votre devis proforma officiel.
                </p>
              </div>

              <div className="catalog-hero-cta-box">
                <div className="catalog-hero-stat">
                  <span className="stat-number">{PRODUCTS.length}</span>
                  <span className="stat-text">Références en stock ou sur commande</span>
                </div>
                <div className="catalog-hero-buttons">
                  <a
                    href="/catalogue-pstc-ecobin.pdf"
                    download="Catalogue_PSTC_ECOBIN_21_pages.pdf"
                    className="btn btn-hero-pdf"
                    title="Télécharger la version papier officielle 21 pages"
                  >
                    <Download size={15} />
                    <span>Catalogue PDF (21 p.)</span>
                  </a>
                  <button onClick={openQuoteDrawer} className="btn btn-hero-quote">
                    <ShoppingCart size={15} />
                    <span>Voir mon devis</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Principale avec Sidebar à Gauche */}
        <section className="section catalog-content-section">
          <div className="container">
            <div className="catalog-layout">
              {/* ========================================================
                  SIDEBAR À GAUCHE (Catégories, Filtres & Recherche)
                  ======================================================== */}
              <aside className={`catalog-sidebar ${isMobileFiltersOpen ? 'mobile-open' : ''}`}>
                <div className="sidebar-inner">
                  {/* Titre Mobile avec bouton fermer */}
                  <div className="sidebar-mobile-header">
                    <h3>Filtres & Catégories</h3>
                    <button
                      onClick={() => setIsMobileFiltersOpen(false)}
                      className="sidebar-close-btn"
                      aria-label="Fermer les filtres"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* 1. Recherche par mot-clé */}
                  <div className="sidebar-widget">
                    <label className="sidebar-widget-title" htmlFor="sidebar-search">
                      Rechercher
                    </label>
                    <div className="sidebar-search-box">
                      <Search size={16} className="sidebar-search-icon" />
                      <input
                        id="sidebar-search"
                        type="text"
                        className="sidebar-search-input"
                        placeholder="Réf, litrage, matière..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="sidebar-search-clear"
                          title="Effacer la recherche"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 2. Menu des Catégories (À GAUCHE) */}
                  <div className="sidebar-widget">
                    <div className="sidebar-widget-header">
                      <h3 className="sidebar-widget-title">Catégories de Produits</h3>
                    </div>
                    <ul className="sidebar-category-list">
                      {CATEGORIES.map((cat) => {
                        const isActive = selectedCategory === cat.id;
                        const catProductCount =
                          cat.id === 'all'
                            ? PRODUCTS.length
                            : PRODUCTS.filter((p) => p.category === cat.id).length;
                        return (
                          <li key={cat.id}>
                            <button
                              className={`sidebar-cat-btn ${isActive ? 'active' : ''}`}
                              onClick={() => {
                                setSelectedCategory(cat.id);
                                setIsMobileFiltersOpen(false);
                              }}
                            >
                              <span className="cat-label">{cat.label}</span>
                              <span className="cat-count">{catProductCount}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* 3. Filtre par Norme / Certification */}
                  <div className="sidebar-widget">
                    <h3 className="sidebar-widget-title">Normes & Spécifications</h3>
                    <div className="sidebar-filter-options">
                      <label className="sidebar-filter-radio">
                        <input
                          type="radio"
                          name="filter-standard"
                          checked={selectedStandard === 'all'}
                          onChange={() => setSelectedStandard('all')}
                        />
                        <span>Toutes les normes</span>
                      </label>
                      <label className="sidebar-filter-radio">
                        <input
                          type="radio"
                          name="filter-standard"
                          checked={selectedStandard === 'en-840'}
                          onChange={() => setSelectedStandard('en-840')}
                        />
                        <span>Certifié EN 840 (Voirie)</span>
                      </label>
                      <label className="sidebar-filter-radio">
                        <input
                          type="radio"
                          name="filter-standard"
                          checked={selectedStandard === 'dasri'}
                          onChange={() => setSelectedStandard('dasri')}
                        />
                        <span>DASRI / Médical Hygiène</span>
                      </label>
                      <label className="sidebar-filter-radio">
                        <input
                          type="radio"
                          name="filter-standard"
                          checked={selectedStandard === 'ce'}
                          onChange={() => setSelectedStandard('ce')}
                        />
                        <span>Marquage CE / EPI</span>
                      </label>
                    </div>
                  </div>

                  {/* 4. Filtre par Litrage */}
                  <div className="sidebar-widget">
                    <h3 className="sidebar-widget-title">Litrage & Volume</h3>
                    <div className="sidebar-filter-options">
                      <label className="sidebar-filter-radio">
                        <input
                          type="radio"
                          name="filter-volume"
                          checked={selectedVolume === 'all'}
                          onChange={() => setSelectedVolume('all')}
                        />
                        <span>Tous les volumes</span>
                      </label>
                      <label className="sidebar-filter-radio">
                        <input
                          type="radio"
                          name="filter-volume"
                          checked={selectedVolume === 'small'}
                          onChange={() => setSelectedVolume('small')}
                        />
                        <span>Petits volumes (≤ 100 Litres)</span>
                      </label>
                      <label className="sidebar-filter-radio">
                        <input
                          type="radio"
                          name="filter-volume"
                          checked={selectedVolume === 'standard'}
                          onChange={() => setSelectedVolume('standard')}
                        />
                        <span>Standards 2 roues (120L à 360L)</span>
                      </label>
                      <label className="sidebar-filter-radio">
                        <input
                          type="radio"
                          name="filter-volume"
                          checked={selectedVolume === 'large'}
                          onChange={() => setSelectedVolume('large')}
                        />
                        <span>Grands conteneurs 4 roues (660L - 1100L)</span>
                      </label>
                    </div>
                  </div>

                  {/* 5. Bouton Réinitialiser */}
                  {hasActiveFilters && (
                    <button onClick={resetAllFilters} className="sidebar-reset-btn">
                      <X size={15} />
                      <span>Réinitialiser tous les filtres</span>
                    </button>
                  )}

                  {/* 6. Encart d'Assistance Devis B2B */}
                  <div className="sidebar-help-card">
                    <div className="help-icon-wrapper">
                      <Phone size={18} />
                    </div>
                    <h4 className="help-title">Besoin d'un devis sur-mesure ?</h4>
                    <p className="help-desc">
                      Notre équipe commerciale étudie vos bordereaux de prix et appels d'offres sous 2h.
                    </p>
                    <a
                      href={`tel:${COMPANY_INFO.phoneCommercial}`}
                      className="help-contact-btn"
                    >
                      {COMPANY_INFO.phoneCommercial}
                    </a>
                  </div>
                </div>
              </aside>

              {/* Arrière-plan sombre sur mobile quand les filtres sont ouverts */}
              {isMobileFiltersOpen && (
                <div
                  className="sidebar-backdrop"
                  onClick={() => setIsMobileFiltersOpen(false)}
                />
              )}

              {/* ========================================================
                  CONTENU PRINCIPAL (Grille des Produits Filtrés)
                  ======================================================== */}
              <div className="catalog-main-content">
                {/* Barre Supérieure des Résultats */}
                <div className="catalog-toolbar">
                  <div className="toolbar-left">
                    <h2 className="toolbar-category-title">
                      {activeCategoryObject?.label || 'Tous les produits'}
                    </h2>
                    <span className="toolbar-counter">
                      <strong>{sortedProducts.length}</strong> référence{sortedProducts.length > 1 ? 's' : ''} trouvée{sortedProducts.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="toolbar-right">
                    {/* Bouton Filtres sur Mobile */}
                    <button
                      onClick={() => setIsMobileFiltersOpen(true)}
                      className="btn-mobile-filters"
                    >
                      <Filter size={16} />
                      <span>Filtres</span>
                      {hasActiveFilters && <span className="filter-active-dot" />}
                    </button>

                    {/* Sélecteur de Tri */}
                    <div className="sort-wrapper">
                      <ArrowUpDown size={15} className="sort-icon" />
                      <select
                        className="sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        aria-label="Trier les résultats"
                      >
                        <option value="default">Tri : Pertinence</option>
                        <option value="capacity-asc">Litrage : Croissant</option>
                        <option value="capacity-desc">Litrage : Décroissant</option>
                        <option value="ref-asc">Référence (A-Z)</option>
                        <option value="name-asc">Nom du produit (A-Z)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Badges des Filtres Actifs */}
                {hasActiveFilters && (
                  <div className="active-filters-bar">
                    <span className="active-filters-label">Filtres actifs :</span>
                    {selectedCategory !== 'all' && (
                      <span className="active-filter-tag">
                        Catégorie : {activeCategoryObject?.label}
                        <button
                          onClick={() => setSelectedCategory('all')}
                          title="Supprimer le filtre catégorie"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    )}
                    {searchQuery.trim() !== '' && (
                      <span className="active-filter-tag">
                        Recherche : « {searchQuery} »
                        <button onClick={() => setSearchQuery('')} title="Supprimer la recherche">
                          <X size={12} />
                        </button>
                      </span>
                    )}
                    {selectedStandard !== 'all' && (
                      <span className="active-filter-tag">
                        Norme : {selectedStandard.toUpperCase()}
                        <button
                          onClick={() => setSelectedStandard('all')}
                          title="Supprimer le filtre norme"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    )}
                    {selectedVolume !== 'all' && (
                      <span className="active-filter-tag">
                        Volume : {selectedVolume}
                        <button
                          onClick={() => setSelectedVolume('all')}
                          title="Supprimer le filtre volume"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    )}
                    <button onClick={resetAllFilters} className="clear-all-link">
                      Tout effacer
                    </button>
                  </div>
                )}

                {/* Grille des Produits */}
                {sortedProducts.length === 0 ? (
                  <div className="catalog-empty-state">
                    <div className="empty-icon-box">
                      <Search size={32} />
                    </div>
                    <h3 className="empty-title">Aucune référence ne correspond à votre sélection</h3>
                    <p className="empty-desc">
                      Essayez de modifier votre mot-clé de recherche ou de réinitialiser vos critères de filtrage pour afficher les produits disponibles.
                    </p>
                    <button onClick={resetAllFilters} className="btn btn-primary">
                      Réinitialiser le catalogue
                    </button>
                  </div>
                ) : (
                  <div className="products-grid catalog-products-grid">
                    {sortedProducts.map((product) => {
                      const isInQuote = quoteItemIds.includes(product.id);

                      return (
                        <div key={product.id} className="product-card">
                          {/* Image & Badges */}
                          <div className="product-image-container">
                            <Image
                              src={product.image || '/images/bac-240l.jpg'}
                              alt={product.name}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              style={{ objectFit: 'contain', padding: 16 }}
                              loading="lazy"
                            />
                            <div className="product-ref-badge">{product.reference}</div>
                            {product.availableSizes && (
                              <div style={{ position: 'absolute', bottom: 10, left: 10, backgroundColor: 'rgba(15, 23, 42, 0.88)', color: '#ffffff', fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: 4, backdropFilter: 'blur(4px)', display: 'inline-flex', alignItems: 'center', gap: 4, zIndex: 2 }}>
                                <span>Tailles :</span>
                                <span style={{ color: '#86EFAC' }}>{product.availableSizes}</span>
                              </div>
                            )}
                            {product.standard && (
                              <div className="product-norm-badge">{product.standard}</div>
                            )}
                          </div>

                          {/* Corps de la Carte */}
                          <div className="product-body">
                            <span className="product-category-label">{product.categoryLabel}</span>
                            <h3 className="product-name">{product.name}</h3>
                            {product.supplierRef && (
                              <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', marginTop: -2, marginBottom: 8, fontWeight: 500 }}>
                                Réf. fournisseur : {product.supplierRef}
                              </div>
                            )}
                            <p className="product-description">{product.description}</p>

                            {/* Spécifications Techniques */}
                            <div className="specs-table">
                              {product.availableSizes ? (
                                <div className="spec-row" style={{ backgroundColor: 'var(--pstc-green-50)', padding: '4px 8px', borderRadius: 4 }}>
                                  <span className="spec-name" style={{ color: 'var(--pstc-green-800)', fontWeight: 700 }}>Tailles disponibles :</span>
                                  <span className="spec-value" style={{ color: 'var(--pstc-green-800)', fontWeight: 800 }}>{product.availableSizes}</span>
                                </div>
                              ) : product.capacity ? (
                                <div className="spec-row">
                                  <span className="spec-name">Capacité :</span>
                                  <span className="spec-value">{product.capacity}</span>
                                </div>
                              ) : null}
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
                              {product.moq && (
                                <div className="spec-row">
                                  <span className="spec-name">Conditionnement :</span>
                                  <span className="spec-value" style={{ color: 'var(--pstc-blue-700)' }}>
                                    {product.moq}
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
                                  <span
                                    style={{
                                      fontSize: '0.72rem',
                                      color: 'var(--slate-500)',
                                      fontWeight: 600,
                                    }}
                                  >
                                    +{product.colors.length - 3}
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Actions */}
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
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal Fiche Technique */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToQuote={addToQuote}
        isAlreadyInQuote={
          selectedProduct
            ? quoteItems.some((item) => item.product.id === selectedProduct.id)
            : false
        }
      />

      {/* Tiroir de Devis Proforma */}
      <QuoteDrawer
        isOpen={isQuoteDrawerOpen}
        onClose={closeQuoteDrawer}
        items={quoteItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearQuote={clearQuote}
      />
    </>
  );
}
