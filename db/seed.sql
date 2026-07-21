-- LIVRAISON-3 : données d'exemple pour la recette (la tournée du jour de deux livreurs).
pragma foreign_keys = on;

insert into livreurs (id, nom, telephone, code_acces) values
  (1, 'Karim B.', '+216 00 000 201', '481516'),
  (2, 'Nadia S.', '+216 00 000 202', '234200');

insert into tournees (id, livreur_id, jour, vehicule) values
  (1, 1, date('now'), 'Fourgon 12'),
  (2, 2, date('now'), 'Fourgon 07');

insert into arrets (tournee_id, ordre, destinataire, adresse, creneau, statut, livre_le) values
  (1, 1, 'Pharmacie du Lac', '12 rue du Lac Léman, Tunis', '08:00-10:00', 'livre', strftime('%Y-%m-%dT07:42:00Z', 'now')),
  (1, 2, 'Librairie El Kitab', '45 avenue Habib Bourguiba, Tunis', '09:00-12:00', 'livre', strftime('%Y-%m-%dT08:15:00Z', 'now')),
  (1, 3, 'Mme Haddad', '8 rue de Marseille, Tunis', '10:00-12:00', 'a_livrer', null),
  (1, 4, 'Atelier Sfax Couture', '3 impasse des Jasmins, La Marsa', '14:00-18:00', 'a_livrer', null),
  (2, 1, 'Boulangerie Ennasr', '21 rue 7000, Ennasr', '07:00-09:00', 'livre', strftime('%Y-%m-%dT06:58:00Z', 'now')),
  (2, 2, 'M. Gharbi', '15 rue Ibn Khaldoun, Ariana', '09:00-12:00', 'echec', null);
