import React from 'react';
import { formatLocation } from '../../../utils/formatters';
import type { CVData, ExperienceEntry, EducationEntry, ProjectEntry, CertificationEntry } from '../../../types';

// Model 7: Timeline Design - Vertical timeline with icons
export const Model7Template: React.FC<{ cv: CVData }> = ({ cv }) => {
  const { personalInfo, experiences = [], education = [], skills = [], projects = [], certifications = [] } = cv;

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-teal-50 to-cyan-50 p-10 shadow-xl">
      {/* Header */}
      <header className="text-center mb-10 pb-8 border-b-4 border-teal-500">
        <h1 className="text-5xl font-bold text-gray-900 mb-3">{personalInfo?.fullName || 'Votre Nom'}</h1>
        {personalInfo?.title && (
          <p className="text-2xl text-teal-700 font-semibold mb-4">{personalInfo.title}</p>
        )}
        <div className="flex justify-center gap-6 text-sm text-gray-700">
          {personalInfo?.email && <span>✉️ {personalInfo.email}</span>}
          {personalInfo?.phone && <span>📞 {personalInfo.phone}</span>}
          {personalInfo?.location && <span>📍 {formatLocation(personalInfo.location)}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo?.summary && (
        <section className="mb-10 p-6 bg-white rounded-lg shadow-md">
          <p className="text-gray-700 leading-relaxed text-center italic">{personalInfo.summary}</p>
        </section>
      )}

      {/* Timeline - Experience */}
      {experiences.length > 0 && (
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-teal-700 mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white">💼</span>
            Parcours Professionnel
          </h2>
          <div className="relative pl-8 border-l-4 border-teal-300">
            {experiences.map((exp: ExperienceEntry, i: number) => (
              <div key={i} className="mb-8 relative">
                <div className="absolute -left-10 w-6 h-6 bg-teal-500 rounded-full border-4 border-white"></div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
                    <span className="text-sm text-teal-600 font-semibold whitespace-nowrap ml-4">
                      {exp.startDate} - {exp.current ? 'Présent' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-teal-700 font-bold text-lg mb-2">{exp.company}</p>
                  {exp.location && <p className="text-gray-500 text-sm mb-3">📍 {exp.location}</p>}
                  {exp.description && <p className="text-gray-600 mb-3">{exp.description}</p>}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-2 mb-3">
                      {exp.achievements.map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-teal-500 font-bold mt-1">✓</span>
                          <span className="text-gray-600">{ach}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Timeline - Education */}
      {education.length > 0 && (
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-teal-700 mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white">🎓</span>
            Formation
          </h2>
          <div className="relative pl-8 border-l-4 border-teal-300">
            {education.map((edu: EducationEntry, i: number) => (
              <div key={i} className="mb-6 relative">
                <div className="absolute -left-10 w-6 h-6 bg-teal-500 rounded-full border-4 border-white"></div>
                <div className="bg-white p-5 rounded-lg shadow-md">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                    <span className="text-sm text-teal-600 font-semibold whitespace-nowrap ml-4">
                      {edu.startDate} - {edu.current ? 'En cours' : edu.endDate}
                    </span>
                  </div>
                  <p className="text-gray-700 font-semibold">{edu.institution}</p>
                  {edu.honors && <p className="text-teal-600 font-semibold mt-1">🏆 {edu.honors}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-teal-700 mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white">🚀</span>
            Projets
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {projects.map((project: ProjectEntry, i: number) => (
              <div key={i} className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="font-bold text-gray-900 mb-2">{project.name}</h3>
                {project.description && <p className="text-gray-600 text-sm mb-2">{project.description}</p>}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="px-2 py-1 bg-teal-50 text-teal-600 text-xs rounded">
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

      {/* Skills & Certifications */}
      <div className="grid grid-cols-2 gap-6">
        {skills.length > 0 && (
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-teal-700 mb-4">Compétences</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: string, i: number) => (
                <span key={i} className="px-3 py-2 bg-teal-100 text-teal-800 text-sm font-semibold rounded">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-teal-700 mb-4">Certifications</h2>
            <div className="space-y-2">
              {certifications.map((cert: CertificationEntry, i: number) => (
                <div key={i}>
                  <h3 className="font-semibold text-gray-900 text-sm">{cert.name}</h3>
                  <p className="text-gray-600 text-xs">{cert.issuer} • {cert.issueDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
