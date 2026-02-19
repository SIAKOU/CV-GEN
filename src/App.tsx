import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserIcon, 
  BriefcaseIcon, 
  AcademicCapIcon,
  BeakerIcon,
  GlobeAltIcon,
  TrophyIcon,
  FolderIcon,
  HeartIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon 
} from '@heroicons/react/24/outline';
import { PersonalInfoForm } from './components/forms/PersonalInfo';
import { ExperienceForm } from './components/forms/Experience';
import { EducationForm } from './components/forms/Education';
import { SkillsForm } from './components/forms/Skills';
import { LanguagesForm } from './components/forms/Languages';
import { CertificationsForm } from './components/forms/Certifications';
import { ProjectsForm } from './components/forms/Projects';
import { InterestsForm } from './components/forms/Interests';
import { CVPreview } from './components/preview/CVPreview';
import { Toast } from './components/common/Toast';
import { ThemeToggle } from './components/common/ThemeToggle';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { hideToast } from './store/uiSlice';

const steps = [
  { id: 'personal', label: 'Profil', icon: UserIcon },
  { id: 'experience', label: 'Expérience', icon: BriefcaseIcon },
  { id: 'education', label: 'Formation', icon: AcademicCapIcon },
  { id: 'skills', label: 'Compétences', icon: BeakerIcon },
  { id: 'languages', label: 'Langues', icon: GlobeAltIcon },
  { id: 'certifications', label: 'Certifications', icon: TrophyIcon },
  { id: 'projects', label: 'Projets', icon: FolderIcon },
  { id: 'interests', label: 'Centres d\'intérêt', icon: HeartIcon },
  { id: 'preview', label: 'Aperçu', icon: EyeIcon },
] as const;

type StepId = typeof steps[number]['id'];

export const App: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const current = steps[step].id as StepId;
  const dispatch = useAppDispatch();
  const toast = useAppSelector((s) => s.ui.toast);

  const go = (delta: number) => {
    setStep((s) => Math.min(Math.max(s + delta, 0), steps.length - 1));
  };

  const renderStep = () => {
    switch (current) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'skills':
        return <SkillsForm />;
      case 'languages':
        return <LanguagesForm />;
      case 'certifications':
        return <CertificationsForm />;
      case 'projects':
        return <ProjectsForm />;
      case 'interests':
        return <InterestsForm />;
      case 'preview':
        return <CVPreview />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => dispatch(hideToast())}
      />

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Générateur de CV Pro
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Créez votre CV professionnel en quelques minutes</p>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full font-medium">
                  Étape {step + 1} / {steps.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <nav className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === step;
              const isCompleted = i < step;
              
              return (
                <React.Fragment key={s.id}>
                  <button
                    onClick={() => setStep(i)}
                    className={`flex flex-col items-center gap-2 transition-all duration-200 ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : isCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span
                      className={`text-sm font-medium hidden sm:block ${
                        isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                  {i < steps.length - 1 && (
                    <div className="flex-1 h-1 mx-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                        initial={{ width: '0%' }}
                        animate={{ width: i < step ? '100%' : '0%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </nav>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          <motion.section
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 mb-6 transition-colors duration-300"
          >
            {renderStep()}
          </motion.section>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => go(-1)}
            disabled={step === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              step === 0
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg'
            }`}
          >
            <ChevronLeftIcon className="h-5 w-5" />
            Précédent
          </button>
          
          <button
            onClick={() => go(1)}
            disabled={step === steps.length - 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              step === steps.length - 1
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg'
            }`}
          >
            Suivant
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
