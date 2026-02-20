import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  Sparkles,
  Eye,
  ArrowRight,
  Search,
  Star,
  TrendingUp,
  Briefcase,
  Palette,
  Zap
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

export interface ModelSelectorProps {
  onSelectModel: (modelId: string) => void;
  onBack?: () => void;
}

interface CVModel {
  id: string;
  name: string;
  image: string;
  category: 'professional' | 'creative' | 'modern' | 'minimal';
  description: string;
  features: string[];
  popular?: boolean;
  atsScore: number;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ onSelectModel, onBack }) => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const models: CVModel[] = useMemo(() => [
    {
      id: 'model1',
      name: 'Professionnel Classique',
      image: modele1,
      category: 'professional',
      description: 'Design épuré et traditionnel, parfait pour les secteurs conservateurs',
      features: ['ATS Optimisé', 'Mise en page claire', 'Facile à lire'],
      popular: true,
      atsScore: 95,
    },
    {
      id: 'model2',
      name: 'Moderne Élégant',
      image: modele2,
      category: 'modern',
      description: 'Style contemporain avec touches de couleur subtiles',
      features: ['Design moderne', 'Sections bien définies', 'Visuellement attractif'],
      popular: true,
      atsScore: 90,
    },
    {
      id: 'model3',
      name: 'Créatif Dynamique',
      image: modele3,
      category: 'creative',
      description: 'Pour les profils créatifs qui veulent se démarquer',
      features: ['Design audacieux', 'Couleurs vives', 'Originalité'],
      atsScore: 75,
    },
    {
      id: 'model4',
      name: 'Minimaliste Pro',
      image: modele4,
      category: 'minimal',
      description: 'Simplicité et efficacité au service de votre contenu',
      features: ['Ultra-épuré', 'Focus sur le contenu', 'Élégant'],
      popular: true,
      atsScore: 92,
    },
    {
      id: 'model5',
      name: 'Executive Premium',
      image: modele5,
      category: 'professional',
      description: 'Pour les postes de direction et cadres supérieurs',
      features: ['Prestige', 'Sophistiqué', 'Leadership'],
      atsScore: 88,
    },
    {
      id: 'model6',
      name: 'Tech Innovant',
      image: modele6,
      category: 'modern',
      description: 'Idéal pour les profils tech et startups',
      features: ['Moderne', 'Tech-friendly', 'Innovant'],
      atsScore: 85,
    },
    {
      id: 'model7',
      name: 'Artistique Bold',
      image: modele7,
      category: 'creative',
      description: 'Expression créative maximale pour les artistes',
      features: ['Très créatif', 'Unique', 'Mémorable'],
      atsScore: 70,
    },
    {
      id: 'model8',
      name: 'Corporate Clean',
      image: modele8,
      category: 'professional',
      description: 'Standard corporate avec une touche de modernité',
      features: ['Professionnel', 'Structuré', 'Fiable'],
      atsScore: 93,
    },
    {
      id: 'model9',
      name: 'Startup Fresh',
      image: modele9,
      category: 'modern',
      description: 'Jeune, dynamique et plein d\'énergie',
      features: ['Énergique', 'Frais', 'Dynamique'],
      atsScore: 87,
    },
  ], []);

  const categories = [
    { id: 'all', label: 'Tous les modèles', icon: Sparkles },
    { id: 'professional', label: 'Professionnel', icon: Briefcase },
    { id: 'modern', label: 'Moderne', icon: TrendingUp },
    { id: 'creative', label: 'Créatif', icon: Palette },
    { id: 'minimal', label: 'Minimaliste', icon: Zap },
  ];

  const filteredModels = useMemo(() => {
    return models.filter(model => {
      const matchesCategory = filterCategory === 'all' || model.category === filterCategory;
      const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           model.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [models, filterCategory, searchQuery]);

  const handleSelectModel = (modelId: string) => {
    setSelectedModel(modelId);
  };

  const handleConfirm = () => {
    if (selectedModel) {
      onSelectModel(selectedModel);
    }
  };

  const getATSColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-orange-600 bg-orange-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-blue-600" />
                Choisissez votre modèle de CV
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Sélectionnez le design qui correspond le mieux à votre profil
              </p>
            </div>
            {onBack && (
              <button
                onClick={onBack}
                className="px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Retour
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters & Search */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un modèle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors text-gray-900 dark:text-white"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = filterCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilterCategory(cat.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Models Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filterCategory + searchQuery}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {filteredModels.map((model, index) => {
              const isSelected = selectedModel === model.id;
              const isHovered = hoveredModel === model.id;

              return (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredModel(model.id)}
                  onMouseLeave={() => setHoveredModel(null)}
                  onClick={() => handleSelectModel(model.id)}
                  className={`group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'ring-4 ring-blue-500 shadow-2xl scale-105'
                      : 'hover:shadow-xl hover:scale-102 border-2 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {/* Popular Badge */}
                  {model.popular && (
                    <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                      <Star className="w-3 h-3 fill-current" />
                      Populaire
                    </div>
                  )}

                  {/* Selected Badge */}
                  {isSelected && (
                    <div className="absolute top-4 left-4 z-20 bg-blue-600 text-white p-2 rounded-full shadow-lg">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                  )}

                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-900">
                    <img
                      src={model.image}
                      alt={model.name}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isHovered ? 'scale-110' : 'scale-100'
                      }`}
                    />
                    
                    {/* Overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <Eye className="w-5 h-5" />
                          <span className="font-semibold">Aperçu du modèle</span>
                        </div>
                        <p className="text-sm text-gray-200">{model.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {model.name}
                      </h3>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${getATSColor(model.atsScore)}`}>
                        ATS {model.atsScore}%
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {model.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {model.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Select Button */}
                  <div className="px-6 pb-6">
                    <button
                      className={`w-full py-3 rounded-xl font-semibold transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {isSelected ? 'Sélectionné' : 'Sélectionner'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredModels.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Aucun modèle trouvé
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>

      {/* Fixed Bottom Bar */}
      {selectedModel && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 shadow-2xl z-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-20 rounded-lg overflow-hidden border-2 border-blue-500 shadow-lg">
                  <img
                    src={models.find(m => m.id === selectedModel)?.image}
                    alt="Selected"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Modèle sélectionné</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {models.find(m => m.id === selectedModel)?.name}
                  </p>
                </div>
              </div>
              <button
                onClick={handleConfirm}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                Continuer avec ce modèle
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ModelSelector;
