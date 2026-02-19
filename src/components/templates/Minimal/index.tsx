import React from 'react';
import { useAppSelector } from '../../../store/hooks';
import { formatLocation } from '../../../utils/formatters';
import type { ExperienceEntry } from '../../../types';

export const MinimalTemplate: React.FC = () => {
  const { personalInfo, experiences, skills } = useAppSelector((s) => s.cv);
  const safeExperiences = experiences || [];
  const safeSkills = skills || [];
  
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          {personalInfo?.fullName || 'Votre Nom'}
        </h1>
        {personalInfo?.title && (
          <p className="text-lg text-gray-600 mb-2">{personalInfo.title}</p>
        )}
        <div className="text-sm text-gray-500 space-x-3">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo?.location && <span>• {formatLocation(personalInfo.location)}</span>}
        </div>
      </header>

      {/* Expériences */}
      {safeExperiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b pb-1">
            Expérience Professionnelle
          </h2>
          <div className="space-y-4">
            {safeExperiences.map((e: ExperienceEntry, i: number) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-900">{e.role}</h3>
                  <span className="text-sm text-gray-500">
                    {e.startDate} - {e.endDate || 'Présent'}
                  </span>
                </div>
                <p className="text-gray-700 text-sm mb-1">{e.company}</p>
                {e.description && (
                  <p className="text-gray-600 text-sm">{e.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Compétences */}
      {safeSkills.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b pb-1">
            Compétences
          </h2>
          <div className="flex flex-wrap gap-2">
            {safeSkills.map((s: string, i: number) => (
              <span key={i} className="text-sm text-gray-700">
                {s}{i < safeSkills.length - 1 ? ' •' : ''}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
