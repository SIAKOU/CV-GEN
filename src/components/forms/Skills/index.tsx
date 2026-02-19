import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setSkillCategories } from '../../../store/cvSlice';
import { showToast } from '../../../store/uiSlice';
import type { SkillCategory, SkillEntry } from '../../../types';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import { Card } from '../../common/Card';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

const SKILL_LEVELS = [
  { value: 1, label: 'Débutant' },
  { value: 2, label: 'Intermédiaire' },
  { value: 3, label: 'Confirmé' },
  { value: 4, label: 'Avancé' },
  { value: 5, label: 'Expert' },
];

export const SkillsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const skillCategories = useAppSelector((s) => s.cv.skillCategories) || [];

  const [selectedCategory, setSelectedCategory] = useState<SkillCategory['category']>('Techniques');
  const [customCategory, setCustomCategory] = useState('');
  const [newSkill, setNewSkill] = useState<SkillEntry>({
    name: '',
    level: 3,
    yearsOfExperience: undefined,
    lastUsed: new Date().getFullYear().toString(),
  });

  const addSkill = () => {
    if (!newSkill.name.trim()) {
      dispatch(showToast({ message: 'Le nom de la compétence est requis', type: 'error' }));
      return;
    }

    if (selectedCategory === 'Autres' && !customCategory.trim()) {
      dispatch(showToast({ message: 'Le nom de la catégorie personnalisée est requis', type: 'error' }));
      return;
    }

    const existingCategoryIndex = skillCategories.findIndex(
      (cat: SkillCategory) => cat.category === selectedCategory && 
      (selectedCategory !== 'Autres' || cat.customCategoryName === customCategory)
    );

    const skillWithId: SkillEntry = {
      ...newSkill,
      id: Date.now().toString(),
    };

    if (existingCategoryIndex >= 0) {
      const updated = [...skillCategories];
      updated[existingCategoryIndex] = {
        ...updated[existingCategoryIndex],
        skills: [...updated[existingCategoryIndex].skills, skillWithId],
      };
      dispatch(setSkillCategories(updated));
    } else {
      const newCategory: SkillCategory = {
        id: Date.now().toString(),
        category: selectedCategory,
        customCategoryName: selectedCategory === 'Autres' ? customCategory : undefined,
        skills: [skillWithId],
      };
      dispatch(setSkillCategories([...skillCategories, newCategory]));
    }

    dispatch(showToast({ message: 'Compétence ajoutée!', type: 'success' }));
    setNewSkill({
      name: '',
      level: 3,
      yearsOfExperience: undefined,
      lastUsed: new Date().getFullYear().toString(),
    });
  };

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const updated = [...skillCategories];
    updated[categoryIndex].skills = updated[categoryIndex].skills.filter((_: SkillEntry, i: number) => i !== skillIndex);
    
    if (updated[categoryIndex].skills.length === 0) {
      updated.splice(categoryIndex, 1);
    }
    
    dispatch(setSkillCategories(updated));
    dispatch(showToast({ message: 'Compétence supprimée', type: 'success' }));
  };

  const removeCategory = (categoryIndex: number) => {
    const updated = skillCategories.filter((_: SkillCategory, i: number) => i !== categoryIndex);
    dispatch(setSkillCategories(updated));
    dispatch(showToast({ message: 'Catégorie supprimée', type: 'success' }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Ajouter une compétence</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Catégorie
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as SkillCategory['category'])}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="Techniques">💻 Techniques</option>
                <option value="Méthodologies">📋 Méthodologies</option>
                <option value="Langues">🌍 Langues</option>
                <option value="Soft Skills">🤝 Soft Skills</option>
                <option value="Autres">📌 Autres</option>
              </select>
            </div>

            {selectedCategory === 'Autres' && (
              <Input
                label="Nom de la catégorie"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Ex: Outils de design"
                required
              />
            )}
          </div>

          <Input
            label="Nom de la compétence"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            placeholder="Ex: React, JavaScript, Gestion de projet..."
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Niveau (1-5)
              </label>
              <select
                value={newSkill.level || 3}
                onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                {SKILL_LEVELS.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.value} - {level.label}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Années d'expérience"
              type="number"
              min="0"
              value={newSkill.yearsOfExperience || ''}
              onChange={(e) => setNewSkill({ ...newSkill, yearsOfExperience: e.target.value ? parseInt(e.target.value) : undefined })}
              placeholder="Ex: 3"
            />

            <Input
              label="Dernière utilisation"
              type="number"
              min="1990"
              max={new Date().getFullYear()}
              value={newSkill.lastUsed || ''}
              onChange={(e) => setNewSkill({ ...newSkill, lastUsed: e.target.value })}
              placeholder={new Date().getFullYear().toString()}
            />
          </div>

          <Button onClick={addSkill} variant="primary">
            Ajouter la compétence
          </Button>
        </div>
      </Card>

      {/* Liste des compétences par catégorie */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Compétences par catégorie ({skillCategories.length})
        </h3>
        {skillCategories.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Aucune compétence ajoutée
          </p>
        ) : (
          <div className="space-y-4">
            {skillCategories.map((category: SkillCategory, catIndex: number) => (
              <Card key={category.id || catIndex}>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <span className="text-lg">
                        {category.category === 'Techniques' && '💻'}
                        {category.category === 'Méthodologies' && '📋'}
                        {category.category === 'Langues' && '🌍'}
                        {category.category === 'Soft Skills' && '🤝'}
                        {category.category === 'Autres' && '📌'}
                      </span>
                      {category.category === 'Autres' ? category.customCategoryName : category.category}
                      <span className="text-sm text-gray-500">({category.skills.length})</span>
                    </h4>
                    <Button
                      onClick={() => removeCategory(catIndex)}
                      variant="ghost"
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {category.skills.map((skill: SkillEntry, skillIndex: number) => (
                      <div
                        key={skill.id || skillIndex}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-gray-900">{skill.name}</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <div
                                  key={level}
                                  className={`w-2 h-2 rounded-full ${
                                    level <= (skill.level || 0) ? 'bg-blue-500' : 'bg-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">
                              {SKILL_LEVELS.find((l) => l.value === skill.level)?.label}
                            </span>
                          </div>
                          <div className="flex gap-3 mt-1 text-xs text-gray-500">
                            {skill.yearsOfExperience && (
                              <span>{skill.yearsOfExperience} an{skill.yearsOfExperience > 1 ? 's' : ''} d'exp.</span>
                            )}
                            {skill.lastUsed && (
                              <span>Dernière utilisation: {skill.lastUsed}</span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeSkill(catIndex, skillIndex)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
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
