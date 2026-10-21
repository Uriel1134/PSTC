'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { X, Trash2, Send, Printer, Building, User, Phone, Mail, MapPin, FileCheck, CheckCircle2, ShoppingCart, MessageCircle } from 'lucide-react';
import { Product } from '../data/products';
import { COMPANY_INFO } from '../data/company';

export interface QuoteItem {
  product: Product;
  quantity: number;
}

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuoteItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearQuote: () => void;
}

export default function QuoteDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearQuote,
}: QuoteDrawerProps) {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [ifuNumber, setIfuNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Cotonou');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Bloquer le scroll d'arrière-plan quand le drawer est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  // Calcul du nombre total d'articles
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);

  // Génération du texte pour transmission WhatsApp Business
  const handleSendWhatsApp = () => {
    if (items.length === 0) return;

    let message = `*DEMANDE DE DEVIS PROFORMA B2B - PSTC ECOBIN*\n`;
    message += `----------------------------------------\n`;
    message += `*Émetteur / Entreprise :* ${companyName || 'Non précisé'}\n`;
    message += `*Responsable :* ${contactName || 'Non précisé'}\n`;
    message += `*Téléphone :* ${phoneNumber || 'Non précisé'}\n`;
    message += `*Email :* ${email || 'Non précisé'}\n`;
    message += `*Ville / Pays :* ${city}\n`;
    if (ifuNumber) message += `*IFU / RCCM :* ${ifuNumber}\n`;
    message += `----------------------------------------\n`;
    message += `*ARTICLES SÉLECTIONNÉS :*\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}* (Réf: ${item.product.reference})\n`;
      message += `   • Quantité : ${item.quantity} unité(s)\n`;
      if (item.product.capacity) message += `   • Capacité : ${item.product.capacity}\n`;
      message += `   • Dimensions : ${item.product.dimensions}\n`;
    });

    message += `----------------------------------------\n`;
    if (notes) message += `*Remarques / Cahier des charges :* ${notes}\n\n`;
    message += `Merci de nous adresser une cotation proforma formelle avec délais de livraison et modalités de paiement.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encoded}`, '_blank');
    setIsSubmitted(true);
  };

  // Impression / Génération de la Proforma officielle
  const handlePrintProforma = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const dateStr = new Date().toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    const quoteRef = `PRO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const html = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="utf-8">
        <title>Demande de Devis Proforma - PSTC ECOBIN</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1E293B; margin: 40px; font-size: 13px; line-height: 1.5; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #004B93; padding-bottom: 20px; margin-bottom: 30px; }
          .logo-text { font-size: 24px; font-weight: bold; color: #004B93; }
          .logo-sub { font-size: 11px; color: #2B8A3E; font-weight: 600; text-transform: uppercase; }
          .company-info { text-align: right; font-size: 11px; color: #64748B; }
          .quote-title { font-size: 18px; font-weight: bold; color: #0F172A; margin-bottom: 15px; }
          .client-box { background: #F8FAFC; border: 1px solid #E2E8F0; padding: 15px; border-radius: 6px; margin-bottom: 25px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th { background: #004B93; color: #FFFFFF; text-align: left; padding: 10px; font-size: 11px; text-transform: uppercase; }
          td { border-bottom: 1px solid #E2E8F0; padding: 10px; }
          .footer { border-top: 1px solid #CBD5E1; padding-top: 15px; font-size: 10px; color: #64748B; text-align: center; margin-top: 40px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="logo-text">PSTC ECOBIN</div>
            <div class="logo-sub">${COMPANY_INFO.parentCompany} • ${COMPANY_INFO.parentCompanyFullName}</div>
            <div style="font-size: 10px; color: #64748B; margin-top: 4px;">${COMPANY_INFO.ifuNumber} • ${COMPANY_INFO.rccmNumber}</div>
          </div>
          <div class="company-info">
            <strong>Siège Commercial :</strong> ${COMPANY_INFO.address}<br>
            Tél : ${COMPANY_INFO.phoneCommercial} | ${COMPANY_INFO.phoneSupport}<br>
            Email : ${COMPANY_INFO.emailCommercial}<br>
            Web : www.pstc-ecobin.bj
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
          <div>
            <div class="quote-title">FICHE DE DEVIS PROFORMA (PROJET)</div>
            <div><strong>Réf. Cotation :</strong> ${quoteRef}</div>
            <div><strong>Date d'émission :</strong> ${dateStr}</div>
          </div>
          <div class="client-box" style="width: 320px;">
            <strong>DESTINATAIRE / CLIENT :</strong><br>
            <strong>Société :</strong> ${companyName || 'À préciser'}<br>
            <strong>Responsable :</strong> ${contactName || 'À préciser'}<br>
            <strong>Ville / Pays :</strong> ${city}<br>
            <strong>Téléphone :</strong> ${phoneNumber || 'À préciser'}<br>
            <strong>Email :</strong> ${email || 'À préciser'}<br>
            ${ifuNumber ? `<strong>IFU / RCCM :</strong> ${ifuNumber}` : ''}
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 15%;">Réf. Usine</th>
              <th style="width: 45%;">Désignation & Spécifications Techniques</th>
              <th style="width: 15%;">Matière / Norme</th>
              <th style="width: 15%; text-align: center;">Quantité</th>
              <th style="width: 10%; text-align: right;">Prix Unitaire</th>
            </tr>
          </thead>
          <tbody>
            ${items
              .map(
                (item) => `
              <tr>
                <td><strong>${item.product.reference}</strong></td>
                <td>
                  <strong>${item.product.name}</strong><br>
                  <span style="font-size: 11px; color: #64748B;">
                    ${item.product.capacity ? `Capacité: ${item.product.capacity} | ` : ''}
                    Dim: ${item.product.dimensions}
                  </span>
                </td>
                <td style="font-size: 11px;">${item.product.standard || 'Conforme CE'}</td>
                <td style="text-align: center; font-weight: bold;">${item.quantity}</td>
                <td style="text-align: right; color: #64748B;">Sur Devis</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>

        ${notes ? `<div style="margin-bottom: 25px;"><strong>Notes particulières :</strong> ${notes}</div>` : ''}

        <div style="background: #F8FAFC; border-left: 3px solid #004B93; padding: 12px; font-size: 11px; margin-bottom: 30px;">
          <strong>Conditions Générales de Fourniture :</strong><br>
          • Validité de l'offre : 30 jours à compter de la date d'émission.<br>
          • Livraison : Franco Cotonou ou expédition en zones régionales (Grand Nokoué, Parakou, Export Togo/Côte d'Ivoire).<br>
          • Conformité : Matériel garanti 100% PEHD vierge traité anti-UV certifié EN 840.
        </div>

        <div class="footer">
          PSTC SARL • Capital Social Enregistré • Siège Cotonou Bénin • Solutions Professionnelles d'Hygiène, Salubrité & EPI.
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return createPortal(
    <div
      className="drawer-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header Drawer */}
        <div className="drawer-header">
          <div>
            <h3 className="drawer-title">Votre Panier de Devis Proforma</h3>
            <span className="drawer-subtitle">
              {items.length} produit{items.length > 1 ? 's' : ''} ({totalUnits} unité{totalUnits > 1 ? 's' : ''})
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="drawer-close-btn"
            aria-label="Fermer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Corps Drawer */}
        <div className="drawer-body">
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--slate-500)' }}>
              <FileCheck size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--slate-800)', marginBottom: 8 }}>
                Votre sélection de catalogue est vide
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--slate-600)', marginBottom: 24, lineHeight: 1.6 }}>
                Le panier de cotation est réservé aux articles du <strong>Catalogue Officiel</strong>. Pour un projet de travaux BTP, réseaux, solaire ou négoce, contactez directement nos équipes sur WhatsApp.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360, margin: '0 auto' }}>
                <Link
                  href="/catalogue"
                  onClick={onClose}
                  className="btn btn-primary"
                  style={{ justifyContent: 'center', padding: '12px 18px', fontWeight: 700 }}
                >
                  <ShoppingCart size={17} />
                  <span>Consulter le Catalogue Produits</span>
                </Link>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Bonjour PSTC SARL, je souhaite demander des informations et un devis pour un projet.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-mobile-whatsapp-action"
                  style={{ justifyContent: 'center', padding: '12px 18px' }}
                >
                  <MessageCircle size={17} />
                  <span>Discuter sur WhatsApp Direct</span>
                </a>
              </div>
            </div>
          ) : (
            <>
              {/* Liste des Articles Sélectionnés */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--slate-800)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Articles sélectionnés ({items.length})
                  </span>
                  <button
                    onClick={onClearQuote}
                    style={{ fontSize: '0.78rem', color: 'var(--slate-500)', textDecoration: 'underline' }}
                  >
                    Tout vider
                  </button>
                </div>

                <div className="quote-items-list">
                  {items.map((item) => (
                    <div key={item.product.id} className="quote-item-row">
                      <div className="quote-item-details">
                        <div className="quote-item-name">{item.product.name}</div>
                        <div className="quote-item-ref">
                          Réf : {item.product.reference} {item.product.capacity && `• ${item.product.capacity}`}
                        </div>
                      </div>

                      <div className="quote-qty-control">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="qty-btn"
                          aria-label="Diminuer"
                        >
                          -
                        </button>
                        <span className="qty-val">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="qty-btn"
                          aria-label="Augmenter"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="btn-remove-item"
                        title="Supprimer cet article"
                        aria-label="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formulaire Destinataire B2B */}
              <div className="quote-form">
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--pstc-blue-900)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Coordonnées de l’Organisme Demandeur
                </span>

                <div className="form-group">
                  <label className="form-label">Raison Sociale / Entreprise / Institution *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: Hôtel Golden Tulip / Ministère du Cadre de Vie..."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nom du Responsable *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Ex: M. Jean Dossou"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Téléphone / WhatsApp *</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="Ex: +229 97 00 00 00"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Email professionnel *</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="contact@entreprise.bj"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Ville & Pays de livraison</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Cotonou, Bénin"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Numéro IFU / RCCM (Optionnel)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Identifiant fiscal unique"
                    value={ifuNumber}
                    onChange={(e) => setIfuNumber(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Précisions éventuelles ou Appel d’offres</label>
                  <textarea
                    rows={2}
                    className="form-input"
                    placeholder="Délais souhaités, personnalisation logo sur bacs, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>

              {/* Actions de Transmission */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="btn btn-secondary"
                  style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}
                >
                  <Send size={18} />
                  <span>Transmettre sur WhatsApp Commercial B2B</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrintProforma}
                  className="btn btn-outline"
                  style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}
                >
                  <Printer size={18} />
                  <span>Générer la Fiche Proforma (PDF / Impression)</span>
                </button>
              </div>

              {isSubmitted && (
                <div style={{ backgroundColor: 'var(--pstc-green-50)', padding: 12, borderRadius: 'var(--radius-md)', border: '1px solid var(--pstc-green-600)', color: 'var(--pstc-green-800)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircle2 size={18} />
                  <span>Votre demande a été préparée. Notre service commercial prendra attache sous 24h.</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
