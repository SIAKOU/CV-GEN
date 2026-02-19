import React from 'react';
import { useAppSelector } from '../../../store/hooks';
import { formatLocation } from '../../../utils/formatters';
import type { ExperienceEntry } from '../../../types';

export const CreativeTemplate: React.FC = () => {
  const { personalInfo, experiences, skills } = useAppSelector((s) => s.cv);
  const safeExperiences = experiences || [];
  const safeSkills = skills || [];
  
  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-br from-purple-50 via-pink-50 to-white p-8 shadow-2xl rounded-2xl">
      {/* Header créatif */}
      <header className="text-center mb-8 relative">
        <div className="absolute top-0 left-0 w-20 h-20 bg-purple-200 rounded-full opacity-50 -z-10"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-200 rounded-full opacity-30 -z-10"></div>
        
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-3">
          {personalInfo?.fullName || 'Votre Nom'}
        </h1>
        {personalInfo?.title && (
          <p className="text-2xl text-gray-700 italic font-light mb-4">{personalInfo.title}</p>
        )}
        <div className="flex justify-center gap-4 text-sm text-gray-600">
          {personalInfo?.email && <span className="flex items-center gap-1">✉️ {personalInfo.email}</span>}
          {personalInfo?.phone && <span className="flex items-center gap-1">☎️ {personalInfo.phone}</span>}
          {personalInfo?.location && <span className="flex items-center gap-1">🌍 {formatLocation(personalInfo.location)}</span>}
        </div>
        <div className="mt-4 h-1 w-32 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
      </header>

      {/* Expériences avec style créatif */}
      {safeExperiences.length > 0 && (
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-5">
            ✨ Parcours Professionnel
          </h2>
          <div className="space-y-6">
            {safeExperiences.map((e: ExperienceEntry, i: number) => (
              <div 
                key={i} 
                className="relative pl-6 border-l-4 border-purple-400 hover:border-pink-500 transition-colors"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-500 rounded-full"></div>
                <div className="bg-white/80 backdrop-blur p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{e.role}</h3>
                      <p className="text-purple-600 font-semibold italic">{e.company}</p>
                    </div>
                    <span className="text-xs text-gray-500 bg-purple-100 px-3 py-1 rounded-full">
                      {e.startDate} – {e.endDate || 'Présent'}
                    </span>
                  </div>
                  {e.description && (
                    <p className="text-gray-700 text-sm leading-relaxed">{e.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Compétences créatives */}
      {safeSkills.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-5">
            🎯 Compétences
          </h2>
          <div className="flex flex-wrap gap-3">
            {safeSkills.map((s: string, i: number) => (
              <span 
                key={i} 
                className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all"
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
