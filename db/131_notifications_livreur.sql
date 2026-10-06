-- LIVRAISON-31 : historique des notifications envoyées aux livreurs.
pragma foreign_keys = on;

create table if not exists notifications_livreur (
  id          integer primary key,
  livreur_id  integer not null references livreurs(id),
  tournee_id  integer references tournees(id),
  type        text not null check (type in ('ajout', 'retrait', 'deplacement')),
  message     text not null,
  envoye_le   text not null,          -- horodatage UTC, ISO 8601
  lu_le       text
);

create index if not exists notifications_livreur_non_lues
  on notifications_livreur (livreur_id, lu_le);
