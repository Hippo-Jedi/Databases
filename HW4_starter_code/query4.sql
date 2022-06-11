-- Find the actor_id, first_name and last_name of all actors who have never been in a Sci-Fi film.
-- Order by the actor_id in ascending order.
-- Put your query for Q4 here
Select actor.actor_id, first_name, last_name from actor, film_actor, film, film_category, category where category.name != "Sci-Fi" order by actor.actor_id desc;