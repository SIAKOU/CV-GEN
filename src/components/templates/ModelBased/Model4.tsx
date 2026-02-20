import React from 'react';
import { formatLocation } from '../../../utils/formatters';
import type { CVData, ExperienceEntry, EducationEntry, LanguageEntry, CertificationEntry, ProjectEntry } from '../../../types';

// Model 4: Corporate Professional - Clean, structured, business-focused
export const Model4Template: React.FC<{ cv: CVData }> = ({ cv }) => {
  const { personalInfo, experiences = [], education = [], skills = [], languages = [], certifications = [], projects = [] } = cv;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl">
      {/* Header - Corporate Style */}
      <header className="bg-gray-800 text-white p-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2">{personalInfo?.fullName || 'Votre Nom'}</h1>
            {personalInfo?.title && (
              <p className="text-xl text-gray-300">{personalInfo.title}</p>
            )}
          </div>
          <div className="text-right text-sm">
            {personalInfo?.email && <p>{personalInfo.email}</p>}
            {personalInfo?.phone && <p>{personalInfo.phone}</p>}
            {personalInfo?.location && <p>{formatLocation(personalInfo.location)}</p>}
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Summary */}
        {personalInfo?.summary && (
          <section className="mb-6 p-4 bg-gray-50 border-l-4 border-gray-800">
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300">
              EXPÉRIENCE PROFESSIONNELLE
            </h2>
            <div className="space-y-4">
              {experiences.map((exp: ExperienceEntry, i: number) => (
                <div key={i} className="pl-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-bold text-gray-900">{exp.role}</h3>
                    <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                      {exp.startDate} - {exp.current ? 'Présent' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-700 font-semibold mb-2">
                    {exp.company} {exp.location && `| ${exp.location}`}
                  </p>
                  {exp.description && <p className="text-gray-600 mb-2">{exp.description}</p>}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {exp.achievements.map((ach, idx) => (
                        <li key={idx}>{ach}</li>
                      ))}
                    </ul>
                  )}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {exp.technologies.map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-medium">
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
          <section className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300">
              FORMATION
            </h2>
            <div className="space-y-3">
              {education.map((edu: EducationEntry, i: number) => (
                <div key={i} className="pl-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                      {edu.startDate} - {edu.current ? 'En cours' : edu.endDate}
                    </span>
                  </div>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.honors && <p className="text-gray-600 italic">{edu.honors}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300">
              PROJETS
            </h2>
            <div className="space-y-3">
              {projects.map((project: ProjectEntry, i: number) => (
                <div key={i} className="pl-4">
                  <h3 className="font-bold text-gray-900">{project.name}</h3>
                  {project.description && <p className="text-gray-600 text-sm">{project.description}</p>}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs">
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

        {/* Skills & Languages Grid */}
        <div className="grid grid-cols-2 gap-6">
          {skills.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300">
                COMPÉTENCES
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300">
                LANGUES
              </h2>
              <div className="space-y-2">
                {languages.map((lang: LanguageEntry, i: number) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-gray-900">{lang.language}</span>
                    <span className="text-gray-600">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300">
              CERTIFICATIONS
            </h2>
            <div className="space-y-2">
              {certifications.map((cert: CertificationEntry, i: number) => (
                <div key={i} className="flex justify-between items-baseline pl-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                    <p className="text-gray-600 text-sm">{cert.issuer}</p>
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap ml-4">{cert.issueDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
