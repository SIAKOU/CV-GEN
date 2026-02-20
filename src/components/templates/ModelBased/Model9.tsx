import React from 'react';
import { formatLocation } from '../../../utils/formatters';
import type { CVData, ExperienceEntry, EducationEntry, SkillCategory, CertificationEntry, ProjectEntry } from '../../../types';

// Model 9: Elegant Serif - Classic typography with serif fonts, sophisticated
export const Model9Template: React.FC<{ cv: CVData }> = ({ cv }) => {
  const { personalInfo, experiences = [], education = [], skills = [], skillCategories = [], certifications = [], projects = [] } = cv;

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-amber-50 to-orange-50 p-12 shadow-2xl">
      {/* Header - Elegant Centered */}
      <header className="text-center mb-10 pb-8 border-b-2 border-amber-800">
        <div className="mb-4">
          <div className="inline-block px-6 py-2 border-2 border-amber-800">
            <h1 className="text-5xl font-serif font-bold text-amber-900 tracking-wide">
              {personalInfo?.fullName || 'Votre Nom'}
            </h1>
          </div>
        </div>
        {personalInfo?.title && (
          <p className="text-xl text-amber-800 font-serif italic mb-6">{personalInfo.title}</p>
        )}
        <div className="flex justify-center gap-8 text-sm text-gray-700">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>|</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.location && <span>|</span>}
          {personalInfo?.location && <span>{formatLocation(personalInfo.location)}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo?.summary && (
        <section className="mb-8 text-center">
          <div className="inline-block max-w-3xl">
            <div className="text-6xl text-amber-300 leading-none mb-2">"</div>
            <p className="text-gray-700 leading-relaxed font-serif italic text-lg px-8">
              {personalInfo.summary}
            </p>
            <div className="text-6xl text-amber-300 leading-none text-right">"</div>
          </div>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-amber-900 mb-6 text-center">
            ◆ Expérience Professionnelle ◆
          </h2>
          <div className="space-y-6">
            {experiences.map((exp: ExperienceEntry, i: number) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-amber-600">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-serif font-bold text-gray-900">{exp.role}</h3>
                  <span className="text-sm text-amber-700 font-semibold whitespace-nowrap ml-4">
                    {exp.startDate} – {exp.current ? 'Présent' : exp.endDate}
                  </span>
                </div>
                <p className="text-lg text-amber-800 font-serif italic mb-2">{exp.company}</p>
                {exp.location && <p className="text-sm text-gray-600 mb-3">{exp.location}</p>}
                {exp.description && <p className="text-gray-700 mb-3 leading-relaxed">{exp.description}</p>}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="space-y-2">
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-amber-600 font-bold">•</span>
                        <span className="text-gray-600">{ach}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {exp.technologies.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold border border-amber-300">
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
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-amber-900 mb-6 text-center">
            ◆ Formation ◆
          </h2>
          <div className="space-y-4">
            {education.map((edu: EducationEntry, i: number) => (
              <div key={i} className="bg-white p-5 rounded-lg shadow-md">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-serif font-bold text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-amber-700 font-semibold whitespace-nowrap ml-4">
                    {edu.startDate} – {edu.current ? 'En cours' : edu.endDate}
                  </span>
                </div>
                <p className="text-gray-700 font-serif italic">{edu.institution}</p>
                {edu.honors && (
                  <p className="text-amber-700 font-semibold mt-2">★ {edu.honors}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-amber-900 mb-6 text-center">
            ◆ Projets Notables ◆
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {projects.map((project: ProjectEntry, i: number) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-amber-600">
                <h3 className="font-serif font-bold text-gray-900 mb-2">{project.name}</h3>
                {project.description && <p className="text-gray-600 text-sm mb-2">{project.description}</p>}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="px-2 py-1 bg-amber-50 text-amber-700 text-xs border border-amber-200">
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
        {/* Skills */}
        {(skills.length > 0 || skillCategories.length > 0) && (
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-serif font-bold text-amber-900 mb-4 text-center border-b-2 border-amber-300 pb-2">
              Compétences
            </h2>
            {skillCategories.length > 0 ? (
              <div className="space-y-3">
                {skillCategories.map((category: SkillCategory, i: number) => (
                  <div key={i}>
                    <h3 className="font-serif font-semibold text-amber-800 mb-2">{category.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, idx) => (
                        <span key={idx} className="text-sm text-gray-700">
                          {skill.name}
                          {idx < category.skills.length - 1 && ' •'}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-amber-100 text-amber-800 text-sm font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-serif font-bold text-amber-900 mb-4 text-center border-b-2 border-amber-300 pb-2">
              Certifications
            </h2>
            <div className="space-y-3">
              {certifications.map((cert: CertificationEntry, i: number) => (
                <div key={i}>
                  <h3 className="font-serif font-bold text-gray-900 text-sm">{cert.name}</h3>
                  <p className="text-gray-600 text-xs">{cert.issuer}</p>
                  <p className="text-amber-700 text-xs font-semibold">{cert.issueDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer Decoration */}
      <div className="mt-8 text-center">
        <div className="inline-block border-t-2 border-amber-800 w-32"></div>
      </div>
    </div>
  );
};
