import React, { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Button } from '../../common/Button';
import { useAppSelector } from '../../../store/hooks';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const PDFExport: React.FC = () => {
  const cv = useAppSelector((s) => s.cv);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Trouver l'élément qui contient le CV (l'aperçu)
      const cvElement = document.querySelector('.cv-preview-content') as HTMLElement;
      
      if (!cvElement) {
        throw new Error('Élément CV non trouvé');
      }

      // Temporairement retirer le scale pour la capture
      const originalTransform = cvElement.style.transform;
      cvElement.style.transform = 'scale(1)';

      // Attendre un peu pour que le DOM se stabilise
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Create an isolated iframe, inject the cloned content with inline computed styles
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.left = '-9999px';
      iframe.style.top = '0';
      iframe.style.width = `${cvElement.scrollWidth}px`;
      iframe.style.height = `${cvElement.scrollHeight}px`;
      iframe.setAttribute('aria-hidden', 'true');
      document.body.appendChild(iframe);

      const idoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!idoc) throw new Error('Impossible de créer l\'iframe pour la génération PDF');

      // Basic HTML wrapper without external stylesheets
      idoc.open();
      idoc.write('<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>');
      idoc.close();

      const clone = cvElement.cloneNode(true) as HTMLElement;
      // remove any ids that might conflict
      clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
      idoc.body.appendChild(clone);

      // helper to compute safe values (convert oklch/lab/lch via temporary element in parent document)
      const toComputedValue = (prop: string, raw: string) => {
        try {
          if (!raw) return raw;
          // Convert modern color functions to RGB
          if (/oklch|lab\(|lch\(|color\(/i.test(raw)) {
            const tmp = document.createElement('div');
            tmp.style.display = 'none';
            tmp.style.position = 'absolute';
            tmp.style.left = '-9999px';
            tmp.style.visibility = 'hidden';
            try { 
              (tmp.style as any)[prop] = raw; 
            } catch(e) { 
              // Fallback to color property
              tmp.style.color = raw; 
            }
            document.body.appendChild(tmp);
            const computed = getComputedStyle(tmp).getPropertyValue(prop) || getComputedStyle(tmp).color;
            document.body.removeChild(tmp);
            // If still not converted, return a safe fallback
            if (computed && !/oklch|lab\(|lch\(|color\(/i.test(computed)) {
              return computed;
            }
            // Fallback to transparent or inherit
            return prop.includes('color') ? '#000000' : 'transparent';
          }
          return raw;
        } catch (e) {
          // Safe fallback
          return prop.includes('color') ? '#000000' : 'transparent';
        }
      };

      // inline computed styles for all elements inside the iframe's body
      const originals = [cvElement, ...Array.from(cvElement.querySelectorAll('*'))] as HTMLElement[];
      const clones = [clone, ...Array.from(clone.querySelectorAll('*'))] as HTMLElement[];

      for (let i = 0; i < originals.length && i < clones.length; i++) {
        const o = originals[i];
        const c = clones[i];
        if (!o || !c) continue;
        try {
          const cs = window.getComputedStyle(o);
          for (let j = 0; j < cs.length; j++) {
            const prop = cs[j];
            // restrict to properties that affect visual rendering
            if (/(color|background|border|shadow|box-shadow|text-shadow|filter|transform|font|line-height|letter-spacing|padding|margin|width|height|display|flex|grid)/i.test(prop)) {
              const val = cs.getPropertyValue(prop);
              if (val && val !== 'rgba(0, 0, 0, 0)' && val !== 'transparent' && val !== 'none') {
                const safe = toComputedValue(prop, val.trim());
                try { 
                  (c.style as any).setProperty(prop, safe, 'important'); 
                } catch (e) {
                  // Ignore properties that can't be set
                }
              }
            }
          }
        } catch (e) {
          // ignore element styling errors
        }
      }

      // Ensure body background is white to avoid transparency
      idoc.body.style.background = '#ffffff';

      // Wait a tick for iframe to render
      await new Promise((r) => setTimeout(r, 50));

      // Render the sanitized iframe content
      const canvas = await html2canvas(idoc.body, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: idoc.body.scrollWidth,
        windowHeight: idoc.body.scrollHeight,
        ignoreElements: (element) => element.classList?.contains('no-pdf') || false,
      });

      // remove iframe
      document.body.removeChild(iframe);

      // Restaurer le transform original
      cvElement.style.transform = originalTransform;

      // Créer le PDF
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgData = canvas.toDataURL('image/png');
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Si le contenu est plus grand qu'une page, on le divise
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Télécharger le PDF
      const filename = `CV_${cv.personalInfo?.fullName?.replace(/\s+/g, '_') || 'document'}.pdf`;
      pdf.save(filename);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la génération du PDF');
      console.error('PDF generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={handleExport}
        isLoading={isGenerating}
        variant="primary"
        size="lg"
        className="w-full sm:w-auto"
      >
        <ArrowDownTrayIcon className="h-5 w-5" />
        {isGenerating ? 'Génération en cours...' : 'Télécharger le PDF'}
      </Button>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
