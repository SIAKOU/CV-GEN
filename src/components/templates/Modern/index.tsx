import React from 'react';
import { useAppSelector } from '../../../store/hooks';
import { formatLocation } from '../../../utils/formatters';
import type { ExperienceEntry } from '../../../types';

export const ModernTemplate: React.FC = () => {
  const { personalInfo, experiences, skills } = useAppSelector((s) => s.cv);
  const safeExperiences = experiences || [];
  const safeSkills = skills || [];
  
  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-50 to-white p-8 shadow-xl rounded-lg">
      {/* Header avec design moderne */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg mb-6 shadow-md">
        <h1 className="text-4xl font-bold mb-2">
          {personalInfo?.fullName || 'Votre Nom'}
        </h1>
        {personalInfo?.title && (
          <p className="text-xl text-blue-100 mb-3">{personalInfo.title}</p>
        )}
        <div className="text-sm text-blue-100 flex flex-wrap gap-4">
          {personalInfo?.email && <span>📧 {personalInfo.email}</span>}
          {personalInfo?.phone && <span>📱 {personalInfo.phone}</span>}
          {personalInfo?.location && <span>📍 {formatLocation(personalInfo.location)}</span>}
        </div>
      </header>

      {/* Expériences */}
      {safeExperiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
            <span className="w-8 h-1 bg-blue-600 rounded"></span>
            Expérience Professionnelle
          </h2>
          <div className="space-y-5">
            {safeExperiences.map((e: ExperienceEntry, i: number) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{e.role}</h3>
                    <p className="text-blue-600 font-medium">{e.company}</p>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {e.startDate} - {e.endDate || 'Présent'}
                  </span>
                </div>
                {e.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">{e.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Compétences */}
      {safeSkills.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
            <span className="w-8 h-1 bg-blue-600 rounded"></span>
            Compétences
          </h2>
          <div className="flex flex-wrap gap-2">
            {safeSkills.map((s: string, i: number) => (
              <span 
                key={i} 
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
