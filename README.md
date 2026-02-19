# 🎨 Générateur de CV Professionnel

Application React moderne et complète pour créer des CV professionnels avec plusieurs modèles de design, export PDF et sauvegarde automatique.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6.svg)

## ✨ Fonctionnalités Complètes

### 📝 Formulaires Intelligents
- ✅ **Validation en temps réel** avec Zod et React Hook Form
- ✅ **Formulaire multi-étapes** avec navigation fluide
- ✅ **Sauvegarde automatique** dans localStorage
- ✅ **Messages d'erreur clairs** et feedback visuel

### 🎨 3 Modèles Professionnels
- **Minimal** - Design épuré pour secteurs traditionnels
- **Moderne** - Style contemporain avec couleurs vives
- **Créatif** - Design audacieux pour profils créatifs

### 📄 Export PDF Haute Qualité
- Export PDF professionnel avec @react-pdf/renderer
- Mise en page optimisée pour l'impression
- Nom de fichier personnalisé automatiquement

### 💾 Persistance des Données
- Sauvegarde automatique dans localStorage
- Récupération des données au rechargement
- Aucune perte de données

### 🎭 Interface Moderne
- Animations fluides avec Framer Motion
- Design responsive (mobile, tablette, desktop)
- Thème moderne avec gradients
- Icônes Heroicons
- Notifications toast élégantes

## 🚀 Technologies

- **Frontend:** React 19, TypeScript 5.9
- **Build:** Vite 8 (ultra-rapide)
- **Styling:** TailwindCSS 4, HeadlessUI
- **State:** Redux Toolkit avec persistance
- **Forms:** React Hook Form + Zod
- **Animations:** Framer Motion
- **PDF:** @react-pdf/renderer
- **Icons:** Heroicons

## 📦 Installation

```bash
# Cloner le projet
git clone https://github.com/votre-username/cv-generator.git
cd cv-generator

# Installer les dépendances
npm install
```

## 🛠️ Développement

```bash
# Démarrer le serveur de développement
npm run dev

# L'application sera disponible sur:
# - Local: http://localhost:5173
# - Réseau: http://[VOTRE_IP]:5173
```

### 🌐 Accès depuis le réseau externe

L'application est maintenant configurée pour être accessible depuis d'autres appareils sur votre réseau:

1. **Démarrez le serveur:**
   ```bash
   npm run dev
   ```

2. **Trouvez votre adresse IP:**
   ```bash
   # Linux/Mac
   ip addr show | grep "inet " | grep -v 127.0.0.1
   # ou
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```

3. **Accédez depuis un autre appareil:**
   ```
   http://[VOTRE_IP]:5173
   ```

4. **Si nécessaire, ouvrez le port dans le pare-feu:**
   ```bash
   # Linux (UFW)
   sudo ufw allow 5173/tcp
   sudo ufw reload
   
   # Linux (iptables)
   sudo iptables -A INPUT -p tcp --dport 5173 -j ACCEPT
   ```

5. **Testez la configuration réseau:**
   ```bash
   chmod +x test-network.sh
   ./test-network.sh
   ```

📖 Pour plus de détails, consultez [ACCES_RESEAU.md](ACCES_RESEAU.md)

## 🏗️ Build Production

```bash
# Build optimisé pour la production
npm run build

# Prévisualiser le build
npm run preview
```

## 🧪 Qualité du Code

```bash
# Linter le code
npm run lint

# Build TypeScript
npm run build
```

## 📁 Structure du Projet

```
src/
├── components/
│   ├── common/          # Composants réutilisables
│   │   ├── Button/      # Bouton avec variants
│   │   ├── Input/       # Input avec validation
│   │   ├── Modal/       # Modal avec animations
│   │   ├── Toast/       # Notifications
│   │   ├── Card/        # Carte réutilisable
│   │   └── Loading/     # Indicateur de chargement
│   ├── forms/           # Formulaires
│   │   ├── PersonalInfo/    # Infos personnelles
│   │   ├── Experience/      # Expériences pro
│   │   └── Skills/          # Compétences
│   ├── preview/         # Aperçu et export
│   │   ├── CVPreview/       # Aperçu avec sélection template
│   │   └── PDFExport/       # Export PDF
│   └── templates/       # Modèles de CV
│       ├── Minimal/         # Template minimal
│       ├── Modern/          # Template moderne
│       └── Creative/        # Template créatif
├── hooks/               # Hooks personnalisés
│   ├── useLocalStorage/     # Gestion localStorage
│   ├── usePDFExport/        # Export PDF
│   └── useFormValidation/   # Validation formulaires
├── store/               # Redux store
│   ├── cvSlice/             # État des données CV
│   ├── templatesSlice/      # État des templates
│   └── uiSlice/             # État de l'interface
├── types/               # Types TypeScript
├── utils/               # Utilitaires
│   ├── formatters/          # Formatage des données
│   ├── validators/          # Validation
│   └── pdfGenerator/        # Génération PDF
├── constants/           # Constantes de l'app
├── App.tsx              # Composant principal
├── main.tsx             # Point d'entrée
├── index.css            # Styles globaux
└── theme.css            # Thème Tailwind personnalisé
```

## 🎯 Utilisation

L'application démarre avec des données d'exemple pour vous montrer un aperçu immédiat du CV. Vous pouvez les modifier ou les remplacer par vos propres informations.

### 1. Informations Personnelles
Remplissez vos coordonnées de base :
- Nom complet (requis)
- Titre professionnel
- Email (requis)
- Téléphone
- Localisation

### 2. Expériences Professionnelles
Ajoutez vos expériences :
- Entreprise et poste
- Dates de début et fin
- Description détaillée

### 3. Compétences
Listez vos compétences techniques et soft skills

### 4. Aperçu et Export
- Choisissez parmi 3 modèles
- Prévisualisez en temps réel
- Téléchargez en PDF

💡 **Astuce:** L'application charge des données d'exemple au démarrage. Consultez [DONNEES_PAR_DEFAUT.md](DONNEES_PAR_DEFAUT.md) pour plus d'informations.

## 🎨 Personnalisation

### Couleurs
Modifiez `src/theme.css` pour personnaliser les couleurs

### Templates
Créez de nouveaux templates dans `src/components/templates/`

### Validation
Ajustez les schémas Zod dans `src/types/index.ts`

## 🚀 Déploiement

### Script de déploiement automatique
```bash
chmod +x deploy.sh
./deploy.sh
```

Le script vous guidera à travers les options:
1. Déploiement sur Netlify
2. Déploiement sur Vercel
3. Serveur local accessible sur le réseau
4. Quitter

### Netlify
```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Déployer
netlify deploy --prod
```

### Vercel
```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel --prod
```

### Autres plateformes
Le dossier `dist/` contient les fichiers statiques prêts à déployer

## 📝 Fonctionnalités Détaillées

### Sauvegarde Automatique
- Sauvegarde à chaque modification
- Récupération automatique au chargement
- Pas de perte de données

### Validation des Formulaires
- Validation en temps réel
- Messages d'erreur clairs
- Schémas Zod robustes

### Export PDF
- Génération côté client
- Mise en page professionnelle
- Téléchargement automatique

### Animations
- Transitions fluides entre les étapes
- Animations de chargement
- Feedback visuel immédiat

## 🤝 Contribution

Les contributions sont les bienvenues! Consultez [CONTRIBUTING.md](CONTRIBUTING.md) pour plus de détails.

## 📄 License

Ce projet est sous licence MIT. Voir [LICENSE](LICENSE) pour plus de détails.

## 🐛 Problèmes Connus

Aucun problème majeur connu. Ouvrez une issue si vous en rencontrez.

## 📧 Support

- 📖 [Guide d'utilisation](GUIDE.md)
- 🐛 [Signaler un bug](https://github.com/votre-username/cv-generator/issues)
- 💡 [Demander une fonctionnalité](https://github.com/votre-username/cv-generator/issues)

## 🎉 Remerciements

- React Team pour React 19
- Tailwind Labs pour TailwindCSS
- Framer pour Framer Motion
- Tous les contributeurs open source

---

Créé avec ❤️ en utilisant React, TypeScript et TailwindCSS
# CV-GEN
