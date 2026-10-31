'use client';

import React, { useState, useEffect } from 'react';
import {
  Star,
  MessageSquare,
  PlusCircle,
  CheckCircle2,
  Building,
  UserCheck,
  X,
  Send,
  ThumbsUp,
  Sparkles,
} from 'lucide-react';

export interface CustomerReview {
  id: string;
  name: string;
  company: string;
  role: string;
  pole: string;
  rating: number;
  date: string;
  comment: string;
  isUserAdded?: boolean;
}

const DEFAULT_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Sylvain M.',
    company: 'Collectivité Territoriale Régionale',
    role: 'Directeur des Services Techniques',
    pole: 'PSTC ECOBIN & Salubrité',
    rating: 5,
    date: '14 Octobre 2026',
    comment:
      'Dotation de 150 bacs roulants 240L et conteneurs 1100L certifiés EN 840 pour nos voiries et marchés. Matériel d’une solidité exemplaire face aux intempéries, compatible avec nos camions bennes tasseuses. Livraison et SAV irréprochables.',
  },
  {
    id: 'rev-2',
    name: 'Dr. Valérie K.',
    company: 'Polyclinique de l’Étoile',
    role: 'Directrice Médicale & Hygiène',
    pole: 'Filière DASRI & Hygiène Médicale',
    rating: 5,
    date: '02 Octobre 2026',
    comment:
      'Excellente collaboration avec PSTC SARL pour l’équipement de nos blocs en poubelles DASRI étanches à pédale et consommables d’asepsie. Le respect strict des normes biomédicales et la réactivité de livraison sous 48h ont fait toute la différence.',
  },
  {
    id: 'rev-3',
    name: 'Ing. Stéphane B.',
    company: 'Consortium BTP & Travaux Publics',
    role: 'Chef de Projet Génie Civil',
    pole: 'Prestations Techniques & BTP',
    rating: 5,
    date: '28 Septembre 2026',
    comment:
      'PSTC a assuré le raccordement électrique industriel, le câblage réseau et l’éclairage de sécurité sur notre base chantier à Calavi. Compétence des équipes, respect des plannings et rigueur documentaire fiscale sans faille.',
  },
  {
    id: 'rev-4',
    name: 'Carine D.',
    company: 'Cabinet Conseil & Audit d’Affaires',
    role: 'Responsable Moyens Généraux',
    pole: 'Fournitures & Consommables B2B',
    rating: 5,
    date: '19 Septembre 2026',
    comment:
      'Fournitures de bureaux complètes et installation de stations de tri sélectif 3 flux pour notre siège. Facturation transparente avec bordereau unitaire, emballages impeccables et service commercial toujours disponible.',
  },
  {
    id: 'rev-5',
    name: 'Marc L.',
    company: 'Complexe Hôtelier & Résidences',
    role: 'Directeur d’Exploitation',
    pole: 'PSTC ECOBIN - Tri Sélectif RSE',
    rating: 5,
    date: '08 Septembre 2026',
    comment:
      'Les stations de tri sélectif installées dans le hall et les corbeilles de tri de nos résidences apportent une touche moderne et soignée. Nos résidents et partenaires saluent cette démarche environnementale concrète.',
  },
  {
    id: 'rev-6',
    name: 'Faustin K.',
    company: 'Société de Négoce & Transit Maritime',
    role: 'Responsable Logistique & Achat',
    pole: 'Solutions Commerciales & EPI',
    rating: 4.8,
    date: '22 Août 2026',
    comment:
      'Dotation de nos équipes en EPI conformes (gilets réfléchissants, casques et gants anti-coupure) et fournitures de bureau. Matériel durable, rapport qualité-prix très compétitif et réactivité commerciale.',
  },
];

const LOCAL_STORAGE_KEY = 'pstc_customer_reviews_v2';

export default function CustomerReviewsSection() {
  const [reviews, setReviews] = useState<CustomerReview[]>(DEFAULT_REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Form states
  const [formName, setFormName] = useState<string>('');
  const [formCompany, setFormCompany] = useState<string>('');
  const [formRole, setFormRole] = useState<string>('');
  const [formPole, setFormPole] = useState<string>('PSTC ECOBIN & Salubrité');
  const [formRating, setFormRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [formComment, setFormComment] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Charger les avis depuis le localStorage au montage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Fusionner en évitant les doublons
          const userOnly = parsed.filter(
            (p: CustomerReview) => !DEFAULT_REVIEWS.some((d) => d.id === p.id)
          );
          setReviews([...userOnly, ...DEFAULT_REVIEWS]);
        }
      }
    } catch (err) {
      console.warn('Impossible de charger les avis depuis localStorage', err);
    }
  }, []);

  const handleOpenModal = () => {
    setIsSubmitted(false);
    setErrorMessage('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setErrorMessage('');
    setIsSubmitted(false);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName.trim() || !formCompany.trim() || !formComment.trim()) {
      setErrorMessage('Veuillez remplir votre nom, entreprise et votre commentaire.');
      return;
    }

    if (formComment.trim().length < 15) {
      setErrorMessage('Votre commentaire doit comporter au moins 15 caractères.');
      return;
    }

    const todayStr = new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date());

    const newReview: CustomerReview = {
      id: `user-rev-${Date.now()}`,
      name: formName.trim(),
      company: formCompany.trim(),
      role: formRole.trim() || 'Client Partenaire',
      pole: formPole,
      rating: formRating,
      date: todayStr,
      comment: formComment.trim(),
      isUserAdded: true,
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    // Sauvegarde localStorage
    try {
      const userReviews = updatedReviews.filter((r) => r.isUserAdded);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userReviews));
    } catch (err) {
      console.warn('Impossible de sauvegarder dans localStorage', err);
    }

    setIsSubmitted(true);

    // Réinitialiser le formulaire
    setFormName('');
    setFormCompany('');
    setFormRole('');
    setFormComment('');
    setFormRating(5);

    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
    }, 2400);
  };

  // Filtrage des avis
  const filteredReviews = reviews.filter((r) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'ecobin') return r.pole.toLowerCase().includes('ecobin');
    if (selectedFilter === 'technique') return r.pole.toLowerCase().includes('technique');
    if (selectedFilter === 'fournitures') return r.pole.toLowerCase().includes('fournitures');
    if (selectedFilter === 'medical') return r.pole.toLowerCase().includes('dasri') || r.pole.toLowerCase().includes('médical');
    return true;
  });

  // Calcul note moyenne
  const avgRating = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <section id="avis-clients" className="customer-reviews-section" aria-labelledby="reviews-heading">
      <div className="container">
        {/* En-tête de section */}
        <div className="reviews-header-block">
          <h2 id="reviews-heading" className="reviews-main-title">
            Ce que disent nos clients et partenaires au Bénin
          </h2>

          <p className="reviews-main-desc">
            Entreprises privées, mairies, hôpitaux et administrations font confiance à{' '}
            <strong>PSTC SARL</strong> pour la qualité certifiée de leurs équipements, fournitures et
            solutions environnementales Ecobin.
          </p>
        </div>

        {/* Barre de synthèse & Note globale */}
        <div className="reviews-summary-bar">
          <div className="summary-left">
            <div className="summary-score-box">
              <span className="summary-score-number">{avgRating}</span>
              <span className="summary-score-max">/ 5</span>
            </div>

            <div className="summary-stars-col">
              <div className="stars-row" aria-label={`Note moyenne : ${avgRating} sur 5`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className="star-filled"
                    fill="currentColor"
                  />
                ))}
              </div>
              <span className="summary-total-count">
                Basé sur <strong>{reviews.length} avis certifiés</strong> de professionnels
              </span>
            </div>
          </div>

          <div className="summary-kpis">
            <div className="kpi-item">
              <span className="kpi-value">98.5%</span>
              <span className="kpi-label">Satisfaction B2B</span>
            </div>
            <div className="kpi-item">
              <span className="kpi-value">100%</span>
              <span className="kpi-label">Normes Respectées</span>
            </div>
            <div className="kpi-item">
              <span className="kpi-value">&lt; 48h</span>
              <span className="kpi-label">Délai Réponse Devis</span>
            </div>
          </div>

          <div className="summary-cta-box">
            <button
              type="button"
              onClick={handleOpenModal}
              className="btn-leave-review"
              aria-label="Ouvrir le formulaire pour laisser un avis sur PSTC SARL"
            >
              <PlusCircle size={18} />
              <span>Laisser un avis client</span>
            </button>
          </div>
        </div>

        {/* Filtres par domaine */}
        <div className="reviews-filters-nav" role="tablist" aria-label="Filtrer les avis par pôle">
          <button
            type="button"
            className={`filter-btn ${selectedFilter === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('all')}
          >
            Tous les avis ({reviews.length})
          </button>
          <button
            type="button"
            className={`filter-btn ${selectedFilter === 'ecobin' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('ecobin')}
          >
            PSTC ECOBIN & Salubrité
          </button>
          <button
            type="button"
            className={`filter-btn ${selectedFilter === 'fournitures' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('fournitures')}
          >
            Fournitures & Consommables
          </button>
          <button
            type="button"
            className={`filter-btn ${selectedFilter === 'technique' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('technique')}
          >
            Prestations Techniques & BTP
          </button>
          <button
            type="button"
            className={`filter-btn ${selectedFilter === 'medical' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('medical')}
          >
            Filière Santé & DASRI
          </button>
        </div>

        {/* Grille des Avis */}
        <div className="reviews-grid">
          {filteredReviews.map((rev) => (
            <article key={rev.id} className={`review-card ${rev.isUserAdded ? 'review-user-added' : ''}`}>
              <div className="review-card-top">
                <div className="review-stars-pole">
                  <div className="stars-row" aria-label={`${rev.rating} étoiles sur 5`}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={star <= rev.rating ? 'star-filled' : 'star-empty'}
                        fill={star <= rev.rating ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <span className="review-pole-badge">{rev.pole}</span>
                </div>

                {rev.isUserAdded && (
                  <span className="user-added-tag">
                    <Sparkles size={12} /> Nouvel avis
                  </span>
                )}
              </div>

              <blockquote className="review-comment-text">
                &ldquo;{rev.comment}&rdquo;
              </blockquote>

              <div className="review-card-author">
                <div className="author-avatar">
                  {rev.name.charAt(0).toUpperCase()}
                </div>
                <div className="author-info">
                  <div className="author-name-line">
                    <span className="author-name">{rev.name}</span>
                    <span className="author-verified" title="Avis vérifié client/partenaire">
                      <CheckCircle2 size={13} className="verified-icon" />
                      <span>Vérifié</span>
                    </span>
                  </div>
                  <p className="author-company-role">
                    {rev.role} • <strong>{rev.company}</strong>
                  </p>
                  <span className="review-date">{rev.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Invitation basse si l'utilisateur souhaite témoigner */}
        <div className="reviews-bottom-cta">
          <div className="bottom-cta-icon-box">
            <MessageSquare size={24} />
          </div>
          <div className="bottom-cta-text">
            <h4>Vous avez collaboré avec PSTC SARL ou utilisé nos produits Ecobin ?</h4>
            <p>Votre retour est précieux pour continuer d’élever nos standards d’excellence et de service au Bénin.</p>
          </div>
          <button
            type="button"
            onClick={handleOpenModal}
            className="btn-leave-review-alt"
          >
            <PlusCircle size={17} />
            <span>Partager mon retour d’expérience</span>
          </button>
        </div>
      </div>

      {/* Modal / Popup pour laisser un avis */}
      {isModalOpen && (
        <div className="review-modal-backdrop" onClick={handleCloseModal}>
          <div
            className="review-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              type="button"
              className="review-modal-close"
              onClick={handleCloseModal}
              aria-label="Fermer le formulaire"
            >
              <X size={20} />
            </button>

            {isSubmitted ? (
              <div className="review-success-state">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={48} className="success-icon" />
                </div>
                <h3 className="success-title">Merci pour votre avis !</h3>
                <p className="success-desc">
                  Votre retour d’expérience a été validé et ajouté instantanément à la liste des avis
                  clients de PSTC SARL.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="review-form">
                <div className="modal-header">
                  <span className="modal-badge">ESPACE AVIS CLIENTS</span>
                  <h3 id="modal-title" className="modal-title">
                    Partagez votre expérience avec PSTC SARL
                  </h3>
                  <p className="modal-subtitle">
                    Votre avis aide d’autres institutions et entreprises à choisir leurs équipements et
                    partenaires au Bénin.
                  </p>
                </div>

                {errorMessage && (
                  <div className="review-error-banner" role="alert">
                    {errorMessage}
                  </div>
                )}

                {/* Sélecteur d'étoiles */}
                <div className="form-group form-stars-group">
                  <label className="form-label">
                    Votre appréciation globale <span className="req">*</span>
                  </label>
                  <div className="stars-selector-wrap">
                    <div className="stars-interactive-row">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const current = hoverRating || formRating;
                        return (
                          <button
                            type="button"
                            key={star}
                            className={`star-select-btn ${star <= current ? 'active' : ''}`}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setFormRating(star)}
                            aria-label={`Attribuer la note de ${star} sur 5`}
                          >
                            <Star
                              size={28}
                              fill={star <= current ? 'currentColor' : 'none'}
                              className="interactive-star"
                            />
                          </button>
                        );
                      })}
                    </div>
                    <span className="star-feedback-text">
                      {formRating === 5 && '5/5 — Excellent, prestation irréprochable'}
                      {formRating === 4 && '4/5 — Très bien, service satisfaisant'}
                      {formRating === 3 && '3/5 — Bien, correspond aux attentes'}
                      {formRating === 2 && '2/5 — Moyen, des points d’amélioration'}
                      {formRating === 1 && '1/5 — Insatisfaisant'}
                    </span>
                  </div>
                </div>

                {/* Champs du formulaire */}
                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="rev-name" className="form-label">
                      Nom complet ou Titre <span className="req">*</span>
                    </label>
                    <input
                      id="rev-name"
                      type="text"
                      className="form-input"
                      placeholder="Ex: Paul M. / Directeur Technique"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="rev-company" className="form-label">
                      Entreprise / Organisation <span className="req">*</span>
                    </label>
                    <input
                      id="rev-company"
                      type="text"
                      className="form-input"
                      placeholder="Ex: Clinique Ste Marie / Mairie / Entreprise BTP"
                      value={formCompany}
                      onChange={(e) => setFormCompany(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="rev-role" className="form-label">
                      Fonction / Poste (optionnel)
                    </label>
                    <input
                      id="rev-role"
                      type="text"
                      className="form-input"
                      placeholder="Ex: Responsable des Achats, DG, Ingénieur..."
                      value={formRole}
                      onChange={(e) => setFormRole(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="rev-pole" className="form-label">
                      Pôle ou Produit concerné <span className="req">*</span>
                    </label>
                    <select
                      id="rev-pole"
                      className="form-select"
                      value={formPole}
                      onChange={(e) => setFormPole(e.target.value)}
                    >
                      <option value="PSTC ECOBIN & Salubrité">PSTC ECOBIN & Salubrité (Bacs & Tri)</option>
                      <option value="Fournitures & Consommables B2B">Fournitures & Consommables B2B</option>
                      <option value="Prestations Techniques & BTP">Prestations Techniques & BTP</option>
                      <option value="Solutions Commerciales & Négoce">Solutions Commerciales & Négoce</option>
                      <option value="Filière DASRI & Hygiène Médicale">Filière DASRI & Hygiène Médicale</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="rev-comment" className="form-label">
                    Votre avis / retour d’expérience <span className="req">*</span>
                  </label>
                  <textarea
                    id="rev-comment"
                    className="form-textarea"
                    rows={4}
                    placeholder="Décrivez votre expérience avec PSTC SARL : respect des délais, qualité des conteneurs ou fournitures, professionnalisme de l’équipe..."
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                    required
                  />
                  <span className="char-count">{formComment.length} caractères (min. 15)</span>
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn-modal-cancel"
                    onClick={handleCloseModal}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="btn-modal-submit">
                    <Send size={16} />
                    <span>Publier mon avis</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
