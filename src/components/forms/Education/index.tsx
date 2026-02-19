import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { EducationEntry } from '../../../types';
import { educationEntrySchema } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setEducation } from '../../../store/cvSlice';
import { showToast } from '../../../store/uiSlice';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';

interface FormValues {
  education: EducationEntry[];
}

const educationFormSchema = z.object({
  education: z.array(educationEntrySchema),
});

export const EducationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const existing = useAppSelector((s) => s.cv.education) || [];

  const { control, register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormValues>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: { 
      education: existing.length ? existing : [{ 
        id: Date.now().toString(),
        degree: '',
        institution: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        honors: '',
        specialization: '',
        thesis: '',
        relevantCourses: [],
        description: '',
        gpa: '',
      }] 
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'education',
    control,
  });

  const [newCourse, setNewCourse] = useState<{ [key: number]: string }>({});

  const addCourse = (idx: number) => {
    const course = newCourse[idx]?.trim();
    if (!course) return;
    
    const current = watch(`education.${idx}.relevantCourses`) || [];
    setValue(`education.${idx}.relevantCourses`, [...current, course]);
    setNewCourse({ ...newCourse, [idx]: '' });
  };

  const removeCourse = (idx: number, courseIdx: number) => {
    const current = watch(`education.${idx}.relevantCourses`) || [];
    setValue(`education.${idx}.relevantCourses`, current.filter((_, i) => i !== courseIdx));
  };

  const onSubmit = (data: FormValues) => {
    dispatch(setEducation(data.education));
    dispatch(showToast({ message: 'Formation enregistrée!', type: 'success' }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-6">
        {fields.map((field, idx) => {
          const isCurrent = watch(`education.${idx}.current`);
          const courses = watch(`education.${idx}.relevantCourses`) || [];
          
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
                Formation {idx + 1}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  {...register(`education.${idx}.degree` as const)}
                  label="Diplôme"
                  placeholder="Master en Informatique"
                  error={errors.education?.[idx]?.degree?.message}
                  required
                />

                <Input
                  {...register(`education.${idx}.institution` as const)}
                  label="Établissement"
                  placeholder="Université de Paris"
                  error={errors.education?.[idx]?.institution?.message}
                  required
                />
                
                <Input
                  {...register(`education.${idx}.location` as const)}
                  label="Lieu"
                  placeholder="Paris, France"
                  error={errors.education?.[idx]?.location?.message}
                />
                
                <Input
                  {...register(`education.${idx}.specialization` as const)}
                  label="Spécialisation"
                  placeholder="Génie Logiciel"
                  error={errors.education?.[idx]?.specialization?.message}
                />
                
                <Input
                  {...register(`education.${idx}.startDate` as const)}
                  type="month"
                  label="Date de début"
                  error={errors.education?.[idx]?.startDate?.message}
                />
                
                <Input
                  {...register(`education.${idx}.endDate` as const)}
                  type="month"
                  label="Date de fin"
                  disabled={isCurrent}
                  helperText={isCurrent ? 'En cours' : ''}
                  error={errors.education?.[idx]?.endDate?.message}
                />

                <Input
                  {...register(`education.${idx}.honors` as const)}
                  label="Mention"
                  placeholder="Mention Très Bien"
                  error={errors.education?.[idx]?.honors?.message}
                />

                <Input
                  {...register(`education.${idx}.gpa` as const)}
                  label="GPA / Note"
                  placeholder="3.8/4.0 ou 16/20"
                  error={errors.education?.[idx]?.gpa?.message}
                />

                <div className="flex items-center pt-6">
                  <input
                    type="checkbox"
                    {...register(`education.${idx}.current` as const)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Formation en cours
                  </label>
                </div>
              </div>

              {/* Thèse/Mémoire */}
              <div className="mt-4">
                <Input
                  {...register(`education.${idx}.thesis` as const)}
                  label="Thèse / Mémoire (si applicable)"
                  placeholder="Titre de la thèse ou du mémoire"
                  error={errors.education?.[idx]?.thesis?.message}
                />
              </div>

              {/* Description */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  {...register(`education.${idx}.description` as const)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  rows={3}
                  placeholder="Projets, réalisations, activités..."
                />
              </div>

              {/* Cours pertinents */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cours pertinents
                </label>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {courses.map((course, courseIdx) => (
                      <span
                        key={courseIdx}
                        className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                      >
                        {course}
                        <button
                          type="button"
                          onClick={() => removeCourse(idx, courseIdx)}
                          className="hover:text-green-900"
                        >
                          <XMarkIcon className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCourse[idx] || ''}
                      onChange={(e) => setNewCourse({ ...newCourse, [idx]: e.target.value })}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCourse(idx))}
                      placeholder="Ajouter un cours..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                      type="button"
                      onClick={() => addCourse(idx)}
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
            degree: '',
            institution: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            honors: '',
            specialization: '',
            thesis: '',
            relevantCourses: [],
            description: '',
            gpa: '',
          })}
          variant="secondary"
        >
          <PlusIcon className="h-5 w-5" />
          Ajouter une formation
        </Button>
        
        <Button type="submit" variant="primary">
          Enregistrer
        </Button>
      </div>
    </form>
  );
};
