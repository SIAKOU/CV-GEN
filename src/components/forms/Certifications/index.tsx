import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setCertifications } from '../../../store/cvSlice';
import { showToast } from '../../../store/uiSlice';
import type { CertificationEntry } from '../../../types';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import { Card } from '../../common/Card';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const CertificationsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const certifications = useAppSelector((s) => s.cv.certifications) || [];
  
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<CertificationEntry>({
    name: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    verificationUrl: '',
    associatedSkills: [],
  });
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    const skill = newSkill.trim();
    if (!skill) return;
    
    setFormData({
      ...formData,
      associatedSkills: [...(formData.associatedSkills || []), skill],
    });
    setNewSkill('');
  };

  const removeSkill = (index: number) => {
    setFormData({
      ...formData,
      associatedSkills: (formData.associatedSkills || []).filter((_: string, i: number) => i !== index),
    });
  };

  const handleAdd = () => {
    if (!formData.name.trim() || !formData.issuer.trim()) {
      dispatch(showToast({ message: 'Le nom et l\'organisme sont requis', type: 'error' }));
      return;
    }

    const newCert: CertificationEntry = {
      ...formData,
      id: Date.now().toString(),
    };

    if (editingIndex !== null) {
      const updated = [...certifications];
      updated[editingIndex] = newCert;
      dispatch(setCertifications(updated));
      dispatch(showToast({ message: 'Certification mise à jour!', type: 'success' }));
    } else {
      dispatch(setCertifications([...certifications, newCert]));
      dispatch(showToast({ message: 'Certification ajoutée!', type: 'success' }));
    }

    resetForm();
  };

  const handleEdit = (index: number) => {
    setFormData(certifications[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const updated = certifications.filter((_: CertificationEntry, i: number) => i !== index);
    dispatch(setCertifications(updated));
    dispatch(showToast({ message: 'Certification supprimée', type: 'success' }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      verificationUrl: '',
      associatedSkills: [],
    });
    setEditingIndex(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {editingIndex !== null ? 'Modifier' : 'Ajouter'} une certification
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nom de la certification"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: AWS Certified Solutions Architect"
              required
            />

            <Input
              label="Organisme certificateur"
              value={formData.issuer}
              onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
              placeholder="Ex: Amazon Web Services"
              required
            />

            <Input
              label="Date d'obtention"
              type="month"
              value={formData.issueDate || ''}
              onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
            />

            <Input
              label="Date d'expiration (si applicable)"
              type="month"
              value={formData.expiryDate || ''}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            />

            <Input
              label="Identifiant de certification"
              value={formData.credentialId || ''}
              onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
              placeholder="Ex: ABC123XYZ"
            />

            <Input
              label="URL de vérification"
              value={formData.verificationUrl || ''}
              onChange={(e) => setFormData({ ...formData, verificationUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compétences associées
            </label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {(formData.associatedSkills || []).map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="hover:text-purple-900"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="Ajouter une compétence..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  type="button"
                  onClick={addSkill}
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
          Certifications ({certifications.length})
        </h3>
        {certifications.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Aucune certification ajoutée
          </p>
        ) : (
          <div className="grid gap-4">
            {certifications.map((cert: CertificationEntry, index: number) => (
              <Card key={cert.id || index}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{cert.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{cert.issuer}</p>
                    
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-2">
                      {cert.issueDate && (
                        <span>📅 Obtenu: {new Date(cert.issueDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</span>
                      )}
                      {cert.expiryDate && (
                        <span>⏰ Expire: {new Date(cert.expiryDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</span>
                      )}
                      {cert.credentialId && (
                        <span>🔖 ID: {cert.credentialId}</span>
                      )}
                    </div>

                    {cert.associatedSkills && cert.associatedSkills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {cert.associatedSkills.map((skill: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline mt-2 inline-block"
                      >
                        🔗 Vérifier la certification
                      </a>
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
