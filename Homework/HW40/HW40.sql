SELECT first_name, last_name, FLOOR(DATEDIFF(CURRENT_DATE, birth_date) / 365.25) AS age
FROM `employees`;


WITH prequery as (
	SELECT DISTINCT salaries.emp_no, first_name, last_name, FLOOR(DATEDIFF(CURRENT_DATE, salaries.from_date) / 365.25 * salaries.salary) AS earned_on_this_salary
	FROM employees
	INNER JOIN salaries ON employees.emp_no = salaries.emp_no
	ORDER BY salaries.from_date DESC
)
SELECT first_name, last_name, earned_on_this_salary FROM prequery; -- huge PITA



INSERT INTO `products` (`ProductID`, `ProductName`, `SupplierID`, `CategoryID`, `QuantityPerUnit`, `UnitPrice`, `UnitsInStock`, `UnitsOnOrder`, `ReorderLevel`, `Discontinued`) VALUES ('053952', 'Kokosh Cake', '20', '3', '', '6.69', '345', '57', '1', 'n');


INSERT INTO `employees` (`EmployeeID`, `LastName`, `FirstName`, `Title`, `TitleOfCourtesy`, `BirthDate`, `HireDate`, `Address`, `City`, `Region`, `PostalCode`, `Country`, `HomePhone`, `Extension`, `Photo`, `Notes`, `ReportsTo`) VALUES ('477854', 'Trump', 'Donald', 'The', '45th POTUS', '1946-06-14 06:10:58.000000', '2022-04-06 06:10:58.000000', 'yi0r56-', '4905tui3', '35u90', 'wserghijo', '34590ergjio', '235789235789', '248', 'u89w3t8394', NULL, NULL);


UPDATE employees set Notes = "helluva lot better than sleepy joe" where EmployeeID = '477854';
