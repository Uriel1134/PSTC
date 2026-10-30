'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronRight,
  FileCheck,
  Building2,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductModal from '../../components/ProductModal';
import QuoteDrawer from '../../components/QuoteDrawer';
import { useQuote } from '../../context/QuoteContext';
import { COMPANY_INFO } from '../../data/company';

export default function ContactPage() {
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

  const [formState, setFormState] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    pole: 'techniques',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <>
      <Header activeNav="contact" />

      <main className="contact-page-main">
        {/* Hero Contact */}
        <section className="service-page-hero">
          <div className="container">
            <nav className="breadcrumb-nav">
              <Link href="/">Accueil</Link>
              <ChevronRight size={14} />
              <span className="current">Contact &amp; Devis</span>
            </nav>

            <div className="service-hero-content">
              <h1 className="service-hero-title">
                Parlons de Vos Projets &amp; Besoins
              </h1>
              <p className="service-hero-lead">
                Une question technique, un appel d’offres, une demande de cotation ou une commande groupée ? Nos équipes vous répondent sous 24h ouvrées.
              </p>
            </div>
          </div>
        </section>

        {/* Section Formulaire + Coordonnées */}
        <section className="section contact-section-body">
          <div className="container">
            <div className="contact-grid-main">
              {/* Formulaire de Contact */}
              <div className="contact-form-card">
                <h2 className="contact-form-title">Envoyez-nous un Message Direct</h2>
                <p className="contact-form-sub">
                  Remplissez ce formulaire et notre chargé d'affaires correspondant à votre pôle prendra contact avec vous.
                </p>

                {isSubmitted ? (
                  <div className="contact-success-box">
                    <CheckCircle2 size={36} className="success-icon" />
                    <h3>Message Transmis avec Succès !</h3>
                    <p>
                      Merci pour votre sollicitation. Notre service commercial examine votre demande et vous répondra sous 24 heures à l'adresse <strong>{formState.email}</strong> ou au <strong>{formState.phone}</strong>.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormState({
                          fullName: '',
                          company: '',
                          email: '',
                          phone: '',
                          pole: 'techniques',
                          message: '',
                        });
                      }}
                      className="btn-card-quote"
                      style={{ marginTop: 16 }}
                    >
                      <span>Envoyer un nouveau message</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form-fields">
                    <div className="form-row-2">
                      <div className="form-field-group">
                        <label htmlFor="fullName">Nom &amp; Prénoms *</label>
                        <input
                          id="fullName"
                          type="text"
                          required
                          placeholder="Ex: Paul MENSAH"
                          value={formState.fullName}
                          onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                        />
                      </div>
                      <div className="form-field-group">
                        <label htmlFor="company">Société / Institution</label>
                        <input
                          id="company"
                          type="text"
                          placeholder="Ex: Entreprise XYZ ou Ministère"
                          value={formState.company}
                          onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="form-field-group">
                        <label htmlFor="email">Courriel Professionnel *</label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="contact@entreprise.com"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        />
                      </div>
                      <div className="form-field-group">
                        <label htmlFor="phone">Numéro de Téléphone *</label>
                        <input
                          id="phone"
                          type="tel"
                          required
                          placeholder="+229 XX XX XX XX"
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="pole">Pôle d’Activité Concerné *</label>
                      <select
                        id="pole"
                        value={formState.pole}
                        onChange={(e) => setFormState({ ...formState, pole: e.target.value })}
                      >
                        <option value="techniques">Pôle 01 : Prestations Techniques</option>
                        <option value="commerciales">Pôle 02 : Solutions Commerciales</option>
                        <option value="fournitures">Pôle 03 : Fournitures &amp; Consommables</option>
                        <option value="environnement">Pôle 04 : Gestion Environnementale</option>
                        <option value="autre">Autre demande générale</option>
                      </select>
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="message">Description de Votre Besoin / Projet *</label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        placeholder="Précisez votre demande, les quantités estimatives, les lieux d'intervention ou les délais souhaités..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      />
                    </div>

                    <button type="submit" className="btn-contact-submit">
                      <Send size={16} />
                      <span>Transmettre ma Demande</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Colonne Coordonnées Officielles */}
              <div className="contact-info-cards-col">
                <div className="contact-detail-card">
                  <div className="detail-card-icon">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4>Siège Administratif &amp; Commercial</h4>
                    <p>{COMPANY_INFO.address}</p>
                    <span className="contact-subdetail">Cotonou, République du Bénin</span>
                  </div>
                </div>

                <div className="contact-detail-card">
                  <div className="detail-card-icon">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4>Commandes &amp; Ligne Commerciale</h4>
                    <a href={`tel:${COMPANY_INFO.phoneCommercial}`} className="contact-link-bold">
                      {COMPANY_INFO.phoneCommercial}
                    </a>
                    <span className="contact-subdetail">Disponible pour vos urgences chantiers</span>
                  </div>
                </div>

                <div className="contact-detail-card">
                  <div className="detail-card-icon">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4>Courriel Officiel</h4>
                    <a href={`mailto:${COMPANY_INFO.emailCommercial}`} className="contact-link-bold">
                      {COMPANY_INFO.emailCommercial}
                    </a>
                    <span className="contact-subdetail">Envoi de cahiers des charges et BPU</span>
                  </div>
                </div>

                <div className="contact-detail-card">
                  <div className="detail-card-icon">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h4>Horaires d'Ouverture</h4>
                    <p>{COMPANY_INFO.workingHours}</p>
                    <span className="contact-subdetail">Permanence téléphonique assurée</span>
                  </div>
                </div>

                {/* Bloc WhatsApp Direct & Devis */}
                <div className="contact-proforma-cta-box">
                  <MessageCircle size={28} className="cta-box-icon" style={{ color: '#25D366' }} />
                  <h4>Échanger en Direct sur WhatsApp</h4>
                  <p>
                    Besoin d'un chiffrage rapide ou d'un renseignement technique ? Notre direction commerciale vous répond en continu.
                  </p>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Bonjour PSTC SARL, je souhaite demander des informations et un devis rapide.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-proforma-drawer-trigger"
                    style={{ backgroundColor: '#25D366', color: '#FFFFFF', justifyContent: 'center', textDecoration: 'none' }}
                  >
                    <MessageCircle size={16} />
                    <span>Démarrer une Discussion WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

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
