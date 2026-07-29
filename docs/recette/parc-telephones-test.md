# Plan de recette : Parc de téléphones de test

## Périmètre

Choisir les téléphones sur lesquels toute recette de l'application livreurs est jouée : les modèles les plus utilisés par les livreurs du transporteur.

## Appareils

| Appareil | Système | Écran | Rôle dans la recette |
|----------|---------|-------|----------------------|
| Samsung Galaxy A14 | Android 13 | 6,6 pouces | Modèle le plus répandu chez les livreurs |
| Xiaomi Redmi 12 | Android 12 | 6,79 pouces | Grand écran, mémoire limitée |
| Samsung Galaxy A03 | Android 11 | 6,5 pouces | Entrée de gamme, cas le plus lent |
| iPhone SE (2020) | iOS 16 | 4,7 pouces | Petit écran, boutons à vérifier |
| iPhone 11 | iOS 17 | 6,1 pouces | iOS courant |

## Cas de test

| N° | Étapes | Résultat attendu | Résultat |
|----|--------|------------------|----------|
| 1 | Lister les téléphones fournis aux livreurs avec le responsable d'exploitation | Cinq modèles couvrent plus de 90 % du parc | OK |
| 2 | Charger l'application sur chacun et ouvrir la tournée du jour | La tournée s'affiche en moins de 3 s | OK, 4 s sur le Galaxy A03 |
| 3 | Vérifier les boutons avec un gant fin | Aucun bouton de moins de 56 px | OK |
| 4 | Passer en mode avion puis revenir | L'application ne se ferme pas | OK |

## Ce qui a été trouvé

- Le Galaxy A03 est le plus lent : il sert de référence pour les temps d'affichage.
- Sur l'iPhone SE, la barre du bas masque le dernier bouton : à corriger avant la recette de la tournée.
- Un deuxième exemplaire du Galaxy A14 est prévu pour tester la synchronisation entre deux téléphones.
