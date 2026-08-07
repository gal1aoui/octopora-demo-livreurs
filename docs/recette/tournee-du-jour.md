# Plan de recette : Recette de la tournée du jour

## Périmètre

Dérouler la tournée du jour de Karim B. avec les données réelles d'une journée : affichage des arrêts, progression et rapport.

## Appareils

Galaxy A14 (Android 13) et iPhone 11 (iOS 17), données de `db/seed.sql`.

## Cas de test

| N° | Étapes | Résultat attendu | Résultat |
|----|--------|------------------|----------|
| 1 | Ouvrir `tournee.html` | Quatre arrêts, dans l'ordre 1 à 4 | OK |
| 2 | Lire la progression | « 2 livraisons sur 4 (50 %) » | OK |
| 3 | Marquer l'arrêt 3 comme échec | Le statut passe à « Échec », la progression reste à 50 % | OK |
| 4 | Ouvrir `rapport.html` | Heures de première et dernière livraison à l'heure de Tunis | OK |
| 5 | Comparer avec la feuille papier de la veille | Mêmes arrêts, mêmes créneaux | Un créneau différent sur l'arrêt 4 |

## Ce qui a été trouvé

- L'arrêt 4 (Atelier Sfax Couture) a un créneau de 14:00-18:00 dans l'application et 14:00-17:00 sur la feuille papier : à confirmer avec l'exploitation.
- Aucun plantage sur les deux téléphones.
