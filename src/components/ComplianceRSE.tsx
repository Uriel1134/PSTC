'use client';

import React from 'react';
import { SunMedium, ShieldCheck, Waves, FileText, CheckCircle2, Recycle } from 'lucide-react';

export default function ComplianceRSE() {
  return (
    <section id="conformite" className="section section-bg-light">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Conception Robuste & Résistance Certifiée au Climat Tropical
          </h2>
          <p className="section-subtitle">
            Le littoral ouest-africain et les zones tropicales imposent des contraintes sévères : fort rayonnement UV, salinité atmosphérique marine et températures élevées. Nos équipements sont sélectionnés pour résister durablement.
          </p>
        </div>

        <div className="compliance-grid">
          {/* Carte 1 */}
          <div className="compliance-card">
            <div className="compliance-icon">
              <SunMedium size={24} />
            </div>
            <h3 className="compliance-title">Stabilisation UV & Résistance Thermique</h3>
            <p className="compliance-text">
              Nos bacs roulants et conteneurs sont formulés avec un absorbeur d’ultraviolets de grade industriel (UV-stabilizer). Les parois ne blanchissent pas, ne deviennent pas cassantes sous le soleil de plomb et supportent des variations de -30°C à +80°C.
            </p>
          </div>

          {/* Carte 2 */}
          <div className="compliance-card">
            <div className="compliance-icon">
              <Waves size={24} />
            </div>
            <h3 className="compliance-title">Protection Anticorrosion Saline Littorale</h3>
            <p className="compliance-text">
              Pour répondre à la salinité corrosive de l’air marin à Cotonou et sur la côte, tous les axes de roues, boulonneries et pièces métalliques sont en acier trempé électro-galvanisé à chaud, éliminant tout risque de rouille prématurée.
            </p>
          </div>

          {/* Carte 3 */}
          <div className="compliance-card">
            <div className="compliance-icon">
              <ShieldCheck size={24} />
            </div>
            <h3 className="compliance-title">Normalisation EN 840 (Collecte Mécanisée)</h3>
            <p className="compliance-text">
              Tous nos conteneurs 120L, 240L, 660L et 1100L sont testés selon la norme EN 840. Ils sont universellement compatibles avec les peignes et lève-conteneurs des bennes tasseuses des sociétés de salubrité urbaine au Bénin.
            </p>
          </div>

          {/* Carte 4 */}
          <div className="compliance-card">
            <div className="compliance-icon">
              <Recycle size={24} />
            </div>
            <h3 className="compliance-title">100% Recyclabilité & Économie Circulaire</h3>
            <p className="compliance-text">
              Conformément à nos engagements RSE, le Polyéthylène Haute Densité (PEHD) utilisé est intégralement recyclable en fin de cycle de vie pour fabriquer de nouvelles pièces techniques, sans rejet polluant dans les décharges.
            </p>
          </div>

          {/* Carte 5 */}
          <div className="compliance-card">
            <div className="compliance-icon">
              <FileText size={24} />
            </div>
            <h3 className="compliance-title">Protocoles DASRI Hospitaliers</h3>
            <p className="compliance-text">
              Notre gamme hospitalière répond aux exigences sanitaires strictes du Ministère de la Santé : étanchéité absolue aux liquides biologiques, manipulation 100% au pied sans contact digital et marquage universel Biohazard.
            </p>
          </div>

          {/* Carte 6 */}
          <div className="compliance-card">
            <div className="compliance-icon">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="compliance-title">Dossiers d’Appels d’Offres & Marchés</h3>
            <p className="compliance-text">
              PSTC SARL fournit pour chaque consultation un dossier technique exhaustif : certificats de conformité laboratoire, fiches de sécurité, déclarations de performance et bordereaux BPU prêts à l’analyse des commissions d’adjudication.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
