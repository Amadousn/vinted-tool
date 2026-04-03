# 🚀 Guide de déploiement rapide - VINTED TOOL

## Pour déployer TON PROPRE site (recommandé)

### 1️⃣ Crée un compte Vercel
- Va sur [vercel.com](https://vercel.com)
- Connecte-toi avec ton compte GitHub (gratuit)

### 2️⃣ Fork ce projet sur ton GitHub
- Va sur https://github.com/Amadousn/vinted-tool
- Clique sur **Fork** en haut à droite
- Le projet est maintenant dans ton compte GitHub

### 3️⃣ Déploie sur Vercel
1. Sur Vercel, clique **"Add New Project"**
2. Sélectionne ton fork `vinted-tool`
3. Dans **Environment Variables**, ajoute :
   ```
   GEMINI_API_KEY = AIzaSyBZJsOC1RjwU5sCeuoAks5ZYcg86BSau8E
   ```
4. Clique **Deploy**

### 4️⃣ C'est prêt ! 🎉
- Ton site sera disponible sur `ton-nom.vercel.app`
- Partage ce lien avec qui tu veux
- Tout est gratuit, pas de limite de temps

---

## Pour utiliser directement MON site (plus simple)

Demande-moi l'URL de mon déploiement Vercel, tu pourras l'utiliser directement sans rien installer.

⚠️ **Note** : Si on est trop nombreux à l'utiliser en même temps, il peut y avoir des ralentissements (limite API gratuite).

---

## 💡 Astuce

Si tu veux ta propre clé API Gemini (pour avoir tes propres quotas) :
1. Va sur [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Crée une clé API (gratuit)
3. Dans Vercel → ton projet → Settings → Environment Variables
4. Modifie `GEMINI_API_KEY` avec ta clé
5. Redéploie

---

## ❓ Problèmes ?

- **Le site ne charge pas** : Attends 2-3 min après le déploiement
- **Erreur API** : Vérifie que la clé Gemini est bien configurée
- **Images ne se génèrent pas** : Vérifie la taille des images (max 20MB)

Pour toute question, contacte-moi !
