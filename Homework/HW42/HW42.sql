-- Get the number of employees born before 1965 (birth_date < '1965-01-01') and the average, max, and min current salaries of these employees. (Employees DB)
USE employees;
SELECT COUNT(FORMAT(e.emp_no, 'N')) as total_employees,

CONCAT('$', FORMAT(MIN(s.salary), 2)) as min_salary,
CONCAT('$', FORMAT(AVG(s.salary), 2)) as average_salary,
CONCAT('$', FORMAT(MAX(s.salary), 2)) as max_salary
FROM employees e
JOIN salaries s ON s.emp_no = e.emp_no
WHERE e.birth_date < '1965-01-01';

-- Get the number of employees that share birthdays (i.e birthdays are the same, not born on the same exact day, just they celebrate the same birthday, they may be different ages) and show the birthday, the average, max, and min current salaries of these employees. (Employees DB)
USE employees;
SELECT DATE_FORMAT(e.birth_date, "%m/%d") as day_and_month,
COUNT(e.birth_date) as employees,
CONCAT('$', FORMAT(MIN(s.salary), 2)) as min_salary,
CONCAT('$', FORMAT(AVG(s.salary), 2)) as average_salary,
CONCAT('$', FORMAT(MAX(s.salary), 2)) as max_salary
FROM employees e
JOIN salaries s ON s.emp_no = e.emp_no
GROUP BY DATE_FORMAT(e.birth_date, "%m/%d")
HAVING COUNT(*) > 1;

-- Get all title's that have more than 5000 employees with that title (Employees DB)
USE employees;
SELECT t.title
FROM titles t
GROUP BY t.title
HAVING COUNT(t.title) > 5000;

--Group customers by cities, only show cities that have at least 2 customers (Hint: Group BY, Having COUNT >= 2) (northwind DB)
USE northwind;
SELECT City city
FROM customers c
GROUP BY c.City
HAVING COUNT(city) >= 2;

-- Find all the employees in the northwind database older than the average employee (subquery, avg) – We didn’t do this one in class, a subquery in the WHERE clause
USE northwind;
-- NOTE: returns an empty row for some reason. I have no idea why. Tried a bunch of explicitness and casts and stuff, but it always returns an empty row. Is this not how I'm supposed to do it?
SELECT *
FROM employees e
WHERE e.BirthDate < (
    SELECT AVG(e.BirthDate)
);
