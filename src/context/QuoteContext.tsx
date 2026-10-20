'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS } from '../data/products';

export interface QuoteItem {
  product: Product;
  quantity: number;
}

interface QuoteContextType {
  quoteItems: QuoteItem[];
  quoteCount: number;
  isQuoteDrawerOpen: boolean;
  openQuoteDrawer: () => void;
  closeQuoteDrawer: () => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  addToQuote: (product: Product, quantity?: number) => void;
  addMultipleToQuote: (items: { product: Product; quantity: number }[]) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearQuote: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

const STORAGE_KEY = 'pstc_quote_items';

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Charger les éléments depuis localStorage à l'initialisation
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Revalider avec les données produit à jour
          const validItems: QuoteItem[] = [];
          for (const item of parsed) {
            const product = PRODUCTS.find((p) => p.id === item.product?.id);
            if (product && typeof item.quantity === 'number') {
              validItems.push({ product, quantity: item.quantity });
            }
          }
          setQuoteItems(validItems);
        }
      }
    } catch {
      // Ignorer les erreurs de parsing
    }
    setIsHydrated(true);
  }, []);

  // Sauvegarder dans localStorage dès modification
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quoteItems));
    } catch {
      // Ignorer
    }
  }, [quoteItems, isHydrated]);

  const addToQuote = (product: Product, quantity: number = 1) => {
    setQuoteItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const addMultipleToQuote = (newItems: { product: Product; quantity: number }[]) => {
    setQuoteItems((prev) => {
      const updated = [...prev];
      newItems.forEach(({ product, quantity }) => {
        const existingIndex = updated.findIndex((item) => item.product.id === product.id);
        if (existingIndex > -1) {
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
        } else {
          updated.push({ product, quantity });
        }
      });
      return updated;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setQuoteItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearQuote = () => {
    setQuoteItems([]);
  };

  const quoteCount = quoteItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <QuoteContext.Provider
      value={{
        quoteItems,
        quoteCount,
        isQuoteDrawerOpen,
        openQuoteDrawer: () => setIsQuoteDrawerOpen(true),
        closeQuoteDrawer: () => setIsQuoteDrawerOpen(false),
        selectedProduct,
        setSelectedProduct,
        addToQuote,
        addMultipleToQuote,
        updateQuantity,
        removeItem,
        clearQuote,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
}
