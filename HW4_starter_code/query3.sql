-- Find the actor_id first_name, last_name and total_combined_film_length 
-- of Sci-Fi films for every actor.
-- That is the result should list the actor ids, names of all of the actors(even if an actor has not been in any Sci-Fi films) 
-- and the total length of Sci-Fi films they have been in.
-- Look at the category table to figure out how to filter data for Sci-Fi films.
-- Order your results by the actor_id in descending order.
-- Put query for Q3 here
Select actor.actor_id, first_name,last_name, sum(length) from actor inner join film_actor on film_actor.actor_id = actor.actor_id inner join film_category on film_actor.film_id = film_category.film_id inner join category on film_category.category_id = category.category_id inner join film on film_actor.film_id = film.film_id group by actor.actor_id, first_name,last_name having category.name = 'Sci-Fi' order by actor.actor_id desc;

