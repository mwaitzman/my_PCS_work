CREATE TABLE recipes (
    id int UNSIGNED AUTO_INCREMENT,
    name TEXT,
    description TEXT,
    instructions TEXT,
    CONSTRAINT PRIMARY KEY(id)
);

CREATE TABLE ingredients (
    id int UNSIGNED AUTO_INCREMENT,
    name TEXT,
    calories FLOAT UNSIGNED,
    CONSTRAINT PRIMARY KEY(id)
);

CREATE TABLE recipe_ingredients(
    recipe_id int UNSIGNED,
    ingredient_id int UNSIGNED,
    CONSTRAINT FOREIGN KEY(recipe_id) REFERENCES recipes(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY(ingredient_id) REFERENCES ingredients(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT PRIMARY KEY(recipe_id, ingredient_id)
);



DELIMITER |
CREATE PROCEDURE get_recipe_calories(IN recp_id INT UNSIGNED, OUT cals FLOAT UNSIGNED)
BEGIN
    SELECT (
        SELECT SUM(calories) 
        FROM ingredients I 
        WHERE I.id IN (
            SELECT RI.ingredient_id 
            FROM recipe_ingredients RI 
            WHERE RI.recipe_id = recp_id
        )
    ) INTO cals;
END
|