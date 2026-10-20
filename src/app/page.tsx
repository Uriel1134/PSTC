'use client';

import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import InstitutionalIntro from '../components/InstitutionalIntro';
import EngagementsSection from '../components/EngagementsSection';
import FeaturedProductsSection from '../components/FeaturedProductsSection';
import DownloadCatalogueSection from '../components/DownloadCatalogueSection';
import SectorsSection from '../components/SectorsSection';
import CapacitiesGuideSection from '../components/CapacitiesGuideSection';
import SizingSimulator from '../components/SizingSimulator';
import SortingGuideSection from '../components/SortingGuideSection';
import ComplianceRSE from '../components/ComplianceRSE';
import OrderProcessSection from '../components/OrderProcessSection';
import Footer from '../components/Footer';
import ProductModal from '../components/ProductModal';
import QuoteDrawer from '../components/QuoteDrawer';
import { PRODUCTS } from '../data/products';
import { useQuote } from '../context/QuoteContext';

export default function Home() {
  const {
    quoteItems,
    isQuoteDrawerOpen,
    openQuoteDrawer,
    closeQuoteDrawer,
    selectedProduct,
    setSelectedProduct,
    addToQuote,
    addMultipleToQuote,
    updateQuantity,
    removeItem,
    clearQuote,
  } = useQuote();

  // Filtre rapide depuis les secteurs
  const handleQuickFilter = (keyword: string) => {
    const found = PRODUCTS.find((p) => p.reference === keyword);
    if (found) {
      setSelectedProduct(found);
    }
  };

  return (
    <>
      {/* Barre de navigation et En-tête officiel */}
      <Header />

      {/* Bannière d'Accueil & Positionnement */}
      <main>
        <Hero onOpenQuoteDrawer={openQuoteDrawer} />

        {/* Présentation du Groupe PSTC SARL et de la Marque */}
        <InstitutionalIntro />

        {/* 4 Engagements Fondateurs & Typologie de Clients Servis (Catalogue p. 2) */}
        <EngagementsSection />

        {/* Sélection d'Équipements Phares (Accueil Épuré) */}
        <FeaturedProductsSection />

        {/* Espace Téléchargement du Catalogue Officiel PDF 20 Pages */}
        <DownloadCatalogueSection />

        {/* Solutions Métiers par Secteur */}
        <SectorsSection onQuickFilter={handleQuickFilter} />

        {/* Guide Pratique : Capacités des Bacs & Choix des Sacs (Catalogue p. 4) */}
        <CapacitiesGuideSection />

        {/* Outil de Dimensionnement & Simulateur B2B */}
        <SizingSimulator onAddMultipleToQuote={addMultipleToQuote} />

        {/* Charte du Tri Sélectif : Les 4 Flux Normalisés (Catalogue p. 18) */}
        <SortingGuideSection />

        {/* Conformité, Normes EN-840 et Durabilité Tropicale */}
        <ComplianceRSE />

        {/* Processus de Commande B2B en 4 Étapes (Catalogue p. 19) */}
        <OrderProcessSection onOpenQuoteDrawer={openQuoteDrawer} />
      </main>

      {/* Pied de Page Institutionnel */}
      <Footer />

      {/* Modal Fiche Technique Produit */}
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

      {/* Tiroir de Cotation Proforma B2B */}
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
