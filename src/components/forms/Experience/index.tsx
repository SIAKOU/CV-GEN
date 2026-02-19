import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { ExperienceEntry } from '../../../types';
import { experienceEntrySchema } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setExperiences } from '../../../store/cvSlice';
import { showToast } from '../../../store/uiSlice';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';

interface FormValues {
  experiences: ExperienceEntry[];
}

const experienceFormSchema = z.object({
  experiences: z.array(experienceEntrySchema),
});

export const ExperienceForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const existing = useAppSelector((s) => s.cv.experiences) || [];

  const { control, register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormValues>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: { 
      experiences: existing.length ? existing : [{
        id: Date.now().toString(),
        role: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        contractType: undefined,
        description: '',
        achievements: [],
        technologies: [],
        projects: [],
      }] 
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'experiences',
    control,
  });

  const [newTech, setNewTech] = useState<{ [key: number]: string }>({});
  const [newAchievement, setNewAchievement] = useState<{ [key: number]: string }>({});

  const addTechnology = (idx: number) => {
    const tech = newTech[idx]?.trim();
    if (!tech) return;
    
    const current = watch(`experiences.${idx}.technologies`) || [];
    setValue(`experiences.${idx}.technologies`, [...current, tech]);
    setNewTech({ ...newTech, [idx]: '' });
  };

  const removeTechnology = (idx: number, techIdx: number) => {
    const current = watch(`experiences.${idx}.technologies`) || [];
    setValue(`experiences.${idx}.technologies`, current.filter((_, i) => i !== techIdx));
  };

  const addAchievement = (idx: number) => {
    const achievement = newAchievement[idx]?.trim();
    if (!achievement) return;
    
    const current = watch(`experiences.${idx}.achievements`) || [];
    setValue(`experiences.${idx}.achievements`, [...current, achievement]);
    setNewAchievement({ ...newAchievement, [idx]: '' });
  };

  const removeAchievement = (idx: number, achIdx: number) => {
    const current = watch(`experiences.${idx}.achievements`) || [];
    setValue(`experiences.${idx}.achievements`, current.filter((_, i) => i !== achIdx));
  };

  const onSubmit = (data: FormValues) => {
    dispatch(setExperiences(data.experiences));
    dispatch(showToast({ message: 'Expériences enregistrées!', type: 'success' }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-6">
        {fields.map((field, idx) => {
          const technologies = watch(`experiences.${idx}.technologies`) || [];
          const achievements = watch(`experiences.${idx}.achievements`) || [];
          const isCurrent = watch(`experiences.${idx}.current`);

          return (
            <div key={field.id} className="p-6 border-2 border-gray-200 rounded-xl relative bg-gray-50 hover:border-blue-300 transition-colors">
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
              
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Expérience {idx + 1}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  {...register(`experiences.${idx}.role` as const)}
                  label="Poste"
                  placeholder="Développeur Full Stack"
                  error={errors.experiences?.[idx]?.role?.message}
                  required
                />

                <Input
                  {...register(`experiences.${idx}.company` as const)}
                  label="Entreprise"
                  placeholder="Nom de l'entreprise"
                  error={errors.experiences?.[idx]?.company?.message}
                  required
                />
                
                <Input
                  {...register(`experiences.${idx}.location` as const)}
                  label="Lieu"
                  placeholder="Paris, France"
                  error={errors.experiences?.[idx]?.location?.message}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type de contrat
                  </label>
                  <select
                    {...register(`experiences.${idx}.contractType` as const)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="Stage">Stage</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Alternance">Alternance</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                
                <Input
                  {...register(`experiences.${idx}.startDate` as const)}
                  type="month"
                  label="Date de début"
                  error={errors.experiences?.[idx]?.startDate?.message}
                />
                
                <Input
                  {...register(`experiences.${idx}.endDate` as const)}
                  type="month"
                  label="Date de fin"
                  disabled={isCurrent}
                  error={errors.experiences?.[idx]?.endDate?.message}
                />

                <div className="flex items-center pt-6">
                  <input
                    {...register(`experiences.${idx}.current` as const)}
                    type="checkbox"
                    id={`current-${idx}`}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`current-${idx}`} className="ml-2 block text-sm text-gray-700">
                    Poste actuel
                  </label>
                </div>
              </div>

              {/* Description */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  {...register(`experiences.${idx}.description` as const)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  rows={3}
                  placeholder="Décrivez vos responsabilités..."
                />
              </div>

              {/* Réalisations clés */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Réalisations clés
                </label>
                <div className="space-y-2">
                  {achievements.map((achievement, achIdx) => (
                    <div key={achIdx} className="flex items-center gap-2 bg-white p-2 rounded border">
                      <span className="flex-1 text-sm">• {achievement}</span>
                      <button
                        type="button"
                        onClick={() => removeAchievement(idx, achIdx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newAchievement[idx] || ''}
                      onChange={(e) => setNewAchievement({ ...newAchievement, [idx]: e.target.value })}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement(idx))}
                      placeholder="Ajouter une réalisation..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                      type="button"
                      onClick={() => addAchievement(idx)}
                      variant="secondary"
                      className="text-sm"
                    >
                      Ajouter
                    </Button>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technologies utilisées
                </label>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTechnology(idx, techIdx)}
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
                      value={newTech[idx] || ''}
                      onChange={(e) => setNewTech({ ...newTech, [idx]: e.target.value })}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology(idx))}
                      placeholder="Ajouter une technologie..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                      type="button"
                      onClick={() => addTechnology(idx)}
                      variant="secondary"
                      className="text-sm"
                    >
                      Ajouter
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <Button
          type="button"
          onClick={() => append({
            id: Date.now().toString(),
            role: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            contractType: undefined,
            description: '',
            achievements: [],
            technologies: [],
            projects: [],
          })}
          variant="secondary"
        >
          <PlusIcon className="h-5 w-5" />
          Ajouter une expérience
        </Button>
        
        <Button type="submit" variant="primary">
          Enregistrer
        </Button>
      </div>
    </form>
  );
};
