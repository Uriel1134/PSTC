'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, Check, ShoppingCart, ShieldCheck, Ruler, Scale, Box, Tag } from 'lucide-react';
import { Product } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToQuote: (product: Product, quantity: number) => void;
  isAlreadyInQuote: boolean;
}

export default function ProductModal({
  product,
  onClose,
  onAddToQuote,
  isAlreadyInQuote,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  if (!product || !mounted) return null;

  const handleAdd = () => {
    onAddToQuote(product, quantity);
    onClose();
  };

  return createPortal(
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="product-category-label">{product.categoryLabel}</span>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--slate-900)' }}>
              {product.name}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginTop: 4 }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--pstc-blue-700)', fontWeight: 700 }}>
                Réf. : {product.reference}
              </span>
              {product.supplierRef && (
                <span style={{ fontSize: '0.82rem', color: 'var(--slate-500)', fontWeight: 500 }}>
                  • Réf. fournisseur : {product.supplierRef}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Fermer la fiche produit"
          >
            <X size={22} />
          </button>
        </div>

        <div className="modal-body">
          <div className="product-modal-top-grid">
            {/* Visuel du Produit */}
            <div className="product-modal-image-col">
              <Image
                src={product.image || '/images/bac-240l.jpg'}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                style={{ objectFit: 'contain', padding: 16 }}
              />
              {product.availableSizes && (
                <div style={{
                  position: 'absolute',
                  bottom: 12,
                  left: 12,
                  backgroundColor: 'rgba(43, 138, 62, 0.92)',
                  color: '#ffffff',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '999px',
                  backdropFilter: 'blur(4px)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4
                }}>
                  Tailles : {product.availableSizes}
                </div>
              )}
            </div>

            {/* Fiche Technique Détaillée */}
            <div className="product-modal-info-col">
              <p className="product-modal-desc">
                {product.description}
              </p>

              <div className="specs-table" style={{ marginBottom: 18 }}>
                {product.availableSizes && (
                  <div className="spec-row" style={{ backgroundColor: 'rgba(43, 138, 62, 0.08)', borderRadius: 6, padding: '6px 8px' }}>
                    <span className="spec-name" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--pstc-green-800)', fontWeight: 700 }}>
                      <Box size={14} /> Tailles disponibles
                    </span>
                    <span className="spec-value" style={{ fontWeight: 800, color: 'var(--pstc-green-800)' }}>{product.availableSizes}</span>
                  </div>
                )}
                {product.capacity && (
                  <div className="spec-row">
                    <span className="spec-name" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <Box size={14} /> Capacité nominale
                    </span>
                    <span className="spec-value">{product.capacity}</span>
                  </div>
                )}
                <div className="spec-row">
                  <span className="spec-name" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <Ruler size={14} /> Dimensions (L × l × H)
                  </span>
                  <span className="spec-value">{product.dimensions}</span>
                </div>
                {product.weight && (
                  <div className="spec-row">
                    <span className="spec-name" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <Scale size={14} /> Poids unitaire
                    </span>
                    <span className="spec-value">{product.weight}</span>
                  </div>
                )}
                <div className="spec-row">
                  <span className="spec-name" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <Tag size={14} /> Matière première
                  </span>
                  <span className="spec-value" style={{ maxWidth: '60%' }}>{product.material}</span>
                </div>
                {product.moq && (
                  <div className="spec-row">
                    <span className="spec-name">Conditionnement B2B</span>
                    <span className="spec-value" style={{ color: 'var(--pstc-blue-700)' }}>{product.moq}</span>
                  </div>
                )}
                {product.indicativePrice && (
                  <div className="spec-row">
                    <span className="spec-name">Cotation indicative usine</span>
                    <span className="spec-value" style={{ fontWeight: 800, color: 'var(--slate-900)' }}>{product.indicativePrice}</span>
                  </div>
                )}
              </div>

              {/* Coloris Disponibles */}
              <div style={{ marginBottom: 18 }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--slate-600)', display: 'block', marginBottom: 6 }}>
                  Coloris disponibles en stock :
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {product.colors.map((c, i) => (
                    <span key={i} style={{ backgroundColor: 'var(--slate-100)', color: 'var(--slate-800)', fontSize: '0.78rem', fontWeight: 600, padding: '4px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--slate-200)' }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Caractéristiques et Applications */}
          <div className="product-modal-features-grid">
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--slate-900)', textTransform: 'uppercase', marginBottom: 10 }}>
                Points Forts &amp; Équipements
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {product.features.map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.85rem', color: 'var(--slate-700)' }}>
                    <Check size={16} style={{ color: 'var(--pstc-green-700)', flexShrink: 0, marginTop: 2 }} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--slate-900)', textTransform: 'uppercase', marginBottom: 10 }}>
                Domaines d’Application
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {product.applications.map((app, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.85rem', color: 'var(--slate-700)' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--pstc-blue-700)', marginTop: 8, flexShrink: 0 }} />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action d'ajout au devis */}
          <div className="product-modal-footer">
            <div className="product-modal-qty-wrap">
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--slate-700)' }}>
                Quantité souhaitée :
              </span>
              <div className="quote-qty-control" style={{ border: '1.5px solid var(--slate-300)' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-btn"
                  aria-label="Diminuer la quantité"
                >
                  -
                </button>
                <span className="qty-val">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="qty-btn"
                  aria-label="Augmenter la quantité"
                >
                  +
                </button>
              </div>
            </div>

            <div className="product-modal-actions-wrap">
              <button onClick={onClose} className="btn btn-outline btn-sm">
                Fermer
              </button>
              <button onClick={handleAdd} className="btn btn-primary product-modal-btn-add">
                <ShoppingCart size={18} />
                <span>{isAlreadyInQuote ? 'Actualiser le Devis' : 'Insérer dans le Devis Proforma'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
