# Application livreurs

Ce dépôt est celui du projet « Application livreurs » de l'espace de démonstration
d'[Octopora](https://octopora.com) : l'application mobile des livreurs d'un transporteur : tournée du jour, preuves de livraison, mode hors connexion.

Chaque branche, commit et demande de fusion porte la clé du ticket qu'il fait avancer (`LIVRAISON-61`, par
exemple), et Octopora les affiche sur ce ticket.

Le code reste volontairement simple : des pages HTML, des modules JavaScript sans dépendance et des scripts
SQLite.

## Lancer les tests

```sh
npm test
```

Node 20 ou plus récent suffit, il n'y a rien à installer.

## Créer la base SQLite

```sh
sqlite3 livraison.db < db/001_tournees.sql
sqlite3 livraison.db < db/seed.sql
```

## Conventions

- Une branche par ticket : `feature/LIVRAISON-12-description`, `fix/LIVRAISON-41-description`.
- La clé du ticket en tête de chaque commit et de chaque titre de demande de fusion.
- Les branches `helpi/…` sont ouvertes par Helpi Agent, l'agent de développement d'Octopora. Un humain les
  relit et les fusionne.
