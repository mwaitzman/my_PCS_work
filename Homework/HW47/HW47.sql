-- #1
DROP PROCEDURE IF EXISTS northwind.raise_below_average_products; -- let's me reuse the code  without removing the proc definition from it without getting error messages. also allows easy updating of the proc, obviously
DELIMITER |
CREATE PROCEDURE raise_below_average_products(IN percentage float, OUT new_average double)
BEGIN
		-- creat the table to store the IDs we're updating in
		CREATE TEMPORARY TABLE IF NOT EXISTS updated_IDs_tmp (id INT);
        
        -- clear the last call's contents from the table;
        TRUNCATE TABLE updated_IDs_tmp;
        
    -- add to the table the IDs of all the products we want to update
    INSERT INTO updated_IDs_tmp (id) (
        SELECT p.ProductID 
        FROM products p
        WHERE p.UnitPrice < (
    		SELECT AVG(p.UnitPrice)
    	)
    );
    
    
    -- update the products that we want to update
	UPDATE products p
	SET p.UnitPrice = p.UnitPrice * (1 + percentage) -- I'm assuming that by "all the products that are below average", you meant "all the products whose (unit) prices is less than the average unit price of all the products", as that's what makes the most sense. Correct me if I'm wrong
	WHERE p.ProductID IN (
        SELECT id from updated_IDs_tmp
    	)
	;
    
    -- compute the new average and store it into the `OUT` `new_average` var.
    SELECT (SELECT AVG(p.UnitPrice) FROM products p) INTO new_average; -- could probably optimize the recalculations if I refactored a bit, but ehhh
    
    -- hopefully do the hacky-sounding pseudo-return you wanted us to try to do ( I doubt this'll work - I'm guessing you want the "CREATE PROCEDURE AS SELECT" pattern or something, but I don't know how to execute the other statements in there, so I'll just accept that this is is probably wrong and wait until next class to see you demonstrate how to actually do it).
    SELECT * FROM updated_IDs_tmp;
END
|

-- #2
DELIMITER |
CREATE PROCEDURE change_employee_department(IN employee INT(11), IN new_department CHAR(4))
BEGIN
	-- mark current department as ending today
	UPDATE dept_emp de
    SET de.to_date = CURRENT_DATE
    WHERE de.to_date = '9999-01-01' AND de.emp_no = employee;
    
    INSERT INTO de (emp_no, dept_no, from_date, to_date)
    VALUES (
        employee,
        new_department,
        CURRENT_DATE,
        '9999-01-01'
    );
END
|
