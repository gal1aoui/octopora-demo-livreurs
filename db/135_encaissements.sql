-- LIVRAISON-35 : paiements encaissés à la livraison.
pragma foreign_keys = on;

create table if not exists encaissements (
  id               integer primary key,
  arret_id         integer not null references arrets(id),
  mode             text not null check (mode in ('especes', 'carte')),
  montant_millimes integer not null check (montant_millimes > 0),
  recu_millimes    integer,           -- espèces seulement : montant remis par le client
  rendu_millimes   integer,           -- espèces seulement : monnaie rendue
  encaisse_le      text not null      -- horodatage UTC, ISO 8601
);

create index if not exists encaissements_arret on encaissements (arret_id);
