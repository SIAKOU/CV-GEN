import React from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Button } from '../../common/Button';
import { usePDFExport } from '../../../hooks/usePDFExport';
import { useAppSelector } from '../../../store/hooks';
import { CVPDFDocument } from '../../../utils/pdfGenerator';

export const PDFExport: React.FC = () => {
  const cv = useAppSelector((s) => s.cv);
  const { generatePDF, isGenerating, error } = usePDFExport();

  const handleExport = async () => {
    const filename = `CV_${cv.personalInfo?.fullName?.replace(/\s+/g, '_') || 'document'}.pdf`;
    await generatePDF(
      React.createElement(CVPDFDocument, { data: cv }),
      filename
    );
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
