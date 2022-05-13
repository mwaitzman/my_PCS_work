-- #1.a
ALTER TABLE students_courses -- the `students` table doesn't have a grade column, so I assume you mean this
ALTER COLUMN students_courses.grade
SET DEFAULT 65;

-- #1.b
ALTER TABLE students_courses
ALTER COLUMN students_courses.grade
DROP DEFAULT;

-- #1.c
ALTER TABLE professors
CHANGE id profId int(10) unsigned;

-- #2
CREATE FUNCTION years_in_service(emp_id int(11))
RETURNS float
DETERMINISTIC
RETURN (
    SELECT (SUM(DATEDIFF(
        IF(de.to_date = "9999-01-01", CURRENT_DATE, de.to_date),
        de.from_date)) / 365.25)
    FROM dept_emp de
    WHERE de.emp_no = emp_id
);

SELECT FORMAT(years_in_service(e.emp_no), 2), CONCAT(e.first_name, ' ', e.last_name)
FROM employees e;
