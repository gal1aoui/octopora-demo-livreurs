# Plan de recette : Recette des preuves de livraison

## Périmètre

Vérifier que chaque preuve (code, photo, signature) arrive au client rattachée à la bonne livraison, avec la bonne heure.

## Appareils

Galaxy A14 (Android 13), iPhone SE (iOS 16).

## Cas de test

| N° | Étapes | Résultat attendu | Résultat |
|----|--------|------------------|----------|
| 1 | Livrer l'arrêt 3 avec une photo | La photo est liée à l'arrêt 3 | OK |
| 2 | Livrer l'arrêt 4 avec une signature | La signature est liée à l'arrêt 4 | OK |
| 3 | Livrer deux colis à la suite très vite | Chaque preuve garde son arrêt | OK |
| 4 | Lire l'heure de la preuve dans `rapport.html` | Heure de Tunis, pas l'heure UTC | OK |
| 5 | Livrer sans réseau puis le rétablir | La preuve arrive avec l'heure de la livraison, pas celle de l'envoi | Écart de 20 min trouvé |

## Ce qui a été trouvé

- Sans réseau, l'heure affichée au client était celle de l'envoi : la preuve semblait postérieure de 20 minutes. L'heure d'origine doit être conservée.
- Les preuves de deux livreurs différents ne se sont jamais mélangées.
