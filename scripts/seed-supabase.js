import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { PRODUCTS } from '../src/data/products.js'; // or read from JSON/ts

// Charger .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("Veuillez définir NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

async function seed() {
  console.log(`Démarrage de l'import de ${PRODUCTS.length} produits vers Supabase...`);
  
  const mapped = PRODUCTS.map((p) => ({
    id: p.id,
    reference: p.reference,
    supplier_ref: p.supplierRef || null,
    name: p.name,
    category: p.category,
    category_label: p.categoryLabel,
    capacity: p.capacity || null,
    available_sizes: p.availableSizes || null,
    dimensions: p.dimensions,
    material: p.material,
    weight: p.weight || null,
    moq: p.moq || null,
    indicative_price: p.indicativePrice || null,
    colors: p.colors || [],
    description: p.description,
    applications: p.applications || [],
    features: p.features || [],
    standard: p.standard || null,
    image: p.image,
  }));

  const { error } = await supabase.from('products').upsert(mapped, { onConflict: 'id' });
  if (error) {
    console.error("Erreur lors de l'insertion dans Supabase :", error);
  } else {
    console.log(`Succès ! Les ${mapped.length} produits ont été synchronisés dans Supabase.`);
  }
}

seed();

