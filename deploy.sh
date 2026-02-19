#!/bin/bash

# Script de déploiement pour le Générateur de CV

echo "🚀 Démarrage du déploiement..."

# Vérifier que nous sommes sur la branche main
BRANCH=$(git branch --show-current)
if [ "$BRANCH" != "main" ]; then
    echo "⚠️  Attention: Vous n'êtes pas sur la branche main"
    read -p "Continuer quand même? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Vérifier qu'il n'y a pas de changements non commités
if [[ -n $(git status -s) ]]; then
    echo "❌ Erreur: Il y a des changements non commités"
    echo "Veuillez commit ou stash vos changements avant de déployer"
    exit 1
fi

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Lancer les tests de linting
echo "🔍 Vérification du code..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Erreur de linting détectée"
    exit 1
fi

# Build du projet
echo "🏗️  Build du projet..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build"
    exit 1
fi

echo "✅ Build réussi!"
echo ""
echo "📝 Choisissez votre méthode de déploiement:"
echo "1. Netlify"
echo "2. Vercel"
echo "3. Serveur local (accessible sur le réseau)"
echo "4. Quitter"
echo ""
read -p "Votre choix (1-4): " choice

case $choice in
    1)
        echo "🌐 Déploiement sur Netlify..."
        if command -v netlify &> /dev/null; then
            netlify deploy --prod
        else
            echo "❌ Netlify CLI n'est pas installé"
            echo "Installez-le avec: npm install -g netlify-cli"
            exit 1
        fi
        ;;
    2)
        echo "🌐 Déploiement sur Vercel..."
        if command -v vercel &> /dev/null; then
            vercel --prod
        else
            echo "❌ Vercel CLI n'est pas installé"
            echo "Installez-le avec: npm install -g vercel"
            exit 1
        fi
        ;;
    3)
        echo "🖥️  Démarrage du serveur local..."
        echo ""
        echo "Le serveur sera accessible sur:"
        echo "- Local: http://localhost:4173"
        
        # Obtenir l'adresse IP
        if command -v ip &> /dev/null; then
            IP=$(ip addr show | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | cut -d/ -f1 | head -n1)
        elif command -v ifconfig &> /dev/null; then
            IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n1)
        else
            IP="[VOTRE_IP]"
        fi
        
        echo "- Réseau: http://$IP:4173"
        echo ""
        echo "⚠️  Assurez-vous que le port 4173 est ouvert dans votre pare-feu"
        echo "Appuyez sur Ctrl+C pour arrêter le serveur"
        echo ""
        npm run preview
        ;;
    4)
        echo "👋 Au revoir!"
        exit 0
        ;;
    *)
        echo "❌ Choix invalide"
        exit 1
        ;;
esac

echo ""
echo "🎉 Déploiement terminé!"
