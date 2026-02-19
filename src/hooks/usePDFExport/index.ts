import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import type { ReactElement } from 'react';

export function usePDFExport() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePDF = async (pdfDocument: ReactElement, filename: string = 'cv.pdf') => {
    setIsGenerating(true);
    setError(null);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blob = await pdf(pdfDocument as any).toBlob();
      const url = URL.createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la génération du PDF');
      console.error('PDF generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return { generatePDF, isGenerating, error };
}
