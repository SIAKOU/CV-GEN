import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setInterests } from '../../../store/cvSlice';
import { showToast } from '../../../store/uiSlice';
import type { InterestEntry } from '../../../types';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import { Card } from '../../common/Card';

export const InterestsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const interests = useAppSelector((state) => state.cv.interests) || [];
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<InterestEntry>({
    category: 'Autre',
    title: '',
    description: '',
  });

  const handleAdd = () => {
    if (!formData.title.trim()) {
      dispatch(showToast({ message: 'Le titre est requis', type: 'error' }));
      return;
    }

    const newInterest: InterestEntry = {
      ...formData,
      id: Date.now().toString(),
    };

    if (editingIndex !== null) {
      const updated = [...interests];
      updated[editingIndex] = newInterest;
      dispatch(setInterests(updated));
      dispatch(showToast({ message: 'Centre d\'intérêt mis à jour!', type: 'success' }));
    } else {
      dispatch(setInterests([...interests, newInterest]));
      dispatch(showToast({ message: 'Centre d\'intérêt ajouté!', type: 'success' }));
    }

    setFormData({ category: 'Autre', title: '', description: '' });
    setEditingIndex(null);
  };

  const handleEdit = (index: number) => {
    setFormData(interests[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const updated = interests.filter((_: InterestEntry, i: number) => i !== index);
    dispatch(setInterests(updated));
    dispatch(showToast({ message: 'Centre d\'intérêt supprimé', type: 'success' }));
  };

  const handleCancel = () => {
    setFormData({ category: 'Autre', title: '', description: '' });
    setEditingIndex(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {editingIndex !== null ? 'Modifier' : 'Ajouter'} un centre d'intérêt
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as InterestEntry['category'] })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="Sport">🏃 Sport</option>
              <option value="Arts">🎨 Arts</option>
              <option value="Voyages">✈️ Voyages</option>
              <option value="Bénévolat">🤝 Bénévolat</option>
              <option value="Associations">👥 Associations</option>
              <option value="Publications">📚 Publications</option>
              <option value="Brevets">🏆 Brevets</option>
              <option value="Autre">📌 Autre</option>
            </select>
          </div>

          <Input
            label="Titre"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Ex: Marathon, Peinture, Président d'association..."
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (optionnel)
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Détails supplémentaires..."
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleAdd} variant="primary">
              {editingIndex !== null ? 'Mettre à jour' : 'Ajouter'}
            </Button>
            {editingIndex !== null && (
              <Button onClick={handleCancel} variant="ghost">
                Annuler
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Liste des centres d'intérêt */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Centres d'intérêt ({interests.length})
        </h3>
        {interests.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Aucun centre d'intérêt ajouté
          </p>
        ) : (
          <div className="grid gap-4">
            {interests.map((interest: InterestEntry, index: number) => (
              <Card key={interest.id || index}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {interest.category}
                      </span>
                      <h4 className="font-semibold text-gray-900">{interest.title}</h4>
                    </div>
                    {interest.description && (
                      <p className="text-sm text-gray-600">{interest.description}</p>
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
                      Supprimer
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
