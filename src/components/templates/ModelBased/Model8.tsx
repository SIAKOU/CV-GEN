import React from 'react';
import { formatLocation } from '../../../utils/formatters';
import type { CVData, ExperienceEntry, EducationEntry, ProjectEntry, LanguageEntry } from '../../../types';

// Model 8: Magazine Style - Editorial layout with columns and visual hierarchy
export const Model8Template: React.FC<{ cv: CVData }> = ({ cv }) => {
  const { personalInfo, experiences = [], education = [], skills = [], projects = [], languages = [] } = cv;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl">
      {/* Header - Magazine Cover Style */}
      <header className="relative bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 text-white p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <div className="text-xs font-bold tracking-widest mb-2 text-pink-200">CURRICULUM VITAE</div>
          <h1 className="text-6xl font-black mb-3 leading-tight">{personalInfo?.fullName || 'VOTRE NOM'}</h1>
          {personalInfo?.title && (
            <p className="text-2xl font-light text-pink-100 mb-6">{personalInfo.title}</p>
          )}
          <div className="flex gap-6 text-sm">
            {personalInfo?.email && <span>{personalInfo.email}</span>}
            {personalInfo?.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo?.location && <span>• {formatLocation(personalInfo.location)}</span>}
          </div>
        </div>
      </header>

      <div className="p-10">
        {/* Summary - Pull Quote Style */}
        {personalInfo?.summary && (
          <section className="mb-8 p-8 border-l-8 border-rose-500 bg-rose-50">
            <p className="text-xl text-gray-800 leading-relaxed italic font-light">
              "{personalInfo.summary}"
            </p>
          </section>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-8">
          {/* Main Content - 2 columns */}
          <div className="col-span-2 space-y-8">
            {/* Experience */}
            {experiences.length > 0 && (
              <section>
                <h2 className="text-4xl font-black text-gray-900 mb-6 relative">
                  <span className="relative z-10">EXPÉRIENCE</span>
                  <div className="absolute bottom-0 left-0 w-24 h-3 bg-rose-300 -z-0"></div>
                </h2>
                <div className="space-y-6">
                  {experiences.map((exp: ExperienceEntry, i: number) => (
                    <article key={i} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{exp.role}</h3>
                        <span className="text-sm text-rose-600 font-bold whitespace-nowrap ml-4">
                          {exp.startDate} - {exp.current ? 'PRÉSENT' : exp.endDate}
                        </span>
                      </div>
                      <p className="text-lg text-rose-600 font-bold mb-2">{exp.company}</p>
                      {exp.location && <p className="text-sm text-gray-500 mb-3">{exp.location}</p>}
                      {exp.description && <p className="text-gray-700 mb-3 leading-relaxed">{exp.description}</p>}
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="space-y-2">
                          {exp.achievements.map((ach, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="text-gray-600">{ach}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {exp.technologies.map((tech, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section>
                <h2 className="text-4xl font-black text-gray-900 mb-6 relative">
                  <span className="relative z-10">PROJETS</span>
                  <div className="absolute bottom-0 left-0 w-24 h-3 bg-pink-300 -z-0"></div>
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {projects.map((project: ProjectEntry, i: number) => (
                    <div key={i} className="p-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg">
                      <h3 className="font-bold text-gray-900 mb-2">{project.name}</h3>
                      {project.description && <p className="text-gray-600 text-sm mb-2">{project.description}</p>}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech, idx) => (
                            <span key={idx} className="px-2 py-1 bg-white text-rose-600 text-xs font-semibold rounded">
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

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Education */}
            {education.length > 0 && (
              <section className="bg-gray-50 p-5 rounded-lg">
                <h2 className="text-xl font-black text-gray-900 mb-4 uppercase">Formation</h2>
                <div className="space-y-4">
                  {education.map((edu: EducationEntry, i: number) => (
                    <div key={i} className="border-l-4 border-rose-500 pl-3">
                      <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                      <p className="text-gray-700 text-xs">{edu.institution}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {edu.startDate} - {edu.current ? 'En cours' : edu.endDate}
                      </p>
                      {edu.honors && <p className="text-rose-600 text-xs font-bold mt-1">{edu.honors}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <section className="bg-gradient-to-br from-rose-500 to-pink-600 text-white p-5 rounded-lg">
                <h2 className="text-xl font-black mb-4 uppercase">Compétences</h2>
                <div className="space-y-2">
                  {skills.map((skill: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm font-semibold">{skill}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <section className="bg-gray-50 p-5 rounded-lg">
                <h2 className="text-xl font-black text-gray-900 mb-4 uppercase">Langues</h2>
                <div className="space-y-3">
                  {languages.map((lang: LanguageEntry, i: number) => (
                    <div key={i}>
                      <p className="font-bold text-gray-900 text-sm">{lang.language}</p>
                      <p className="text-rose-600 text-xs font-semibold">{lang.level}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
