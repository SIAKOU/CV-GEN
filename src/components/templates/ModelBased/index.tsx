import React, { useMemo } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { Model1Template } from './Model1';
import { Model2Template } from './Model2';
import { Model3Template } from './Model3';
import { Model4Template } from './Model4';
import { Model5Template } from './Model5';
import { Model6Template } from './Model6';
import { Model7Template } from './Model7';
import { Model8Template } from './Model8';
import { Model9Template } from './Model9';
import type { CVData } from '../../../types';

export const ModelBasedTemplate: React.FC = () => {
  // Get CV data from Redux store with separate selectors
  const personalInfo = useAppSelector((state) => state.cv.personalInfo);
  const experiences = useAppSelector((state) => state.cv.experiences);
  const education = useAppSelector((state) => state.cv.education);
  const projects = useAppSelector((state) => state.cv.projects);
  const skills = useAppSelector((state) => state.cv.skills);
  const skillCategories = useAppSelector((state) => state.cv.skillCategories);
  const languages = useAppSelector((state) => state.cv.languages);
  const certifications = useAppSelector((state) => state.cv.certifications);
  const interests = useAppSelector((state) => state.cv.interests);
  
  // Get selected model from Redux store
  const selectedModel = useAppSelector((state) => state.templates.selectedModel);

  // Memoize CV data to prevent unnecessary rerenders
  const cvData: CVData = useMemo(() => ({
    personalInfo,
    experiences,
    education,
    projects,
    skills,
    skillCategories,
    languages,
    certifications,
    interests,
  }), [personalInfo, experiences, education, projects, skills, skillCategories, languages, certifications, interests]);

  // Render the appropriate model based on selection
  const renderModel = () => {
    switch (selectedModel) {
      case 'model1':
        return <Model1Template cv={cvData} />;
      case 'model2':
        return <Model2Template cv={cvData} />;
      case 'model3':
        return <Model3Template cv={cvData} />;
      case 'model4':
        return <Model4Template cv={cvData} />;
      case 'model5':
        return <Model5Template cv={cvData} />;
      case 'model6':
        return <Model6Template cv={cvData} />;
      case 'model7':
        return <Model7Template cv={cvData} />;
      case 'model8':
        return <Model8Template cv={cvData} />;
      case 'model9':
        return <Model9Template cv={cvData} />;
      default:
        // Default to Model1 if no model is selected
        return <Model1Template cv={cvData} />;
    }
  };

  return <div className="model-based-template">{renderModel()}</div>;
};

export default ModelBasedTemplate;
