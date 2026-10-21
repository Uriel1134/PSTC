export interface PoleItem {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  iconName: string;
  bulletPoints: string[];
  tag?: string;
}

export interface PSTCPole {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  iconName: string;
  accentColor: string;
  overview: string;
  items: PoleItem[];
}

export const PSTC_POLES: PSTCPole[] = [
  {
    id: 'prestations-techniques',
    number: '01',
    title: 'Prestations Techniques',
    shortTitle: 'Technique & BTP',
    tagline: 'Génie civil, infrastructures réseaux, énergie solaire & sécurité électronique',
    iconName: 'Wrench',
    accentColor: '#004B93',
    overview:
      'Une équipe d’ingénieurs et techniciens qualifiés pour vos chantiers BTP, installations électriques, infrastructures informatiques et maintenance multitechnique au Bénin.',
    items: [
      {
        id: 'btp-travaux',
        title: 'Bâtiment, BTP & Travaux',
        subtitle: 'Génie civil & aménagement',
        image: '/images/btp-travaux.jpg',
        iconName: 'Building2',
        tag: 'Travaux & Chantiers',
        bulletPoints: [
          'Travaux BTP & génie civil',
          'Entretien et réfection de bâtiments',
          'Menuiserie bois et aluminium',
          'Travaux d’aménagement portuaire',
          'Forage et plomberie sanitaire',
          'Peintures industrielles et intérieures',
        ],
      },
      {
        id: 'informatique-reseaux',
        title: 'Informatique, Réseaux & Télécoms',
        subtitle: 'Infrastructures & connectivité',
        image: '/images/reseaux-telecoms.jpg',
        iconName: 'Network',
        tag: 'Haute Technologie',
        bulletPoints: [
          'Câblage structuré et baie de brassage',
          'Maintenance réseaux et téléphonie IP',
          'Maintenance informatique et électronique',
          'Matériels audiovisuels et télécommunications',
        ],
      },
      {
        id: 'energie-climatisation',
        title: 'Électricité, Énergie & Froid',
        subtitle: 'Solaire & génie climatique',
        image: '/images/energie-solaire.jpg',
        iconName: 'SunMedium',
        tag: 'Énergie Propre',
        bulletPoints: [
          'Fourniture et installation d’énergie solaire',
          'Systèmes photovoltaïques autonomes et hybrides',
          'Maintenance froid industriel et climatisation',
          'Réseaux électriques tertiaires et armoires',
        ],
      },
      {
        id: 'securite-surveillance',
        title: 'Sécurité & Vidéosurveillance',
        subtitle: 'Protection des sites & biens',
        image: '/images/image.png',
        iconName: 'ShieldAlert',
        tag: 'Protection 24/7',
        bulletPoints: [
          'Systèmes de contrôle d’accès biométrique et RFID',
          'Systèmes de sécurité incendie et alarmes',
          'Vidéosurveillance IP haute définition (CCTV)',
          'Télésurveillance et sécurisation de périmètres',
        ],
      },
      {
        id: 'entretien-maintenance',
        title: 'Entretien & Nettoyage Technique',
        subtitle: 'Hygiène des infrastructures',
        image: '/images/image copy 2.png',
        iconName: 'Sparkles',
        tag: 'Salubrité Tertiaire',
        bulletPoints: [
          'Entretien et nettoyage des bâtiments professionnels',
          'Aménagement et entretien d’espaces verts',
          'Fourniture de produits d’entretien homologués',
          'Protocoles d’hygiène pour sites tertiaires et ERP',
        ],
      },
      {
        id: 'impression-communication',
        title: 'Impression & Communication Visuelle',
        subtitle: 'Signalétique & supports officiels',
        image: '/images/image copy.png',
        iconName: 'Printer',
        tag: 'Identité & Édition',
        bulletPoints: [
          'Impression numérique et grand format',
          'Fabrication de cachets et tampons professionnels',
          'Sérigraphie sur textiles et supports rigides',
          'Signalétique institutionnelle et plaques',
        ],
      },
    ],
  },
  {
    id: 'solutions-commerciales',
    number: '02',
    title: 'Solutions Commerciales',
    shortTitle: 'Commerce & Négoce',
    tagline: 'Commerce automobile, négoce général et produits agroalimentaires',
    iconName: 'TrendingUp',
    accentColor: '#16A34A',
    overview:
      'Un pôle de négoce et distribution pour l’approvisionnement direct des entreprises et institutions en véhicules, biens marchands et denrées agroalimentaires certifiées.',
    items: [
      {
        id: 'commerce-auto',
        title: 'Commerce Automobile & Flottes',
        subtitle: 'Véhicules neufs & utilitaires',
        image: '/images/image copy 3.png',
        iconName: 'Truck',
        tag: 'Mobilité B2B',
        bulletPoints: [
          'Vente de véhicules utilitaires, berlines et 4x4',
          'Constitution et renouvellement de flottes d’entreprise',
          'Fourniture de pièces de rechange d’origine',
          'Conseil en gestion de parc automobile',
        ],
      },
      {
        id: 'commerce-general',
        title: 'Commerce Général & Import-Export',
        subtitle: 'Approvisionnement & négoce',
        image: '/images/commerce-general-logistique.jpg',
        iconName: 'Globe',
        tag: 'Distribution Globale',
        bulletPoints: [
          'Négoce national et sous-régional (Espace UEMOA)',
          'Sourcing international et formalités douanières',
          'Distribution de marchandises générales pour entreprises',
          'Livraison logistique et sécurisée sur site',
        ],
      },
      {
        id: 'commerce-agricole',
        title: 'Produits Agricoles & Agroalimentaires',
        subtitle: 'Filières vivrières & d’exportation',
        image: '/images/image copy 4.png',
        iconName: 'Wheat',
        tag: 'Agrobusiness',
        bulletPoints: [
          'Commerce de céréales et grains de qualité contrôlée',
          'Distribution de produits vivriers et maraîchers',
          'Valorisation et négoce de produits tropicaux',
          'Stockage sécurisé et respect des normes sanitaires',
        ],
      },
    ],
  },
  {
    id: 'fournitures-consommables',
    number: '03',
    title: 'Fournitures & Consommables',
    shortTitle: 'Fournitures B2B',
    tagline: 'Bureautique, informatique, mobilier, médical et équipements énergétiques',
    iconName: 'Boxes',
    accentColor: '#D97706',
    overview:
      'Partenaire unique pour la dotation intégrale de vos bureaux, centres hospitaliers, administrations et chantiers avec bordereaux de prix unitaires transparents.',
    items: [
      {
        id: 'fournitures-administratives',
        title: 'Fournitures Administratives & Scolaires',
        subtitle: 'Papeterie & classement',
        image: '/images/fournitures-mobilier.jpg',
        iconName: 'FileText',
        tag: 'Administration',
        bulletPoints: [
          'Papeterie professionnelle et ramettes certifiées',
          'Articles de classement, reliure et archivage',
          'Fournitures scolaires en gros pour collectivités',
          'Kits administratifs personnalisés',
        ],
      },
      {
        id: 'informatique-bureautique',
        title: 'Informatique & Bureautique',
        subtitle: 'Matériels & consommables',
        image: '/images/image copy 5.png',
        iconName: 'Laptop',
        tag: 'Parc Informatique',
        bulletPoints: [
          'Ordinateurs de bureau, portables et serveurs',
          'Imprimantes multifonctions, scanners et copieurs',
          'Toners, cartouches et consommables d’impression',
          'Accessoires informatiques et connectique',
        ],
      },
      {
        id: 'mobilier-bureau',
        title: 'Mobilier & Matériels de Bureau',
        subtitle: 'Ergonomie & aménagement',
        image: '/images/fournitures-mobilier.jpg',
        iconName: 'Armchair',
        tag: 'Espaces de Travail',
        bulletPoints: [
          'Fauteuils ergonomiques et sièges de direction',
          'Bureaux opérationnels, tables de réunion et cloisons',
          'Armoires métalliques, caissons et rayonnages',
          'Agencement complet d’espaces professionnels',
        ],
      },
      {
        id: 'equipements-medicaux',
        title: 'Équipements Médicaux & Cliniques',
        subtitle: 'Dispositifs biomédicaux',
        image: '/images/image copy 6.png',
        iconName: 'Stethoscope',
        tag: 'Santé & Hôpitaux',
        bulletPoints: [
          'Matériels de diagnostic et d’auscultation clinique',
          'Lits médicalisés, paravents et mobilier de soins',
          'Consommables médicaux stériles à usage unique',
          'Filière DASRI et protection du personnel soignant',
        ],
      },
      {
        id: 'audiovisuel-telecom',
        title: 'Équipements Audiovisuels & Télécoms',
        subtitle: 'Salles de réunion & conférences',
        image: '/images/reseaux-telecoms.jpg',
        iconName: 'Video',
        tag: 'Audiovisuel',
        bulletPoints: [
          'Vidéoprojecteurs, écrans interactifs et barres de visio',
          'Sonorisation de conférences et micros sans fil',
          'Centraux téléphoniques PABX / IPBX et combinés',
          'Câblage audio/vidéo haute fidélité',
        ],
      },
      {
        id: 'equipements-energetiques',
        title: 'Équipements Énergétiques',
        subtitle: 'Continuité de service électrique',
        image: '/images/energie-solaire.jpg',
        iconName: 'Zap',
        tag: 'Autonomie',
        bulletPoints: [
          'Groupes électrogènes industriels et insonorisés',
          'Onduleurs online haute capacité pour serveurs',
          'Régulateurs de tension automatiques',
          'Batteries solaires stationnaires et accessoires',
        ],
      },
    ],
  },
  {
    id: 'gestion-environnementale',
    number: '04',
    title: 'Solutions de Gestion Environnementale',
    shortTitle: 'Environnement',
    tagline: 'Hygiène, entretien des espaces verts, bacs de collecte et équipements de protection',
    iconName: 'Recycle',
    accentColor: '#059669',
    overview:
      'Prestations intégrées de salubrité, entretien des espaces verts, fourniture de produits d’entretien, conteneurs normalisés et équipements de protection pour entreprises et collectivités.',
    items: [
      {
        id: 'hygiene-entretien',
        title: 'Hygiène & Produits d’Entretien',
        subtitle: 'Produits & matériels de propreté',
        image: '/images/products/sacs-poubelle-noirs.png',
        iconName: 'Sparkles',
        tag: 'Salubrité Urbaine',
        bulletPoints: [
          'Fournitures de produits d’entretien homologués',
          'Matériels et équipements de gestion environnementale',
          'Sacs poubelle renforcés haute densité (50L à 240L)',
          'Chariots de ménage, raclettes et distributeurs sanitaires',
        ],
      },
      {
        id: 'entretien-espaces',
        title: 'Entretien & Gestion des Espaces',
        subtitle: 'Propreté extérieure & espaces verts',
        image: '/images/hero-urban.jpg',
        iconName: 'Sparkles',
        tag: 'Espaces & Paysage',
        bulletPoints: [
          'Nettoyage et entretien des espaces verts',
          'Aménagement paysager pour entreprises et résidences',
          'Tonte, désherbage et embellissement des extérieurs',
          'Entretien périodique de cours et parkings',
        ],
      },
      {
        id: 'bacs-conteneurs',
        title: 'Bacs Roulants & Conteneurs Voirie',
        subtitle: 'Conformité norme européenne EN 840',
        image: '/images/products/conteneur-4-roues-vert.png',
        iconName: 'Trash2',
        tag: 'Norme EN 840',
        bulletPoints: [
          'Bacs roulants 2 roues (30L, 50L, 120L, 240L, 360L)',
          'Grands conteneurs 4 roues (660L, 770L, 1100L)',
          '100% PEHD vierge haute densité traité anti-UV',
          'Prises DIN pour camions-bennes tasseuses',
        ],
      },
      {
        id: 'tri-selectif',
        title: 'Stations de Tri Sélectif',
        subtitle: 'Code 4 flux et valorisation RSE',
        image: '/images/products/tri-5-bacs.png',
        iconName: 'Layers',
        tag: 'Économie Circulaire',
        bulletPoints: [
          'Bornes de tri 3, 4 et 5 flux pour ERP et bureaux',
          'Coloris normalisés (Bleu, Jaune, Vert, Gris, Marron)',
          'Poubelles médicales DASRI à pédale (Biohazard)',
          'Accompagnement au dimensionnement de site',
        ],
      },
      {
        id: 'epi-securite',
        title: 'Équipements de Protection Individuelle (EPI)',
        subtitle: 'Sécurité du personnel sur le terrain',
        image: '/images/products/gilet-ja.png',
        iconName: 'HardHat',
        tag: 'Norme CE & EN',
        bulletPoints: [
          'Gilets haute visibilité fluo avec bandes réfléchissantes',
          'Casques de chantier ventilés et lunettes de sécurité',
          'Gants anti-coupure et gants nitrile étanches',
          'Chaussures de sécurité coquées S3 et tenues de pluie',
        ],
      },
    ],
  },
];
