-- #1
SELECT CONCAT(e.FirstName, ' ', e.LastName) as full_name, COALESCE(NULLIF(e.Region, ''), e.City) as region
FROM employees e
UNION
	SELECT
    c.CompanyName, COALESCE(NULLIF(c.Region, ''), c.City)
    FROM customers c
ORDER BY region;

-- #2

CREATE TABLE products2
SELECT * FROM products;

UPDATE products2 p2
SET p2.unitPrice = p2.unitPrice * 1.1
WHERE p2.UnitsInStock < 10;

-- #3
INSERT INTO products2 (ProductName, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, SupplierID, CategoryID)
SELECT CONCAT(p2.ProductName, 'V2'),
p2.UnitPrice * 2,
5,
0,
2,
-- how do I automatically fill these remaining columns? Is there a `..products2` syntax for this or something?
p2.SupplierID,
p2.CategoryID
FROM products2 p2
WHERE p2.Discontinued = 'y';
-- #4
DELETE FROM products2
	WHERE products2.ProductName IN (
        SELECT p2.ProductName FROM products2 p2
		WHERE p2.ProductName REGEXP '.*V2$'
    )
;
-- #5
CREATE TABLE order_backup
SELECT o.OrderID, c.ContactName
FROM customers c
JOIN orders o WHERE  o.CustomerID = c.CustomerID;
-- #6
SELECT
	c.CategoryName,
	p.ProductName,
	p.UnitPrice,
	ROW_NUMBER() OVER(
    		PARTITION BY p.CategoryID ORDER BY p.UnitPrice DESC
	) AS rank
FROM products p
JOIN categories c ON c.CategoryID = p.CategoryID;
