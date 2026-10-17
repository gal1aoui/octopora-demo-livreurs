# Recette de l'encaissement

## Périmètre
Paiement en espèces avec rendu de monnaie, paiement par carte avec le terminal mobile, annulation d'un paiement, reprise après une coupure réseau.

## Appareils
- Samsung Galaxy A32, Android 11, Chrome 118
- Xiaomi Redmi Note 9, Android 10, Chrome 118
- iPhone SE (2020), iOS 17, Safari (espèces seulement, pas de terminal carte)

## Cas
| N° | Étapes | Résultat attendu | Résultat |
|----|--------|------------------|----------|
| 1 | Arrêt à 12,500 DT, saisir 20,000 DT remis | Monnaie à rendre : 7,500 DT | OK |
| 2 | Arrêt à 8,300 DT, saisir 8,300 DT remis | Monnaie à rendre : 0,000 DT | OK |
| 3 | Saisir un montant remis inférieur au montant dû | Message d'erreur, paiement non validé | OK |
| 4 | Payer par carte, carte acceptée | Code d'autorisation affiché, arrêt marqué payé | OK |
| 5 | Payer par carte, carte refusée | Motif du refus affiché, possibilité de payer en espèces | OK |
| 6 | Couper le Bluetooth du terminal en plein paiement | Message "terminal indisponible", pas de plantage | OK |
| 7 | Annuler un paiement espèces avant validation | Retour à l'arrêt, aucun encaissement enregistré | OK |
| 8 | Valider un paiement en mode avion | Paiement dans la file hors connexion, envoyé au retour du réseau | OK |

## Ce qui a été trouvé
- Cas 6 : sur le Redmi, le message mettait 4 secondes à apparaître. Délai ramené à 2 secondes par l'équipe.
- Les boutons de saisie sont assez grands pour être utilisés avec des gants, sur les trois appareils.
- Pas de terminal carte sur iPhone : le cas 4 à 6 reste à rejouer quand le terminal iOS sera livré.
