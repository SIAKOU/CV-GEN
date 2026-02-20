import React from 'react';
import { formatLocation } from '../../../utils/formatters';
import type { CVData, ExperienceEntry, EducationEntry, SkillCategory, LanguageEntry } from '../../../types';

// Model 5: Tech Minimalist - Clean code aesthetic, monospace fonts, developer-focused
export const Model5Template: React.FC<{ cv: CVData }> = ({ cv }) => {
  const { personalInfo, experiences = [], education = [], skills = [], skillCategories = [], languages = [] } = cv;

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 p-10 shadow-lg font-mono">
      {/* Header - Terminal Style */}
      <header className="mb-8 p-6 bg-black text-green-400 rounded">
        <div className="mb-2 text-xs text-gray-500">$ cat profile.txt</div>
        <h1 className="text-3xl font-bold mb-2">&gt; {personalInfo?.fullName || 'user@localhost'}</h1>
        {personalInfo?.title && (
          <p className="text-lg text-green-300 mb-3">// {personalInfo.title}</p>
        )}
        <div className="text-sm space-y-1">
          {personalInfo?.email && <p>📧 {personalInfo.email}</p>}
          {personalInfo?.phone && <p>📞 {personalInfo.phone}</p>}
          {personalInfo?.location && <p>📍 {formatLocation(personalInfo.location)}</p>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo?.summary && (
        <section className="mb-6 p-4 bg-white border-l-4 border-green-500">
          <div className="text-xs text-gray-500 mb-2">/* About */</div>
          <p className="text-gray-700 text-sm leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-green-500">&gt;&gt;</span> experience.log
          </h2>
          <div className="space-y-4">
            {experiences.map((exp: ExperienceEntry, i: number) => (
              <div key={i} className="p-4 bg-white border-l-2 border-gray-300">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-bold text-gray-900">{exp.role}</h3>
                  <span className="text-xs text-gray-500">
                    [{exp.startDate} - {exp.current ? 'now' : exp.endDate}]
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  @ {exp.company} {exp.location && `| ${exp.location}`}
                </p>
                {exp.description && <p className="text-xs text-gray-600 mb-2">{exp.description}</p>}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="text-xs text-gray-600 space-y-1">
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {exp.technologies.map((tech, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs border border-gray-300">
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
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-green-500">&gt;&gt;</span> education.md
          </h2>
          <div className="space-y-3">
            {education.map((edu: EducationEntry, i: number) => (
              <div key={i} className="p-3 bg-white border-l-2 border-gray-300">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                  <span className="text-xs text-gray-500">
                    [{edu.startDate} - {edu.current ? 'now' : edu.endDate}]
                  </span>
                </div>
                <p className="text-xs text-gray-700">{edu.institution}</p>
                {edu.honors && <p className="text-xs text-green-600 mt-1">★ {edu.honors}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {(skills.length > 0 || skillCategories.length > 0) && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-green-500">&gt;&gt;</span> skills.json
          </h2>
          <div className="p-4 bg-white">
            {skillCategories.length > 0 ? (
              <div className="space-y-3">
                {skillCategories.map((category: SkillCategory, i: number) => (
                  <div key={i}>
                    <h3 className="text-sm font-bold text-gray-700 mb-2">"{category.category}":</h3>
                    <div className="flex flex-wrap gap-2 ml-4">
                      {category.skills.map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs border border-gray-300">
                          {skill.name}
                          {skill.level && <span className="text-green-600"> [{skill.level}/5]</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: string, i: number) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs border border-gray-300">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-green-500">&gt;&gt;</span> languages.yml
          </h2>
          <div className="p-4 bg-white space-y-2">
            {languages.map((lang: LanguageEntry, i: number) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-900">- {lang.language}:</span>
                <span className="text-gray-600">{lang.level}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-8 p-4 bg-black text-green-400 rounded text-xs text-center">
        <p>$ echo "Generated with ❤️ by CV Generator"</p>
      </footer>
    </div>
  );
};
