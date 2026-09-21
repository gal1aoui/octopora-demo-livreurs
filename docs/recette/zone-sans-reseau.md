# Plan de recette : Tests en zone sans réseau

## Périmètre

Rejouer une tournée complète en mode avion : les actions du livreur restent sur le téléphone et partent au retour du réseau.

## Appareils

Galaxy A03 (Android 11), Galaxy A14 (Android 13), iPhone 11 (iOS 17).

## Cas de test

| N° | Étapes | Résultat attendu | Résultat |
|----|--------|------------------|----------|
| 1 | Passer le téléphone en mode avion au départ de l'entrepôt | La tournée reste affichée | OK |
| 2 | Marquer deux arrêts livrés | Les deux actions sont en attente | OK |
| 3 | Fermer l'application et la rouvrir | Les deux actions sont toujours en attente | OK |
| 4 | Rétablir le réseau | Les deux actions partent, la file est vide | OK |
| 5 | Couper le réseau pendant l'envoi | L'action non envoyée reste dans la file | OK |
| 6 | Livrer 30 arrêts hors connexion | Aucune action perdue | Lenteur sur le Galaxy A03 |

## Ce qui a été trouvé

- Aucune action perdue, même après redémarrage de l'application.
- Le renvoi de 30 actions prend 40 s sur le Galaxy A03 : acceptable, à surveiller.
