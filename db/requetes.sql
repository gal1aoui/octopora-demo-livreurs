-- LIVRAISON-3 : requêtes de l'API des tournées.
-- Paramètres nommés : :livreur_id, :jour ('AAAA-MM-JJ'), :tournee_id.

-- GET /api/tournees/du-jour
select t.id, t.jour, t.vehicule,
       count(a.id) as arrets,
       coalesce(sum(a.statut = 'livre'), 0) as livres
from tournees t
left join arrets a on a.tournee_id = t.id
where t.livreur_id = :livreur_id and t.jour = :jour
group by t.id;

-- GET /api/tournees/:id/arrets
select id, ordre, destinataire, adresse, telephone, creneau, statut
from arrets
where tournee_id = :tournee_id
order by ordre;
