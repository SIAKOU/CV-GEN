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
import { Sparkles } from 'lucide-react';
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
import { setSelectedModel } from './store/templatesSlice';

// new components
import { HomePage } from './components/HomePage';
import { Analyzer } from './components/Analyzer';
import { ModelSelector } from './components/ModelSelector';

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
  // view can be 'home', 'modelSelector', 'wizard', or 'analyzer'
  const [view, setView] = useState<'home' | 'modelSelector' | 'wizard' | 'analyzer'>('home');
  const [step, setStep] = useState<number>(0);
  const current = steps[step].id as StepId;
  const dispatch = useAppDispatch();
  const toast = useAppSelector((s) => s.ui.toast);
  const selectedModel = useAppSelector((s) => s.templates.selectedModel);

  const go = (delta: number) => {
    setStep((s) => Math.min(Math.max(s + delta, 0), steps.length - 1));
  };

  const handleModelSelect = (modelId: string) => {
    dispatch(setSelectedModel(modelId as any));
    setView('wizard');
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

  if (view === 'home') {
    return (
      <div>
        <HomePage
          onGenerate={() => setView('modelSelector')}
          onAnalyze={() => setView('analyzer')}
        />
      </div>
    );
  }

  if (view === 'modelSelector') {
    return (
      <div>
        <ModelSelector
          onSelectModel={handleModelSelect}
          onBack={() => setView('home')}
        />
      </div>
    );
  }

  if (view === 'analyzer') {
    return (
      <div>
        <Analyzer onBack={() => setView('home')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => dispatch(hideToast())}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CV Pro AI
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Créez votre CV professionnel</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {selectedModel && (
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                  <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                    Modèle: {selectedModel}
                  </span>
                </div>
              )}
              <button
                onClick={() => {
                  setStep(0);
                  setView('home');
                }}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Accueil
              </button>
              <ThemeToggle />
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg">
                  {step + 1} / {steps.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <nav className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === step;
              const isCompleted = i < step;
              
              return (
                <React.Fragment key={s.id}>
                  <button
                    onClick={() => setStep(i)}
                    className={`flex flex-col items-center gap-2 transition-all duration-200 group ${
                      isActive ? 'scale-110' : 'scale-100 hover:scale-105'
                    }`}
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/50'
                          : isCompleted
                          ? 'bg-green-500 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-600'
                      }`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <span
                      className={`text-xs font-semibold hidden lg:block ${
                        isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                  {i < steps.length - 1 && (
                    <div className="flex-1 h-2 mx-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
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
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 sm:p-10 mb-8 transition-colors duration-300 border border-gray-100 dark:border-gray-700"
          >
            {renderStep()}
          </motion.section>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => go(-1)}
            disabled={step === 0}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-200 ${
              step === 0
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-xl hover:shadow-2xl border-2 border-gray-200 dark:border-gray-700 hover:scale-105'
            }`}
          >
            <ChevronLeftIcon className="h-5 w-5" />
            Précédent
          </button>
          
          <button
            onClick={() => go(1)}
            disabled={step === steps.length - 1}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-200 ${
              step === steps.length - 1
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl hover:scale-105'
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
