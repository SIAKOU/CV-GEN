import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setProjects } from '../../../store/cvSlice';
import { showToast } from '../../../store/uiSlice';
import type { ProjectEntry } from '../../../types';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import { Card } from '../../common/Card';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const ProjectsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((s) => s.cv.projects) || [];
  
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<ProjectEntry>({
    name: '',
    description: '',
    role: '',
    technologies: [],
    url: '',
    github: '',
    images: [],
    startDate: '',
    endDate: '',
  });
  const [newTech, setNewTech] = useState('');

  const addTechnology = () => {
    const tech = newTech.trim();
    if (!tech) return;
    
    setFormData({
      ...formData,
      technologies: [...(formData.technologies || []), tech],
    });
    setNewTech('');
  };

  const removeTechnology = (index: number) => {
    setFormData({
      ...formData,
      technologies: (formData.technologies || []).filter((_: string, i: number) => i !== index),
    });
  };

  const handleAdd = () => {
    if (!formData.name.trim()) {
      dispatch(showToast({ message: 'Le nom du projet est requis', type: 'error' }));
      return;
    }

    const newProject: ProjectEntry = {
      ...formData,
      id: Date.now().toString(),
    };

    if (editingIndex !== null) {
      const updated = [...projects];
      updated[editingIndex] = newProject;
      dispatch(setProjects(updated));
      dispatch(showToast({ message: 'Projet mis à jour!', type: 'success' }));
    } else {
      dispatch(setProjects([...projects, newProject]));
      dispatch(showToast({ message: 'Projet ajouté!', type: 'success' }));
    }

    resetForm();
  };

  const handleEdit = (index: number) => {
    setFormData(projects[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const updated = projects.filter((_: ProjectEntry, i: number) => i !== index);
    dispatch(setProjects(updated));
    dispatch(showToast({ message: 'Projet supprimé', type: 'success' }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      role: '',
      technologies: [],
      url: '',
      github: '',
      images: [],
      startDate: '',
      endDate: '',
    });
    setEditingIndex(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {editingIndex !== null ? 'Modifier' : 'Ajouter'} un projet
          </h3>

          <Input
            label="Nom du projet"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ex: Application de gestion de tâches"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Décrivez le projet, ses objectifs et vos contributions..."
            />
          </div>

          <Input
            label="Votre rôle"
            value={formData.role || ''}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            placeholder="Ex: Développeur Full Stack, Lead Developer..."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Lien du projet (site live)"
              value={formData.url || ''}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://..."
            />

            <Input
              label="Lien GitHub"
              value={formData.github || ''}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              placeholder="https://github.com/..."
            />

            <Input
              label="Date de début"
              type="month"
              value={formData.startDate || ''}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />

            <Input
              label="Date de fin"
              type="month"
              value={formData.endDate || ''}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technologies utilisées
            </label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {(formData.technologies || []).map((tech, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(index)}
                      className="hover:text-blue-900"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  placeholder="Ajouter une technologie..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  type="button"
                  onClick={addTechnology}
                  variant="secondary"
                  className="text-sm"
                >
                  Ajouter
                </Button>
              </div>
            </div>
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

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Projets ({projects.length})
        </h3>
        {projects.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Aucun projet ajouté
          </p>
        ) : (
          <div className="grid gap-4">
            {projects.map((project: ProjectEntry, index: number) => (
              <Card key={project.id || index}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{project.name}</h4>
                    {project.role && (
                      <p className="text-sm text-blue-600 mb-2">{project.role}</p>
                    )}
                    {project.description && (
                      <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.technologies?.map((tech: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 text-xs text-gray-500">
                      {project.startDate && (
                        <span>
                          📅 {new Date(project.startDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                          {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}`}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-3 mt-2">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline"
                        >
                          🔗 Voir le projet
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline"
                        >
                          💻 GitHub
                        </a>
                      )}
                    </div>
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
