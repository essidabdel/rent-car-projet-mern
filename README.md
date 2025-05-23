# 🚗 CarShare – Application MERN de location de voitures entre particuliers

## 📚 Description

CarShare est une plateforme MERN qui permet aux utilisateurs de proposer leurs véhicules à la location, de gérer leurs annonces et de découvrir les voitures disponibles. L'application intègre une authentification sécurisée et des fonctionnalités avancées de recherche et de filtres.

## 🔧 Technologies

- **Frontend** : React.js, Axios, CSS  
- **Backend** : Node.js, Express.js, MongoDB, Mongoose  
- **Authentification** : JWT, bcrypt  
- **Autres** : dotenv, cors, jsonwebtoken

## 🚀 Lancer le projet

### ⚙️ Prérequis

- Node.js (v18+)
- MongoDB installé ou accès à MongoDB Atlas

### 📁 Cloner le projet

```bash
git clone https://github.com/essidabdel/rent-car-projet-mern.git
cd rent-car-projet-mern
```

### 🔙 Backend

```bash
cd backend
npm install
# Créer un fichier .env avec :
# PORT=5000
# MONGO_URI=your_mongo_connection
# JWT_SECRET=your_secret
npm start
```

### 🖥️ Frontend

```bash
cd frontend
npm install
npm start
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

## 👤 Fonctionnalités utilisateur

- Inscription / Connexion avec mot de passe sécurisé
- Création, modification, suppression d’annonces
- Affichage des produits publics avec filtres :
  - Par prix
  - Par catégorie
  - Par mot-clé

## 🔐 Sécurité

- JWT stocké dans le localStorage
- Routes protégées côté backend
- Middleware d’authentification et de vérification de propriétaire

## 📄 Structure du projet

```
rent-car-projet-mern//
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── App.jsx
```

## 📦 Auteurs

- Yassine Kochat
- Sara Tissemlal
- Abdellatif Essid
