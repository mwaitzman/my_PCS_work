-- part 1: "Write SQL to create the following database schema " ... "make it so that any updates are cascaded (on update cascade)." (from HW45-SQL-CreateTables.docx)
CREATE DATABASE HW45;
USE HW45;
CREATE TABLE students (
    id int UNSIGNED AUTO_INCREMENT, -- seems to default to `int(10)`, however much that is
    first_name char(64), -- just being very safe with this large amount
    last_name char(64),
    CONSTRAINT PRIMARY KEY(id)
);
CREATE TABLE professors (
    id int UNSIGNED AUTO_INCREMENT,
    first_name char(64),
    last_name char(64),
    CONSTRAINT PRIMARY KEY(id)
);

CREATE TABLE classes (
    id int UNSIGNED AUTO_INCREMENT,
      name char(192),
    professor_id int UNSIGNED,
    CONSTRAINT PRIMARY KEY(id),
    CONSTRAINT FOREIGN KEY(professor_id) REFERENCES professors(id) 
    	ON UPDATE CASCADE
    	ON DELETE SET NULL
);

CREATE TABLE students_courses (-- the class_records table
    UUID int UNSIGNED AUTO_INCREMENT,
    class_id int UNSIGNED,
    student_id int UNSIGNED,
    grade float CHECK (grade BETWEEN 0 AND 100), -- float by default is an f64, not an f32
    CONSTRAINT PRIMARY KEY(UUID),
    CONSTRAINT FOREIGN KEY(class_id) REFERENCES classes(id),
    CONSTRAINT FOREIGN KEY(student_id) REFERENCES students(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);



-- part 2: "Insert some records and prove to yourself that the primary and foreign key constraints do behave as desired, e.g. can’t have two students with same id. can’t have a student record for non-existent student."
INSERT INTO students(students.first_name, students.last_name) -- is it possible to use an asterisk (wildcard) here??
VALUES("Frank", "McHenry");

INSERT INTO students(students.id, students.first_name, students.last_name) -- interesting that it just ignores the auto-incrementing `id` field, and doesn't even display an error message
VALUES(0, "John", "Smith");

SELECT * FROM students;

INSERT INTO students_courses ( -- FAILS: failed foreign key constraint
    students_courses.class_id, students_courses.student_id
)
	VALUES (
        0, 100 -- 100 is a non-existent student (also 0 is a non-existent class because I haven't made any yet, so it fails for that too, but that's beside the point here)
        );
