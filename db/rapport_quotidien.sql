-- LIVRAISON-42 : rapport quotidien, une ligne par livreur. Paramètre : :jour ('AAAA-MM-JJ').
select l.nom as livreur,
       count(a.id) as arrets,
       coalesce(sum(a.statut = 'livre'), 0) as livres,
       coalesce(sum(a.statut = 'echec'), 0) as echecs,
       min(a.livre_le) as premiere_livraison,   -- horodatages UTC, ISO 8601
       max(a.livre_le) as derniere_livraison
from tournees t
join livreurs l on l.id = t.livreur_id
left join arrets a on a.tournee_id = t.id
where t.jour = :jour
group by l.id
order by l.nom;
