import React from 'react';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { setSelectedTemplate } from '../../../store/templatesSlice';
import type { TemplateType } from '../../../store/templatesSlice';
import { MinimalTemplate } from '../../templates/Minimal';
import { ModernTemplate } from '../../templates/Modern';
import { CreativeTemplate } from '../../templates/Creative';
import { PDFExport } from '../PDFExport';

const templates: Record<TemplateType, { component: React.FC; name: string; description: string }> = {
  minimal: {
    component: MinimalTemplate,
    name: 'Minimal',
    description: 'Design épuré et professionnel',
  },
  modern: {
    component: ModernTemplate,
    name: 'Moderne',
    description: 'Style contemporain avec couleurs',
  },
  creative: {
    component: CreativeTemplate,
    name: 'Créatif',
    description: 'Design audacieux et coloré',
  },
};

export const CVPreview: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedTemplate = useAppSelector((s) => s.templates.selectedTemplate) as TemplateType;
  const cv = useAppSelector((s) => s.cv);

  const SelectedComponent = templates[selectedTemplate].component;

  return (
    <div className="space-y-6">
      {/* Sélecteur de template */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Choisissez votre modèle</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.keys(templates) as TemplateType[]).map((key) => {
            const template = templates[key];
            const isSelected = selectedTemplate === key;
            
            return (
              <motion.button
                key={key}
                onClick={() => dispatch(setSelectedTemplate(key))}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{template.name}</h3>
                  {isSelected && (
                    <span className="text-blue-600">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{template.description}</p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Aperçu du CV */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Aperçu de votre CV</h2>
          <PDFExport />
        </div>
        
        <motion.div
          key={selectedTemplate}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="border-2 border-gray-200 rounded-lg overflow-hidden"
        >
          <SelectedComponent />
        </motion.div>
      </div>

      {/* Données JSON (pour debug) */}
      <details className="bg-gray-50 rounded-lg p-4">
        <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">
          Voir les données JSON
        </summary>
        <pre className="mt-4 p-4 bg-gray-900 text-green-400 rounded-lg overflow-auto text-xs">
          {JSON.stringify(cv, null, 2)}
        </pre>
      </details>
    </div>
  );
};
