-- LIVRAISON-26 : trace côté serveur des actions reçues après un passage hors connexion.
pragma foreign_keys = on;

create table if not exists actions_hors_connexion (
  id           integer primary key,
  arret_id     integer not null references arrets(id) on delete cascade,
  type         text not null check (type in ('livre', 'echec', 'photo')),
  cree_le      text not null,           -- horodatage UTC posé sur le téléphone
  recu_le      text not null default (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  tentatives   integer not null default 1
);

create index if not exists actions_hors_connexion_arret on actions_hors_connexion (arret_id, cree_le);
