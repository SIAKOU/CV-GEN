import React from 'react';
import type { CVData, ExperienceEntry, EducationEntry } from '../../../types';

// Model 3: Creative Dynamic - Gradients colorés, design audacieux pour créatifs
export const Model3Template: React.FC<{ cv: CVData }> = ({ cv }) => {
  const { personalInfo, experiences = [], education = [], skills = [] } = cv;

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-12 shadow-2xl rounded-3xl">
      {/* Header - Creative with Avatar */}
      <header className="text-center mb-10">
        <div className="inline-block p-8 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-full mb-6 shadow-2xl">
          <h1 className="text-4xl font-black text-white">
            {personalInfo?.fullName?.split(' ').map((n: string) => n[0]).join('') || 'YN'}
          </h1>
        </div>
        <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-3">
          {personalInfo?.fullName || 'Votre Nom'}
        </h1>
        {personalInfo?.title && (
          <p className="text-2xl text-gray-700 font-bold mb-6">{personalInfo.title}</p>
        )}
        <div className="flex justify-center gap-6 text-sm font-semibold text-gray-600 flex-wrap">
          {personalInfo?.email && (
            <span className="px-4 py-2 bg-white rounded-full shadow-md">{personalInfo.email}</span>
          )}
          {personalInfo?.phone && (
            <span className="px-4 py-2 bg-white rounded-full shadow-md">{personalInfo.phone}</span>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo?.summary && (
        <section className="mb-8 p-6 bg-white rounded-2xl shadow-xl">
          <h2 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            💫 À Propos
          </h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      <div className="space-y-8">
        {/* Experience */}
        {experiences.length > 0 && (
          <section className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              ✨ Expérience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp: ExperienceEntry, i: number) => (
                <div key={i} className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-l-4 border-purple-500">
                  <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
                  <p className="text-purple-600 font-bold text-lg">{exp.company}</p>
                  <p className="text-sm text-gray-600 mb-3">
                    {exp.startDate} - {exp.current ? 'Présent' : exp.endDate}
                  </p>
                  {exp.description && <p className="text-gray-700 mb-3">{exp.description}</p>}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-2">
                      {exp.achievements.map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-purple-500 font-bold">→</span>
                          <span className="text-gray-700">{ach}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.technologies.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-black bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-6">
              🎓 Formation
            </h2>
            <div className="space-y-4">
              {education.map((edu: EducationEntry, i: number) => (
                <div key={i} className="p-6 bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl">
                  <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-orange-600 font-semibold">{edu.institution}</p>
                  <p className="text-sm text-gray-600">
                    {edu.startDate} - {edu.current ? 'En cours' : edu.endDate}
                  </p>
                  {edu.honors && (
                    <p className="text-purple-600 font-semibold mt-2">🏆 {edu.honors}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-black bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-6">
              🚀 Compétences
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill: string, i: number) => (
                <span key={i} className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-transform">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
