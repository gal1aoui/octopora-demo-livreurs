-- LIVRAISON-3 : schéma de l'API des tournées (SQLite).
pragma foreign_keys = on;

create table if not exists livreurs (
  id          integer primary key,
  nom         text not null,
  telephone   text not null,
  code_acces  text not null unique    -- code à 6 chiffres saisi à la connexion
);

create table if not exists tournees (
  id          integer primary key,
  livreur_id  integer not null references livreurs(id),
  jour        text not null,          -- 'AAAA-MM-JJ'
  vehicule    text,
  unique (livreur_id, jour)
);

create table if not exists arrets (
  id            integer primary key,
  tournee_id    integer not null references tournees(id) on delete cascade,
  ordre         integer not null,
  destinataire  text not null,
  adresse       text not null,
  telephone     text,
  creneau       text,                 -- '09:00-12:00'
  statut        text not null default 'a_livrer'
                check (statut in ('a_livrer', 'livre', 'echec')),
  livre_le      text,                 -- horodatage UTC, ISO 8601
  motif_echec   text,
  unique (tournee_id, ordre)
);

create index if not exists arrets_tournee on arrets (tournee_id, ordre);
