import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema } from '../../../types';
import type { PersonalInfo } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setPersonalInfo } from '../../../store/cvSlice';
import { showToast } from '../../../store/uiSlice';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button';
import { ImageUpload } from '../../common/ImageUpload';

export const PersonalInfoForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const existing = useAppSelector((state) => state.cv.personalInfo);
  const [wordCount, setWordCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: existing || {
      fullName: '',
      title: '',
      email: '',
      phone: '',
      profileImage: '',
      location: {
        country: '',
        city: '',
        postalCode: '',
      },
      socialLinks: {
        linkedin: '',
        github: '',
        portfolio: '',
        other: [],
      },
      dateOfBirth: '',
      drivingLicense: false,
      summary: '',
      careerObjective: '',
      keywords: [],
      professionalStatus: undefined,
    },
  });

  const profileImage = watch('profileImage');
  const summary = watch('summary');

  React.useEffect(() => {
    if (summary) {
      const words = summary.trim().split(/\s+/).filter(Boolean);
      setWordCount(words.length);
    } else {
      setWordCount(0);
    }
  }, [summary]);

  const onSubmit = (data: PersonalInfo) => {
    dispatch(setPersonalInfo(data));
    dispatch(showToast({ message: 'Informations personnelles enregistrées!', type: 'success' }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* 🖼️ Photo de profil */}
      <div className="flex justify-center">
        <ImageUpload
          value={profileImage}
          onChange={(base64) => setValue('profileImage', base64)}
        />
      </div>

      {/* Identité */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Identité</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Input
              {...register('fullName')}
              label="Nom complet"
              placeholder="Jean Dupont"
              error={errors.fullName?.message}
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <Input
              {...register('title')}
              label="Titre professionnel"
              placeholder="Développeur Full Stack Senior"
              error={errors.title?.message}
            />
          </div>

          <Input
            {...register('dateOfBirth')}
            type="date"
            label="Date de naissance (optionnel)"
            error={errors.dateOfBirth?.message}
          />

          <div className="flex items-center pt-8">
            <input
              {...register('drivingLicense')}
              type="checkbox"
              id="drivingLicense"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="drivingLicense" className="ml-2 block text-sm text-gray-700">
              Permis de conduire
            </label>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            {...register('email')}
            type="email"
            label="Email"
            placeholder="jean.dupont@email.com"
            error={errors.email?.message}
            required
          />

          <Input
            {...register('phone')}
            type="tel"
            label="Téléphone"
            placeholder="+33 6 12 34 56 78"
            error={errors.phone?.message}
          />

          <Input
            {...register('location.country')}
            label="Pays"
            placeholder="France"
            error={errors.location?.country?.message}
          />

          <Input
            {...register('location.city')}
            label="Ville"
            placeholder="Paris"
            error={errors.location?.city?.message}
          />

          <Input
            {...register('location.postalCode')}
            label="Code postal"
            placeholder="75001"
            error={errors.location?.postalCode?.message}
          />
        </div>
      </div>

      {/* Réseaux sociaux */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Réseaux sociaux</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            {...register('socialLinks.linkedin')}
            label="LinkedIn"
            placeholder="https://linkedin.com/in/username"
            error={errors.socialLinks?.linkedin?.message}
          />

          <Input
            {...register('socialLinks.github')}
            label="GitHub"
            placeholder="https://github.com/username"
            error={errors.socialLinks?.github?.message}
          />

          <div className="md:col-span-2">
            <Input
              {...register('socialLinks.portfolio')}
              label="Portfolio"
              placeholder="https://monportfolio.com"
              error={errors.socialLinks?.portfolio?.message}
            />
          </div>
        </div>
      </div>

      {/* Résumé & Objectifs */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Résumé & Objectifs</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Statut professionnel
          </label>
          <select
            {...register('professionalStatus')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Sélectionner...</option>
            <option value="CDI">CDI</option>
            <option value="CDD">CDD</option>
            <option value="Freelance">Freelance</option>
            <option value="Étudiant">Étudiant</option>
            <option value="En recherche">En recherche</option>
            <option value="Autre">Autre</option>
          </select>
          {errors.professionalStatus && (
            <p className="mt-1 text-sm text-red-600">{errors.professionalStatus.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Résumé professionnel (50-300 mots)
          </label>
          <textarea
            {...register('summary')}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Décrivez brièvement votre profil professionnel, vos compétences clés et vos objectifs..."
          />
          <div className="flex justify-between mt-1">
            <div>
              {errors.summary && (
                <p className="text-sm text-red-600">{errors.summary.message}</p>
              )}
            </div>
            <p className={`text-sm ${wordCount < 50 || wordCount > 300 ? 'text-red-600' : 'text-gray-500'}`}>
              {wordCount} mots
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Objectif de carrière (optionnel)
          </label>
          <textarea
            {...register('careerObjective')}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Quel est votre objectif professionnel à court/moyen terme ?"
          />
          {errors.careerObjective && (
            <p className="mt-1 text-sm text-red-600">{errors.careerObjective.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          onClick={() => reset()}
          variant="ghost"
        >
          Réinitialiser
        </Button>
        <Button type="submit" variant="primary">
          Enregistrer
        </Button>
      </div>
    </form>
  );
};
