import React from 'react';
import type { CVData, ExperienceEntry, EducationEntry, LanguageEntry } from '../../../types';

// Model 1: Professional Classic - Design identique au fichier modele1.jpeg
export const Model1Template: React.FC<{ cv: CVData }> = ({ cv }) => {
  const { personalInfo, experiences = [], education = [], skills = [], languages = [] } = cv;

  const formatLocationString = (location: string | { city?: string; country?: string; postalCode?: string } | undefined): string => {
    if (!location) return '';
    if (typeof location === 'string') return location;
    const parts = [location.city, location.country].filter(Boolean);
    return parts.join(', ');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white font-sans">
      {/* En-tête avec nom */}
      <div className="bg-white pt-8 px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {personalInfo?.fullName?.toUpperCase() || 'ADRIAN RAFAEL'}
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          {personalInfo?.title || 'Software Engineer'}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 px-8 pb-8">
        {/* Colonne de gauche (informations personnelles, compétences, langues, hobbies) */}
        <div className="col-span-1">
          {/* Summary */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Summary</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {personalInfo?.summary || 'Motivated Software Engineer with an exceptional educational background in computer science and technology. Proficient in essential software engineering skills, including full-stack development and network architecture.'}
            </p>
          </div>

          {/* Contact */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Contact</h2>
            <div className="space-y-1 text-sm text-gray-700">
              <p>{personalInfo?.email || 'adrianrafa@gmail.com'}</p>
              <p>{personalInfo?.phone || '+65 123-456-7890'}</p>
              <p>{formatLocationString(personalInfo?.location) || '128 Old Choa Chu Kang Rd, Singapore 698928'}</p>
              {personalInfo?.socialLinks?.portfolio && (
                <p className="text-blue-600">{personalInfo.socialLinks.portfolio}</p>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Skills</h2>
            <div className="space-y-1">
              {skills.length > 0 ? (
                skills.map((skill: string, i: number) => (
                  <p key={i} className="text-sm text-gray-700">{skill}</p>
                ))
              ) : (
                <>
                  <p className="text-sm text-gray-700">Programming</p>
                  <p className="text-sm text-gray-700">Communication</p>
                  <p className="text-sm text-gray-700">Collaboration</p>
                  <p className="text-sm text-gray-700">Problem-solving</p>
                </>
              )}
            </div>
          </div>

          {/* Languages */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Languages</h2>
            <div className="space-y-1">
              {languages.length > 0 ? (
                languages.map((lang: LanguageEntry, i: number) => (
                  <p key={i} className="text-sm text-gray-700">{lang.language}</p>
                ))
              ) : (
                <>
                  <p className="text-sm text-gray-700">English</p>
                  <p className="text-sm text-gray-700">Chinese</p>
                  <p className="text-sm text-gray-700">French</p>
                </>
              )}
            </div>
          </div>

          {/* Hobbies */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Hobbies</h2>
            <div className="flex space-x-3 text-xl">
              <span>🎨</span>
              <span>📚</span>
              <span>🔧</span>
            </div>
          </div>
        </div>

        {/* Colonne de droite (éducation, expérience) */}
        <div className="col-span-2">
          {/* Education */}
          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Education</h2>
            <div className="space-y-6">
              {education.length > 0 ? (
                education.map((edu: EducationEntry, i: number) => (
                  <div key={i}>
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-bold text-gray-900">{edu.startDate} - {edu.endDate}</p>
                      <p className="text-sm font-bold text-gray-900">{edu.institution}</p>
                    </div>
                    <p className="text-sm text-gray-700">{edu.degree}</p>
                    {edu.honors && <p className="text-sm text-gray-600 italic">GPA of {edu.honors}</p>}
                  </div>
                ))
              ) : (
                <>
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-bold text-gray-900">2012-2014</p>
                      <p className="text-sm font-bold text-gray-900">FRANKLIN UNIVERSITY</p>
                    </div>
                    <p className="text-sm text-gray-700">Completed his education with a Bachelor of Science in computer science with a GPA of 4.3.</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-bold text-gray-900">2014-2017</p>
                      <p className="text-sm font-bold text-gray-900">CERTIFICATIONS</p>
                    </div>
                    <p className="text-sm text-gray-700">Certified Associate in Python Programming (PCAP) – C++ Certified Associate Programmer (CPA).</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Work Experience</h2>
            <div className="space-y-6">
              {experiences.length > 0 ? (
                experiences.map((exp: ExperienceEntry, i: number) => (
                  <div key={i}>
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-bold text-gray-900">{exp.startDate} - {exp.current ? 'present' : exp.endDate}</p>
                      <p className="text-sm font-bold text-gray-900">{exp.company}</p>
                    </div>
                    <p className="text-sm text-gray-700 font-semibold mb-1">{exp.role}</p>
                    <p className="text-sm text-gray-700">{exp.description}</p>
                  </div>
                ))
              ) : (
                <>
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-bold text-gray-900">2016-2018</p>
                      <p className="text-sm font-bold text-gray-900">ONE TSURUGA.INC</p>
                    </div>
                    <p className="text-sm text-gray-700 font-semibold mb-1">Job title as Project Manager</p>
                    <p className="text-sm text-gray-700">Rewrite existing software programs for different operating systems.</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-bold text-gray-900">2018-2020</p>
                      <p className="text-sm font-bold text-gray-900">XYZ DEVELOPMENT CORP</p>
                    </div>
                    <p className="text-sm text-gray-700 font-semibold mb-1">Job title as Programmer</p>
                    <p className="text-sm text-gray-700">Use common programming languages, including HTML, C++ and Python.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};