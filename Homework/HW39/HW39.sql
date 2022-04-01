CREATE DATABASE companies_db;
USE companies_db;
CREATE TABLE companies_table(
    name VARCHAR(128) NOT NULL,
    phone_number INT(12) NOT NULL,
    city VARCHAR(32) NOT NULL,
    state VARCHAR(2) NOT NULL
);
INSERT INTO `companies_table` (`name`, `phone_number`, `city`, `state`) VALUES ('Non-scumbag, Inc.', '538059348', 'Non-wokeland', 'FL'), ('Ron\'s \'Tards', '532854753', 'Austin', 'TX'), ('An FSF-endorsed electronics vendor', '0254653589', 'Anchorage', 'AK'), ('Fugly Bob\'s', '00000009676', 'Brockton Bay', 'NH'), ('Allah\'s Best', '235945684', 'Boomland', 'NJ'), ('Sligger\'s', '591478677', 'Jarkav', 'MD');

SELECT name, phone_number FROM companies_table;
SELECT name, city FROM companies_table WHERE companies_table.state = 'NJ';
SELECT name, city FROM companies_table WHERE companies_table.state <> 'NJ';
SELECT name FROM companies_table WHERE companies_table.state = 'NJ' AND companies_table.city <> 'Lakewood' ORDER BY companies_table.name DESC;
SELECT name FROM companies_table WHERE companies_table.state IN ('NY', 'NJ' 'NM', 'NH');
SELECT name FROM companies_table WHERE companies_table.state = '%land';