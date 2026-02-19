import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { PersonalInfo, ExperienceEntry } from '../../types';

interface CVData {
  personalInfo?: PersonalInfo;
  experiences: ExperienceEntry[];
  skills: string[];
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottom: '2 solid #3B82F6',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 10,
    color: '#4B5563',
    marginTop: 5,
  },
  section: {
    marginTop: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  role: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  company: {
    fontSize: 11,
    color: '#4B5563',
    marginBottom: 2,
  },
  dates: {
    fontSize: 9,
    color: '#6B7280',
  },
  description: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.4,
    marginTop: 4,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skill: {
    backgroundColor: '#EFF6FF',
    color: '#1E40AF',
    padding: '4 8',
    borderRadius: 4,
    fontSize: 9,
  },
});

export const CVPDFDocument: React.FC<{ data: CVData }> = ({ data }) => {
  const { personalInfo, experiences, skills } = data;

  return React.createElement(Document, null,
    React.createElement(Page, { size: 'A4', style: styles.page },
      // Header
      React.createElement(View, { style: styles.header },
        React.createElement(Text, { style: styles.name }, personalInfo?.fullName || 'Nom complet'),
        personalInfo?.title && React.createElement(Text, { style: styles.title }, personalInfo.title),
        React.createElement(View, { style: styles.contactInfo },
          React.createElement(Text, null, 
            [personalInfo?.email, personalInfo?.phone, personalInfo?.location]
              .filter(Boolean)
              .join(' • ')
          )
        )
      ),

      // Expériences
      experiences.length > 0 && React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, 'Expérience Professionnelle'),
        ...experiences.map((exp, index) =>
          React.createElement(View, { key: index, style: styles.experienceItem },
            React.createElement(View, { style: styles.experienceHeader },
              React.createElement(View, null,
                React.createElement(Text, { style: styles.role }, exp.role),
                React.createElement(Text, { style: styles.company }, exp.company)
              ),
              React.createElement(Text, { style: styles.dates }, 
                `${exp.startDate || ''} - ${exp.endDate || 'Présent'}`
              )
            ),
            exp.description && React.createElement(Text, { style: styles.description }, exp.description)
          )
        )
      ),

      // Compétences
      skills.length > 0 && React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, 'Compétences'),
        React.createElement(View, { style: styles.skillsContainer },
          ...skills.map((skill, index) =>
            React.createElement(Text, { key: index, style: styles.skill }, skill)
          )
        )
      )
    )
  );
};
