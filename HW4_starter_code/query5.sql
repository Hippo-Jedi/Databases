-- Find the film_title of all films which feature both KIRSTEN PALTROW and WARREN NOLTE
-- Order the results by film_title in descending order.
Select film_title from film inner join film_actor on film.film_id = film_actor.film_id inner join actor on film_actor.actor_id = actor.actor_id where first_name = 'KIRSTEN' and last_name = 'PALTROW' INTERSECT Select film_title from film inner join film_actor on film.film_id = film_actor.film_id inner join actor on film_actor.actor_id = actor.actor_id where first_name = 'WARREN' and last_name = 'NOLTE' order by film_title desc;


