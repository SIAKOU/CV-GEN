import React from 'react';
import { formatLocation } from '../../../utils/formatters';
import type { CVData, ExperienceEntry, EducationEntry, SkillCategory, LanguageEntry, InterestEntry } from '../../../types';

// Model 6: Sidebar Layout - Left sidebar with photo, main content on right
export const Model6Template: React.FC<{ cv: CVData }> = ({ cv }) => {
  const { personalInfo, experiences = [], education = [], skills = [], skillCategories = [], languages = [], interests = [] } = cv;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl flex">
      {/* Left Sidebar */}
      <aside className="w-1/3 bg-gradient-to-b from-indigo-900 to-indigo-700 text-white p-6">
        {/* Profile */}
        <div className="text-center mb-6">
          <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-full flex items-center justify-center text-indigo-900 text-4xl font-bold">
            {personalInfo?.fullName?.split(' ').map(n => n[0]).join('') || 'YN'}
          </div>
          <h1 className="text-2xl font-bold mb-2">{personalInfo?.fullName || 'Votre Nom'}</h1>
          {personalInfo?.title && (
            <p className="text-indigo-200 text-sm">{personalInfo.title}</p>
          )}
        </div>

        {/* Contact */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 pb-2 border-b border-indigo-500">CONTACT</h2>
          <div className="space-y-2 text-sm">
            {personalInfo?.email && (
              <p className="break-words">📧 {personalInfo.email}</p>
            )}
            {personalInfo?.phone && (
              <p>📱 {personalInfo.phone}</p>
            )}
            {personalInfo?.location && (
              <p>📍 {formatLocation(personalInfo.location)}</p>
            )}
          </div>
        </section>

        {/* Skills */}
        {(skills.length > 0 || skillCategories.length > 0) && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3 pb-2 border-b border-indigo-500">COMPÉTENCES</h2>
            {skillCategories.length > 0 ? (
              <div className="space-y-3">
                {skillCategories.map((category: SkillCategory, i: number) => (
                  <div key={i}>
                    <h3 className="text-xs font-semibold text-indigo-300 mb-2">{category.category}</h3>
                    <div className="space-y-1">
                      {category.skills.map((skill, idx) => (
                        <div key={idx} className="text-sm">
                          <p>{skill.name}</p>
                          {skill.level && (
                            <div className="flex gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-4 h-1 rounded ${
                                    i < (skill.level || 0) ? 'bg-indigo-300' : 'bg-indigo-800'
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {skills.map((skill: string, i: number) => (
                  <p key={i} className="text-sm">• {skill}</p>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3 pb-2 border-b border-indigo-500">LANGUES</h2>
            <div className="space-y-2">
              {languages.map((lang: LanguageEntry, i: number) => (
                <div key={i} className="text-sm">
                  <p className="font-semibold">{lang.language}</p>
                  <p className="text-indigo-200 text-xs">{lang.level}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Interests */}
        {interests.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-3 pb-2 border-b border-indigo-500">CENTRES D'INTÉRÊT</h2>
            <div className="space-y-2">
              {interests.map((interest: InterestEntry, i: number) => (
                <div key={i} className="text-sm">
                  <p className="font-semibold">{interest.title}</p>
                  {interest.description && (
                    <p className="text-indigo-200 text-xs">{interest.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-8">
        {/* Summary */}
        {personalInfo?.summary && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold text-indigo-900 mb-3">PROFIL</h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">EXPÉRIENCE</h2>
            <div className="space-y-4">
              {experiences.map((exp: ExperienceEntry, i: number) => (
                <div key={i} className="border-l-4 border-indigo-300 pl-4">
                  <h3 className="text-lg font-bold text-gray-900">{exp.role}</h3>
                  <p className="text-indigo-700 font-semibold">{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    {exp.startDate} - {exp.current ? 'Présent' : exp.endDate}
                  </p>
                  {exp.description && <p className="text-gray-600 text-sm mb-2">{exp.description}</p>}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                      {exp.achievements.map((ach, idx) => (
                        <li key={idx}>{ach}</li>
                      ))}
                    </ul>
                  )}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {exp.technologies.map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">
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
          <section>
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">FORMATION</h2>
            <div className="space-y-3">
              {education.map((edu: EducationEntry, i: number) => (
                <div key={i} className="border-l-4 border-indigo-300 pl-4">
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  <p className="text-sm text-gray-500">
                    {edu.startDate} - {edu.current ? 'En cours' : edu.endDate}
                  </p>
                  {edu.honors && <p className="text-indigo-600 text-sm font-semibold">{edu.honors}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
