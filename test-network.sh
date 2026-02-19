#!/bin/bash

# Script de test d'accès réseau

echo "🔍 Test de configuration réseau..."
echo ""

# Vérifier si le serveur Vite est configuré
echo "1️⃣  Vérification de la configuration Vite..."
if grep -q "host: '0.0.0.0'" vite.config.ts; then
    echo "✅ Configuration Vite OK (host: 0.0.0.0)"
else
    echo "❌ Configuration Vite manquante"
    echo "   Ajoutez 'host: 0.0.0.0' dans vite.config.ts"
fi

echo ""

# Obtenir l'adresse IP
echo "2️⃣  Détection de votre adresse IP..."
if command -v ip &> /dev/null; then
    IP=$(ip addr show | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | cut -d/ -f1 | head -n1)
elif command -v ifconfig &> /dev/null; then
    IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n1)
else
    IP="Non détectée"
fi

echo "📍 Votre IP locale: $IP"
echo ""

# Vérifier le pare-feu
echo "3️⃣  Vérification du pare-feu..."
if command -v ufw &> /dev/null; then
    if sudo ufw status | grep -q "5173.*ALLOW"; then
        echo "✅ Port 5173 autorisé dans UFW"
    else
        echo "⚠️  Port 5173 non autorisé dans UFW"
        echo "   Exécutez: sudo ufw allow 5173/tcp"
    fi
elif command -v firewall-cmd &> /dev/null; then
    if sudo firewall-cmd --list-ports | grep -q "5173"; then
        echo "✅ Port 5173 autorisé dans firewalld"
    else
        echo "⚠️  Port 5173 non autorisé dans firewalld"
        echo "   Exécutez: sudo firewall-cmd --add-port=5173/tcp --permanent"
    fi
else
    echo "ℹ️  Pare-feu non détecté ou non actif"
fi

echo ""

# Vérifier si le port est en écoute
echo "4️⃣  Vérification des ports en écoute..."
if command -v netstat &> /dev/null; then
    if netstat -tuln | grep -q ":5173"; then
        echo "✅ Le port 5173 est en écoute"
    else
        echo "⚠️  Le port 5173 n'est pas en écoute"
        echo "   Démarrez le serveur avec: npm run dev"
    fi
elif command -v ss &> /dev/null; then
    if ss -tuln | grep -q ":5173"; then
        echo "✅ Le port 5173 est en écoute"
    else
        echo "⚠️  Le port 5173 n'est pas en écoute"
        echo "   Démarrez le serveur avec: npm run dev"
    fi
else
    echo "ℹ️  Impossible de vérifier les ports (netstat/ss non disponible)"
fi

echo ""
echo "📋 Résumé:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Pour accéder à l'application depuis le réseau:"
echo ""
echo "1. Démarrez le serveur:"
echo "   npm run dev"
echo ""
echo "2. Accédez depuis un autre appareil:"
echo "   http://$IP:5173"
echo ""
echo "3. Si ça ne fonctionne pas, ouvrez le port:"
echo "   sudo ufw allow 5173/tcp"
echo "   sudo ufw reload"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
