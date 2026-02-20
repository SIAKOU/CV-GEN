import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  FileText, 
  ArrowRight, 
  CheckCircle, 
  Zap, 
  Shield, 
  TrendingUp,
  ChevronDown,
  Star,
  Users,
  Clock
} from 'lucide-react';

export interface HomePageProps {
  onGenerate: () => void;
  onAnalyze: () => void;
}

// Composant pour les particules animées en arrière-plan
const ParticleBackground: React.FC = () => {
  const particles = useMemo(() => 
    [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
    })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-float"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

// Composant pour les cartes de fonctionnalités
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`group relative p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

// Composant pour les statistiques animées
const AnimatedCounter: React.FC<{ end: number; suffix: string; label: string }> = ({ 
  end, 
  suffix, 
  label 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {count}{suffix}
      </div>
      <div className="text-gray-600 dark:text-gray-400 mt-2 font-medium">{label}</div>
    </div>
  );
};

export const HomePage: React.FC<HomePageProps> = ({ onGenerate, onAnalyze }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Génération Rapide",
      description: "Créez un CV professionnel en moins de 5 minutes avec notre IA avancée."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Analyse Sécurisée",
      description: "Analysez vos CV existants avec des recommandations personnalisées et confidentielles."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Optimisation ATS",
      description: "Maximisez vos chances de passage des systèmes de tracking des candidatures."
    }
  ];

  const testimonials = [
    {
      name: "Marie L.",
      role: "Marketing Manager",
      content: "J'ai décroché 3 entretiens en une semaine grâce à ce générateur !",
      rating: 5
    },
    {
      name: "Thomas D.",
      role: "Développeur Full Stack",
      content: "L'analyse IA m'a permis d'améliorer mon CV de façon spectaculaire.",
      rating: 5
    },
    {
      name: "Sophie M.",
      role: "Consultante RH",
      content: "Je recommande à tous mes candidats. Résultats garantis !",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CV Pro AI
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              {['Fonctionnalités', 'Avantages', 'Témoignages'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <ParticleBackground />
        
        {/* Cercles décoratifs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-8 animate-bounce">
            <Star className="w-4 h-4 mr-2 fill-current" />
            Nouveau : Analyse IA en temps réel
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Créez votre CV
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Professionnel en Minutes
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Propulsez votre carrière avec notre générateur intelligent. 
            Des templates modernes et une analyse IA pour maximiser vos chances.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={onGenerate}
              className="group relative px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center">
                <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                Générer votre CV
                <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button
              onClick={onAnalyze}
              className="group px-8 py-5 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transform hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center">
                <FileText className="w-5 h-5 mr-2 group-hover:text-blue-600 transition-colors" />
                Analyser un CV
              </span>
            </button>
          </div>

          {/* Image Hero */}
          <div className="relative max-w-4xl mx-auto mb-16">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-gray-900 via-transparent to-transparent z-10" />
            <div className="rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 border-4 border-white dark:border-gray-800 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 aspect-video flex items-center justify-center">
              <div className="text-center p-8">
                <FileText className="w-24 h-24 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 font-semibold">CV Professionnel Moderne</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl z-20 animate-bounce">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="font-bold text-gray-800 dark:text-white">ATS Friendly</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => scrollToSection('fonctionnalités')}
            className="animate-bounce text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedCounter end={50000} suffix="+" label="CV Créés" />
            <AnimatedCounter end={98} suffix="%" label="Taux de Satisfaction" />
            <AnimatedCounter end={3} suffix="x" label="Plus d'Entretiens" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fonctionnalités" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Pourquoi choisir CV Pro AI ?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Des outils puissants pour créer des CV qui démarquent
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 200}
              />
            ))}
          </div>

          {/* Image d'analyse IA */}
          <div className="mt-20 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl shadow-2xl hover:shadow-blue-500/20 transition-shadow duration-300 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 aspect-square flex items-center justify-center p-8">
                  <div className="text-center">
                    <Zap className="w-32 h-32 mx-auto text-purple-600 dark:text-purple-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 font-semibold">Analyse IA Avancée</p>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Analyse IA Intelligente
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Notre algorithme analyse votre CV en profondeur pour vous donner des recommandations personnalisées et augmenter vos chances de succès.
                </p>
                <ul className="space-y-4">
                  {[
                    "Détection des mots-clés manquants",
                    "Analyse de la lisibilité ATS",
                    "Suggestions de compétences",
                    "Formatage optimisé"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages Section */}
      <section id="avantages" className="py-24 bg-gradient-to-br from-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Boostez votre carrière dès aujourd'hui
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Rejoignez des milliers de professionnels qui ont transformé leur recherche d'emploi avec nos outils.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Clock className="w-8 h-8 text-yellow-400" />
                  <span className="font-semibold">Gain de temps</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-8 h-8 text-yellow-400" />
                  <span className="font-semibold">Support 24/7</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl shadow-2xl transform hover:rotate-2 transition-transform duration-300 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 aspect-square flex items-center justify-center p-8">
                <div className="text-center">
                  <TrendingUp className="w-32 h-32 mx-auto text-orange-600 dark:text-orange-400 mb-4" />
                  <p className="text-gray-800 dark:text-gray-200 font-bold text-xl">Croissance de Carrière</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section id="témoignages" className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Ce que disent nos utilisateurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Prêt à décrocher le job de vos rêves ?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
            Commencez gratuitement et voyez la différence immédiatement.
          </p>
          <button
            onClick={onGenerate}
            className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 animate-pulse"
          >
            Créer mon CV Maintenant
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">CV Pro AI</span>
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              © 2026 CV Pro AI. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>

      {/* Styles CSS personnalisés */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;