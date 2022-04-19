-- ! get All the employees’ first and last name and their manager’s first and last name
-- get emp first and last name
SELECT e.first_name as emp_first_name, e.last_name as emp_last_name, 
m.first_name as man_first_name, m.last_name as man_last_name
FROM `employees` e
-- get emp dept id
LEFT JOIN `current_dept_emp` c ON e.emp_no = c.emp_no
-- get emp man id
LEFT JOIN `dept_manager` d ON c.dept_no = d.dept_no
-- get man first and last name
JOIN `employees` m ON d.emp_no = m.emp_no
-- filter out old manager entries - we only want the current manager
WHERE d.to_date = '9999-01-01';


-- ! Get ALL employees and name of current department if they manage (null if none)
SELECT e.*, d.dept_name
FROM `employees` e
-- get department id
LEFT JOIN `dept_manager` dm ON e.emp_no = dm.emp_no
-- get department name
LEFT JOIN `departments` d ON d.dept_no = dm.dept_no;
