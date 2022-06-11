-- We want to find out how many of each category of film ED CHASE has starred in.

-- So return a table with "category_name" and the count of the "number_of_films" that ED was in that category.

-- Your query should return every category even if ED has been in no films in that category

-- Order by the category name in ascending order.
-- SELECT category.name as "category_name" , count(film_id) as "the number_of_films" FROM category inner JOIN film_category on category.category_id = film_category.category_id inner JOIN film on film_category.film_id = film.film_id inner JOIN film_actor on film.film_id = film_actor.film_id inner JOIN actor on film_actor.actor_id = actor.actor_id group by category.name HAVING actor.first_name = 'ED' and actor.last_name = 'CHASE' order by category.name;

