import React from 'react';
import { formatLocation } from '../../../utils/formatters';
import type { CVData, ExperienceEntry, EducationEntry, LanguageEntry, ProjectEntry } from '../../../types';

// Model 2: Modern Elegant - Header bleu, layout 2 colonnes, style contemporain
export const Model2Template: React.FC<{ cv: CVData }> = ({ cv }) => {
  const { personalInfo, experiences = [], education = [], skills = [], languages = [], projects = [] } = cv;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl">
      {/* Header - Modern Blue Gradient */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-10">
        <h1 className="text-5xl font-bold mb-3">{personalInfo?.fullName || 'Votre Nom'}</h1>
        {personalInfo?.title && (
          <p className="text-2xl text-blue-100 mb-4 font-light">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap gap-4 text-sm">
          {personalInfo?.email && <span className="flex items-center gap-2">📧 {personalInfo.email}</span>}
          {personalInfo?.phone && <span className="flex items-center gap-2">📱 {personalInfo.phone}</span>}
          {personalInfo?.location && <span className="flex items-center gap-2">📍 {formatLocation(personalInfo.location)}</span>}
        </div>
      </header>

      <div className="p-10">
        {/* Summary */}
        {personalInfo?.summary && (
          <section className="mb-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
            <p className="text-gray-700 leading-relaxed italic">{personalInfo.summary}</p>
          </section>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-8">
          {/* Main Content - 2/3 */}
          <div className="col-span-2 space-y-8">
            {/* Experience */}
            {experiences.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-3">
                  <span className="w-10 h-1 bg-blue-600 rounded"></span>
                  Expérience Professionnelle
                </h2>
                <div className="space-y-6">
                  {experiences.map((exp: ExperienceEntry, i: number) => (
                    <div key={i} className="relative pl-6 border-l-2 border-blue-200">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                      <h3 className="text-lg font-bold text-gray-900">{exp.role}</h3>
                      <p className="text-blue-600 font-semibold">{exp.company}</p>
                      <p className="text-sm text-gray-500 mb-2">
                        {exp.startDate} - {exp.current ? 'Présent' : exp.endDate}
                        {exp.location && ` • ${exp.location}`}
                      </p>
                      {exp.description && <p className="text-gray-600 mb-2">{exp.description}</p>}
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                          {exp.achievements.map((ach, idx) => (
                            <li key={idx}>{ach}</li>
                          ))}
                        </ul>
                      )}
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {exp.technologies.map((tech, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">
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
                <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-3">
                  <span className="w-10 h-1 bg-blue-600 rounded"></span>
                  Formation
                </h2>
                <div className="space-y-4">
                  {education.map((edu: EducationEntry, i: number) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-600">
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-700">{edu.institution}</p>
                      <p className="text-sm text-gray-500">
                        {edu.startDate} - {edu.current ? 'En cours' : edu.endDate}
                      </p>
                      {edu.honors && <p className="text-blue-600 text-sm font-semibold mt-1">{edu.honors}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-3">
                  <span className="w-10 h-1 bg-blue-600 rounded"></span>
                  Projets
                </h2>
                <div className="space-y-4">
                  {projects.map((project: ProjectEntry, i: number) => (
                    <div key={i} className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-bold text-gray-900">{project.name}</h3>
                      {project.description && <p className="text-gray-700 text-sm mt-1">{project.description}</p>}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.technologies.map((tech, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded">
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
          </div>

          {/* Sidebar - 1/3 */}
          <div className="space-y-8">
            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
                  Compétences
                </h2>
                <div className="space-y-2">
                  {skills.map((skill: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
                  Langues
                </h2>
                <div className="space-y-3">
                  {languages.map((lang: LanguageEntry, i: number) => (
                    <div key={i}>
                      <p className="font-semibold text-gray-900">{lang.language}</p>
                      <p className="text-sm text-gray-600">{lang.level}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Social Links */}
            {personalInfo?.socialLinks && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
                  Liens
                </h2>
                <div className="space-y-2 text-sm">
                  {personalInfo.socialLinks.linkedin && (
                    <a href={personalInfo.socialLinks.linkedin} className="block text-blue-600 hover:underline truncate">
                      LinkedIn
                    </a>
                  )}
                  {personalInfo.socialLinks.github && (
                    <a href={personalInfo.socialLinks.github} className="block text-blue-600 hover:underline truncate">
                      GitHub
                    </a>
                  )}
                  {personalInfo.socialLinks.portfolio && (
                    <a href={personalInfo.socialLinks.portfolio} className="block text-blue-600 hover:underline truncate">
                      Portfolio
                    </a>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
