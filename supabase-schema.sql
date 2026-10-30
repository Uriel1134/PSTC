-- =============================================================================
-- PSTC SARL - SCHEMA SUPABASE POUR GESTION DU CATALOGUE
-- À coller et exécuter dans le "SQL Editor" de votre console Supabase
-- =============================================================================

-- 1. Table des produits
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  reference TEXT NOT NULL,
  supplier_ref TEXT,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  category_label TEXT NOT NULL,
  capacity TEXT,
  available_sizes TEXT,
  dimensions TEXT,
  material TEXT,
  weight TEXT,
  moq TEXT,
  indicative_price TEXT,
  colors JSONB DEFAULT '[]'::jsonb,
  description TEXT,
  applications JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  standard TEXT,
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour accélérer les recherches et filtres
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_reference ON public.products(reference);

-- Activer Row Level Security (RLS) pour une sécurité maximale
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Politique 1 : Tout le monde peut LIRE les produits (catalogue public)
DROP POLICY IF EXISTS "Lecture publique des produits" ON public.products;
CREATE POLICY "Lecture publique des produits"
  ON public.products
  FOR SELECT
  USING (true);

-- Politique 2 : Seuls les administrateurs connectés peuvent ÉCRIRE / MODIFIER / SUPPRIMER
DROP POLICY IF EXISTS "Gestion admin des produits" ON public.products;
CREATE POLICY "Gestion admin des produits"
  ON public.products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 2. Création du bucket de stockage d'images de produits
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Politique de stockage : tout le monde peut voir les images publiques
DROP POLICY IF EXISTS "Images publiques des produits" ON storage.objects;
CREATE POLICY "Images publiques des produits"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'product-images');

-- Politique de stockage : seuls les admins connectés peuvent téléverser des images
DROP POLICY IF EXISTS "Upload admin des images" ON storage.objects;
CREATE POLICY "Upload admin des images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Suppression admin des images" ON storage.objects;
CREATE POLICY "Suppression admin des images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'product-images');

