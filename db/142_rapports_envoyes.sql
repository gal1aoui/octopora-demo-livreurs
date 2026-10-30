-- LIVRAISON-42 : trace des bilans du soir envoyés au client.
create table if not exists rapports_envoyes (
  id           integer primary key,
  jour         text not null unique,  -- 'AAAA-MM-JJ' : un seul bilan par jour
  destinataire text not null,
  livres       integer not null,
  arrets       integer not null,
  envoye_le    text not null          -- horodatage UTC, ISO 8601
);

create index if not exists rapports_envoyes_envoye on rapports_envoyes (envoye_le);
