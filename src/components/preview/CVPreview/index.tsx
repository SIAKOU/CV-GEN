import React from 'react';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { setSelectedTemplate } from '../../../store/templatesSlice';
import type { TemplateType } from '../../../store/templatesSlice';
import { MinimalTemplate } from '../../templates/Minimal';
import { ModernTemplate } from '../../templates/Modern';
import { CreativeTemplate } from '../../templates/Creative';
import { ModelBasedTemplate } from '../../templates/ModelBased';
import { PDFExport } from '../PDFExport';
import { Sparkles, Zap, Palette } from 'lucide-react';

const templates: Record<TemplateType, { component: React.FC; name: string; description: string; icon: React.ReactNode }> = {
  minimal: {
    component: MinimalTemplate,
    name: 'Minimal',
    description: 'Design épuré et professionnel',
    icon: <Zap className="w-5 h-5" />,
  },
  modern: {
    component: ModernTemplate,
    name: 'Moderne',
    description: 'Style contemporain avec couleurs',
    icon: <Sparkles className="w-5 h-5" />,
  },
  creative: {
    component: CreativeTemplate,
    name: 'Créatif',
    description: 'Design audacieux et coloré',
    icon: <Palette className="w-5 h-5" />,
  },
};

export const CVPreview: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedTemplate = useAppSelector((s) => s.templates.selectedTemplate) as TemplateType;
  const selectedModel = useAppSelector((s) => s.templates.selectedModel);
  const cv = useAppSelector((s) => s.cv);

  // Use model-based template if a model is selected, otherwise use the selected template
  const SelectedComponent = selectedModel ? ModelBasedTemplate : templates[selectedTemplate].component;

  return (
    <div className="space-y-8">
      {/* Model Info */}
      {selectedModel && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border-2 border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-green-900 dark:text-green-100">
                Modèle sélectionné: {selectedModel}
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Votre CV sera généré selon ce design
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Template Selector - Only show if no model selected */}
      {!selectedModel && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-3xl border-2 border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Sparkles className="w-7 h-7 text-blue-600" />
            Choisissez votre style de CV
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(Object.keys(templates) as TemplateType[]).map((key) => {
              const template = templates[key];
              const isSelected = selectedTemplate === key;
              
              return (
                <motion.button
                  key={key}
                  onClick={() => dispatch(setSelectedTemplate(key))}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-6 rounded-2xl border-3 transition-all text-left relative overflow-hidden ${
                    isSelected
                      ? 'border-blue-600 bg-white dark:bg-gray-800 shadow-2xl ring-4 ring-blue-200 dark:ring-blue-800'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-600 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {template.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{template.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{template.description}</p>
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* CV Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            Aperçu de votre CV
          </h2>
          <PDFExport />
        </div>
        
        <motion.div
          key={selectedModel || selectedTemplate}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-4 border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-inner bg-gray-50 dark:bg-gray-900"
        >
          <div className="cv-preview-content transform scale-90 origin-top">
            <SelectedComponent />
          </div>
        </motion.div>
      </div>

      {/* Debug Data */}
      <details className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <summary className="cursor-pointer font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-2">
          <span>🔍</span> Voir les données JSON (Debug)
        </summary>
        <pre className="mt-4 p-6 bg-gray-900 text-green-400 rounded-xl overflow-auto text-xs font-mono shadow-inner">
          {JSON.stringify(cv, null, 2)}
        </pre>
      </details>
    </div>
  );
};
