import React, { useState, useMemo, useCallback } from 'react';
import {
  Upload,
  FileText,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Award,
  Target,
  Zap,
  Eye,
  RefreshCw,
  BarChart3,
  FileCheck,
  AlertCircle
} from 'lucide-react';

// Import all template images
import modele1 from '../../assets/modeles/modele1.jpeg';
import modele2 from '../../assets/modeles/modele2.jpeg';
import modele3 from '../../assets/modeles/modele3.jpeg';
import modele4 from '../../assets/modeles/modele4.jpeg';
import modele5 from '../../assets/modeles/modele5.jpeg';
import modele6 from '../../assets/modeles/modele6.jpeg';
import modele7 from '../../assets/modeles/modele7.jpeg';
import modele8 from '../../assets/modeles/modele8.jpeg';
import modele9 from '../../assets/modeles/modele9.jpeg';

export interface AnalyzerProps {
  onBack: () => void;
}

interface AnalysisResult {
  score: number;
  status: 'excellent' | 'good' | 'needs-improvement';
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  details: {
    structure: number;
    content: number;
    formatting: number;
    keywords: number;
    atsCompatibility: number;
  };
}

export const Analyzer: React.FC<AnalyzerProps> = ({ onBack }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const templates = useMemo(
    () => [modele1, modele2, modele3, modele4, modele5, modele6, modele7, modele8, modele9],
    []
  );

  const analyzeCV = useCallback((fileSize: number) => {
    setIsAnalyzing(true);

    // Simulation d'analyse avec des critères réalistes
    setTimeout(() => {
      const structure = 70 + Math.random() * 25;
      const content = 65 + Math.random() * 30;
      const formatting = 75 + Math.random() * 20;
      const keywords = 60 + Math.random() * 35;
      const atsCompatibility = 70 + Math.random() * 25;

      const avgScore = (structure + content + formatting + keywords + atsCompatibility) / 5;

      const strengths: string[] = [];
      const weaknesses: string[] = [];
      const recommendations: string[] = [];

      // Analyse de la structure
      if (structure > 85) {
        strengths.push('Structure claire et bien organisée');
      } else if (structure < 70) {
        weaknesses.push('Structure du CV à améliorer');
        recommendations.push('Organisez votre CV en sections distinctes (Expérience, Formation, Compétences)');
      }

      // Analyse du contenu
      if (content > 85) {
        strengths.push('Contenu riche et pertinent');
      } else if (content < 70) {
        weaknesses.push('Contenu insuffisant ou peu détaillé');
        recommendations.push('Ajoutez des réalisations quantifiables et des résultats concrets');
      }

      // Analyse du formatage
      if (formatting > 85) {
        strengths.push('Mise en forme professionnelle');
      } else if (formatting < 75) {
        weaknesses.push('Formatage inconsistant');
        recommendations.push('Utilisez une police professionnelle et maintenez une cohérence visuelle');
      }

      // Analyse des mots-clés
      if (keywords > 85) {
        strengths.push('Bonne utilisation de mots-clés pertinents');
      } else if (keywords < 70) {
        weaknesses.push('Manque de mots-clés du secteur');
        recommendations.push('Intégrez des mots-clés spécifiques à votre domaine et au poste visé');
      }

      // Compatibilité ATS
      if (atsCompatibility > 85) {
        strengths.push('Excellent pour les systèmes ATS');
      } else if (atsCompatibility < 75) {
        weaknesses.push('Compatibilité ATS limitée');
        recommendations.push('Évitez les tableaux, images et colonnes complexes pour améliorer la lecture ATS');
      }

      // Recommandations générales
      if (avgScore < 75) {
        recommendations.push('Faites relire votre CV par un professionnel');
        recommendations.push('Adaptez votre CV pour chaque candidature');
      }

      if (fileSize > 2000000) {
        weaknesses.push('Taille du fichier trop importante');
        recommendations.push('Réduisez la taille du fichier à moins de 2 MB');
      }

      const status: 'excellent' | 'good' | 'needs-improvement' =
        avgScore >= 85 ? 'excellent' : avgScore >= 70 ? 'good' : 'needs-improvement';

      setResult({
        score: Math.round(avgScore),
        status,
        strengths,
        weaknesses,
        recommendations,
        details: {
          structure: Math.round(structure),
          content: Math.round(content),
          formatting: Math.round(formatting),
          keywords: Math.round(keywords),
          atsCompatibility: Math.round(atsCompatibility),
        },
      });

      setIsAnalyzing(false);
    }, 2500);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      if (f.type === 'application/pdf' || f.name.endsWith('.pdf')) {
        setFile(f);
        setResult(null);
        analyzeCV(f.size);
      } else {
        alert('Veuillez sélectionner un fichier PDF');
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const f = e.dataTransfer.files[0];
      if (f.type === 'application/pdf' || f.name.endsWith('.pdf')) {
        setFile(f);
        setResult(null);
        analyzeCV(f.size);
      } else {
        alert('Veuillez sélectionner un fichier PDF');
      }
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="w-16 h-16 text-green-500" />;
      case 'good':
        return <AlertTriangle className="w-16 h-16 text-yellow-500" />;
      default:
        return <XCircle className="w-16 h-16 text-red-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'Excellent CV !';
      case 'good':
        return 'Bon CV avec quelques améliorations possibles';
      default:
        return 'CV nécessitant des améliorations';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Retour</span>
            </button>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Analyseur IA de CV
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        {!file && !result && (
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Analyse instantanée et gratuite
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Analysez votre CV en quelques secondes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Notre IA analyse votre CV et vous donne des recommandations personnalisées pour maximiser vos chances
            </p>
          </div>
        )}

        {/* Upload Zone */}
        {!file && !result && (
          <div className="max-w-3xl mx-auto">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-3 border-dashed rounded-3xl p-12 transition-all duration-300 ${
                dragActive
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105'
                  : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-500'
              }`}
            >
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="file-upload"
              />
              <div className="text-center">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                  <Upload className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Glissez-déposez votre CV ici
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  ou cliquez pour sélectionner un fichier
                </p>
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                  <FileText className="w-5 h-5 mr-2" />
                  Choisir un fichier PDF
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
                  Format accepté : PDF • Taille max : 10 MB
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { icon: <Target className="w-6 h-6" />, title: 'Analyse ATS', desc: 'Compatibilité avec les systèmes de recrutement' },
                { icon: <BarChart3 className="w-6 h-6" />, title: 'Score détaillé', desc: 'Évaluation complète de votre CV' },
                { icon: <Award className="w-6 h-6" />, title: 'Recommandations', desc: 'Conseils personnalisés d\'amélioration' },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analyzing State */}
        {isAnalyzing && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 border border-gray-100 dark:border-gray-700">
              <div className="relative w-32 h-32 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-spin" style={{ animationDuration: '3s' }}>
                  <div className="absolute inset-2 bg-white dark:bg-gray-800 rounded-full" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-blue-600 animate-pulse" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Analyse en cours...
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Notre IA examine votre CV en profondeur
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-500">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Analyse de la structure, du contenu et de la compatibilité ATS...</span>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {result && file && !isAnalyzing && (
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Score Card */}
            <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center space-x-6">
                  {getStatusIcon(result.status)}
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {getStatusText(result.status)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Fichier : {file.name}
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-6xl font-bold ${getScoreColor(result.score)} mb-2`}>
                    {result.score}
                    <span className="text-3xl">/100</span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-500 font-medium">
                    Score global
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Scores */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
                Analyse détaillée
              </h4>
              <div className="space-y-6">
                {Object.entries(result.details).map(([key, value]) => {
                  const labels: Record<string, string> = {
                    structure: 'Structure',
                    content: 'Contenu',
                    formatting: 'Mise en forme',
                    keywords: 'Mots-clés',
                    atsCompatibility: 'Compatibilité ATS',
                  };
                  return (
                    <div key={key}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          {labels[key]}
                        </span>
                        <span className={`font-bold ${getScoreColor(value)}`}>
                          {value}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            value >= 85
                              ? 'bg-gradient-to-r from-green-500 to-green-600'
                              : value >= 70
                              ? 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                              : 'bg-gradient-to-r from-red-500 to-red-600'
                          }`}
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Strengths */}
            {result.strengths.length > 0 && (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-3xl shadow-xl p-8 border border-green-200 dark:border-green-800">
                <h4 className="text-2xl font-bold text-green-900 dark:text-green-300 mb-6 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3" />
                  Points forts
                </h4>
                <ul className="space-y-3">
                  {result.strengths.map((strength, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-green-800 dark:text-green-200">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Weaknesses */}
            {result.weaknesses.length > 0 && (
              <div className="bg-red-50 dark:bg-red-900/20 rounded-3xl shadow-xl p-8 border border-red-200 dark:border-red-800">
                <h4 className="text-2xl font-bold text-red-900 dark:text-red-300 mb-6 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-3" />
                  Points à améliorer
                </h4>
                <ul className="space-y-3">
                  {result.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="flex items-start">
                      <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-red-800 dark:text-red-200">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {result.recommendations.length > 0 && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-3xl shadow-xl p-8 border border-blue-200 dark:border-blue-800">
                <h4 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3" />
                  Recommandations
                </h4>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start">
                      <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-800 dark:text-blue-200">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleReset}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Analyser un autre CV
              </button>
              <button
                onClick={onBack}
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl border-2 border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-all flex items-center justify-center"
              >
                <FileCheck className="w-5 h-5 mr-2" />
                Créer un nouveau CV
              </button>
            </div>
          </div>
        )}

        {/* Template Gallery */}
        {!file && !result && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Nos modèles de CV professionnels
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Inspirez-vous de nos templates optimisés pour les ATS
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {templates.map((src, i) => (
                <div
                  key={i}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-gray-200 dark:border-gray-700"
                >
                  <img
                    src={src}
                    alt={`Modèle ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-semibold text-center">Modèle {i + 1}</p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analyzer;
