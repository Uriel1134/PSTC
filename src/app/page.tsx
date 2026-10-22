'use client';

import React from 'react';
import Header from '../components/Header';
import HeroPSTC from '../components/HeroPSTC';
import PSTCPolesSection from '../components/PSTCPolesSection';
import InstitutionalIntro from '../components/InstitutionalIntro';
import OrderProcessSection from '../components/OrderProcessSection';
import EcobinProductSection from '../components/EcobinProductSection';
import CustomerReviewsSection from '../components/CustomerReviewsSection';
import Footer from '../components/Footer';
import ProductModal from '../components/ProductModal';
import QuoteDrawer from '../components/QuoteDrawer';
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
    updateQuantity,
    removeItem,
    clearQuote,
  } = useQuote();

  return (
    <>
      {/* Barre de navigation et En-tête officiel PSTC SARL */}
      <Header activeNav="home" />

      {/* Portail Mono-page Institutionnel PSTC SARL */}
      <main>
        {/* Grand Hero avec Docked Cards des 4 Pôles Métiers */}
        <HeroPSTC onOpenQuoteDrawer={openQuoteDrawer} />

        {/* Présentation d'ECOBINE : Marque & Gamme de Produits Phares de PSTC SARL */}
        <EcobinProductSection onOpenQuoteDrawer={openQuoteDrawer} />

        {/* À Propos de PSTC SARL : Synthétique, Aéré & Rigueur Fiscale/Technique */}
        <InstitutionalIntro onOpenQuoteDrawer={openQuoteDrawer} />

        {/* Section Clé : Les 4 Pôles Métiers - Carrousel Sobre & Minimaliste */}
        <PSTCPolesSection onOpenQuoteDrawer={openQuoteDrawer} />

        {/* Processus de Cotation et Commande B2B PSTC SARL en 4 Étapes */}
        <OrderProcessSection onOpenQuoteDrawer={openQuoteDrawer} />

        {/* Avis & Retours d'Expérience Clients Avant le Footer */}
        <CustomerReviewsSection />
      </main>

      {/* Pied de Page Institutionnel PSTC SARL */}
      <Footer />

      {/* Modal Fiche Technique Produit (si ouvert) */}
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
