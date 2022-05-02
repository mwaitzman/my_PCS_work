-- 1. List all Orders with their total prices (total – discount, discount is a column in the orderDetail table) (Northwind)
-- I'm assuming discount means discount per item. Seems to make the most sense based on how large they are
SELECT
	CONCAT('$', FORMAT((od.Quantity * (od.UnitPrice - od.Discount)), 2)) AS total_price,
	o.*
FROM orders o
JOIN order_details od ON o.OrderID = od.OrderID;


-- 2. List all orders where the employee on that order lives in that order’s shipped city (use a correlated sub-query on the where) (Hint: order.EmployeeID IN sub-query where the order city is the employee city)
-- done without a subquery
SELECT o.*
FROM orders o
INNER JOIN employees e WHERE o.EmployeeID = e.EmployeeID AND o.ShipCity = e.City;


-- 3. List ten most expensive products
SELECT *
FROM products
ORDER BY products.UnitPrice DESC
LIMIT 10;

-- 4. Show me the company name of the top 10 orders\n\ta.  (subquery, not correlated, using Limit )
-- I assume this is what you mean by company name. You didn't specify the limit criteria so I just left it as the default
SELECT c.CompanyName
FROM orders o
JOIN customers c ON o.CustomerID = c.CustomerID
LIMIT 10;
