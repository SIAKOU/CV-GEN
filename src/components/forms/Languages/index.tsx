import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setLanguages } from '../../../store/cvSlice';
import { showToast } from '../../../store/uiSlice';
import type { LanguageEntry } from '../../../types';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import { Card } from '../../common/Card';
import { TrashIcon } from '@heroicons/react/24/outline';

const LANGUAGE_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Natif'] as const;

const COMMON_LANGUAGES = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'Anglais', flag: '🇬🇧' },
  { code: 'es', name: 'Espagnol', flag: '🇪🇸' },
  { code: 'de', name: 'Allemand', flag: '🇩🇪' },
  { code: 'it', name: 'Italien', flag: '🇮🇹' },
  { code: 'pt', name: 'Portugais', flag: '🇵🇹' },
  { code: 'zh', name: 'Chinois', flag: '🇨🇳' },
  { code: 'ja', name: 'Japonais', flag: '🇯🇵' },
  { code: 'ar', name: 'Arabe', flag: '🇸🇦' },
  { code: 'ru', name: 'Russe', flag: '🇷🇺' },
];

export const LanguagesForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const languages = useAppSelector((s) => s.cv.languages) || [];
  
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showDetailedAssessment, setShowDetailedAssessment] = useState(false);
  const [formData, setFormData] = useState<LanguageEntry>({
    language: '',
    languageCode: '',
    level: 'B1',
    certified: false,
    certificateName: '',
    certificateUrl: '',
    detailedAssessment: {
      listening: undefined,
      speaking: undefined,
      reading: undefined,
      writing: undefined,
    },
  });

  const handleLanguageSelect = (langCode: string, langName: string) => {
    setFormData({
      ...formData,
      language: langName,
      languageCode: langCode,
    });
  };

  const handleAdd = () => {
    if (!formData.language.trim()) {
      dispatch(showToast({ message: 'La langue est requise', type: 'error' }));
      return;
    }

    const newLanguage: LanguageEntry = {
      ...formData,
      id: Date.now().toString(),
    };

    if (editingIndex !== null) {
      const updated = [...languages];
      updated[editingIndex] = newLanguage;
      dispatch(setLanguages(updated));
      dispatch(showToast({ message: 'Langue mise à jour!', type: 'success' }));
    } else {
      dispatch(setLanguages([...languages, newLanguage]));
      dispatch(showToast({ message: 'Langue ajoutée!', type: 'success' }));
    }

    resetForm();
  };

  const handleEdit = (index: number) => {
    setFormData(languages[index]);
    setEditingIndex(index);
    setShowDetailedAssessment(!!languages[index].detailedAssessment);
  };

  const handleDelete = (index: number) => {
    const updated = languages.filter((_: LanguageEntry, i: number) => i !== index);
    dispatch(setLanguages(updated));
    dispatch(showToast({ message: 'Langue supprimée', type: 'success' }));
  };

  const resetForm = () => {
    setFormData({
      language: '',
      languageCode: '',
      level: 'B1',
      certified: false,
      certificateName: '',
      certificateUrl: '',
      detailedAssessment: {
        listening: undefined,
        speaking: undefined,
        reading: undefined,
        writing: undefined,
      },
    });
    setEditingIndex(null);
    setShowDetailedAssessment(false);
  };

  const getLanguageFlag = (code: string) => {
    return COMMON_LANGUAGES.find((l) => l.code === code)?.flag || '🌐';
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {editingIndex !== null ? 'Modifier' : 'Ajouter'} une langue
          </h3>

          {/* Sélection rapide de langue */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Langues courantes
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLanguageSelect(lang.code, lang.name)}
                  className={`px-3 py-2 rounded-lg border transition-colors ${
                    formData.languageCode === lang.code
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : 'bg-white border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <span className="mr-1">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          {/* Ou saisie manuelle */}
          <Input
            label="Ou saisir une autre langue"
            value={formData.language}
            onChange={(e) => setFormData({ ...formData, language: e.target.value, languageCode: '' })}
            placeholder="Ex: Coréen, Hindi..."
          />

          {/* Niveau global */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Niveau (CECRL)
            </label>
            <select
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value as typeof LANGUAGE_LEVELS[number] })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {LANGUAGE_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Auto-évaluation détaillée */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="detailedAssessment"
                checked={showDetailedAssessment}
                onChange={(e) => setShowDetailedAssessment(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="detailedAssessment" className="text-sm font-medium text-gray-700">
                Auto-évaluation détaillée (optionnel)
              </label>
            </div>

            {showDetailedAssessment && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    🎧 Compréhension orale
                  </label>
                  <select
                    value={formData.detailedAssessment?.listening || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      detailedAssessment: {
                        ...formData.detailedAssessment,
                        listening: e.target.value as any,
                      },
                    })}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-</option>
                    {LANGUAGE_LEVELS.filter(l => l !== 'Natif').map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    💬 Expression orale
                  </label>
                  <select
                    value={formData.detailedAssessment?.speaking || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      detailedAssessment: {
                        ...formData.detailedAssessment,
                        speaking: e.target.value as any,
                      },
                    })}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-</option>
                    {LANGUAGE_LEVELS.filter(l => l !== 'Natif').map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    📖 Compréhension écrite
                  </label>
                  <select
                    value={formData.detailedAssessment?.reading || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      detailedAssessment: {
                        ...formData.detailedAssessment,
                        reading: e.target.value as any,
                      },
                    })}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-</option>
                    {LANGUAGE_LEVELS.filter(l => l !== 'Natif').map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    ✍️ Expression écrite
                  </label>
                  <select
                    value={formData.detailedAssessment?.writing || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      detailedAssessment: {
                        ...formData.detailedAssessment,
                        writing: e.target.value as any,
                      },
                    })}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-</option>
                    {LANGUAGE_LEVELS.filter(l => l !== 'Natif').map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Certification */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="certified"
                checked={formData.certified}
                onChange={(e) => setFormData({ ...formData, certified: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="certified" className="text-sm font-medium text-gray-700">
                Certifié
              </label>
            </div>

            {formData.certified && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  label="Nom du certificat"
                  value={formData.certificateName || ''}
                  onChange={(e) => setFormData({ ...formData, certificateName: e.target.value })}
                  placeholder="Ex: TOEFL, DELF, etc."
                />
                <Input
                  label="URL de vérification"
                  value={formData.certificateUrl || ''}
                  onChange={(e) => setFormData({ ...formData, certificateUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button onClick={handleAdd} variant="primary">
              {editingIndex !== null ? 'Mettre à jour' : 'Ajouter'}
            </Button>
            {editingIndex !== null && (
              <Button onClick={resetForm} variant="ghost">
                Annuler
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Liste des langues */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Langues ({languages.length})
        </h3>
        {languages.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Aucune langue ajoutée
          </p>
        ) : (
          <div className="grid gap-4">
            {languages.map((lang: LanguageEntry, index: number) => (
              <Card key={lang.id || index}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{getLanguageFlag(lang.languageCode || '')}</span>
                      <h4 className="font-semibold text-gray-900">{lang.language}</h4>
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {lang.level}
                      </span>
                      {lang.certified && (
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                          ✓ Certifié
                        </span>
                      )}
                    </div>
                    
                    {lang.detailedAssessment && (
                      <div className="flex gap-4 text-xs text-gray-600 mt-2">
                        {lang.detailedAssessment.listening && (
                          <span>🎧 {lang.detailedAssessment.listening}</span>
                        )}
                        {lang.detailedAssessment.speaking && (
                          <span>💬 {lang.detailedAssessment.speaking}</span>
                        )}
                        {lang.detailedAssessment.reading && (
                          <span>📖 {lang.detailedAssessment.reading}</span>
                        )}
                        {lang.detailedAssessment.writing && (
                          <span>✍️ {lang.detailedAssessment.writing}</span>
                        )}
                      </div>
                    )}

                    {lang.certified && lang.certificateName && (
                      <p className="text-sm text-gray-600 mt-1">
                        Certificat: {lang.certificateName}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      onClick={() => handleEdit(index)}
                      variant="ghost"
                      className="text-sm"
                    >
                      Modifier
                    </Button>
                    <Button
                      onClick={() => handleDelete(index)}
                      variant="ghost"
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
