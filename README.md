# 🚀 VINTED TOOL v2.0

**Outil IA pour optimiser tes annonces Vinted** : retouche automatique du fond des photos + génération de descriptions SEO.

## ✨ Fonctionnalités

- 📸 **Retouche de fond automatique** : 5 styles de sol disponibles (béton, damier, bois, tapis)
- 🤖 **Description IA** : Génération automatique de titres SEO + mensurations + 80 hashtags multilingues
- 📦 **Mode batch** : Traite plusieurs articles en même temps
- ⚡ **Ultra rapide** : Powered by OpenRouter (Flux 2 Pro + Llama 3.3 70B)

## 🎯 Déploiement sur Vercel (GRATUIT)

### Étape 1 : Fork ou Clone ce repo

```bash
git clone https://github.com/Amadousn/vinted-tool.git
cd vinted-tool
```

### Étape 2 : Déployer sur Vercel

1. Va sur [vercel.com](https://vercel.com) et connecte-toi avec GitHub
2. Clique sur **"Add New Project"**
3. Importe ce repository `vinted-tool`
4. Dans **Environment Variables**, ajoute :
   - `OPENROUTER_API_KEY` = ta clé API OpenRouter
5. Clique sur **Deploy**

✅ Ton site sera en ligne en ~2 minutes sur une URL type `vinted-tool.vercel.app`

### Étape 3 : Configurer la clé API OpenRouter

1. Va sur [openrouter.ai](https://openrouter.ai/keys)
2. Crée un compte et génère une clé API
3. Dans Vercel → Settings → Environment Variables
4. Ajoute `OPENROUTER_API_KEY` avec ta clé
5. Redéploie l'app

## 💻 Développement local

```bash
# Installer les dépendances
npm install

# Créer un fichier .env.local
cp .env.example .env.local
# Édite .env.local et ajoute ta clé OPENROUTER_API_KEY

# Lancer le serveur de dev
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000)

## 📖 Comment utiliser

1. **Importe** tes photos de vêtements (JPG, PNG, WEBP)
2. **Configure** le fond et la taille pour chaque article
3. **Génère** : L'IA retouche les photos + crée la description
4. **Télécharge** et publie sur Vinted !

## 🛠️ Stack technique

- **Framework** : Next.js 16.2 (App Router)
- **IA Image** : Flux 2 Pro (via OpenRouter)
- **IA Texte** : Llama 3.3 70B Instruct (via OpenRouter)
- **State** : Zustand
- **Styling** : TailwindCSS v4
- **Hosting** : Vercel

## 🤝 Partager avec des amis

**Option 1 - Partage ton URL Vercel**
Tous vos amis utilisent la même instance (partage la même clé API).

**Option 2 - Chacun déploie sa propre version**
1. Partage ce repo GitHub
2. Chacun suit les étapes de déploiement ci-dessus
3. Chacun a son propre quota API

## 📄 Licence

MIT - Utilise et modifie comme tu veux !
