#!/bin/zsh
sudo systemctl start mariadb.service

mariadb --user=root --password='root testing' <<EOF
	CREATE DATABASE IF NOT EXISTS nodeUser4;
	USE nodeUser4;
	DROP TABLE IF EXISTS contacts;
	CREATE TABLE contacts (
		id INT AUTO_INCREMENT PRIMARY KEY,
		first VARCHAR(128) NOT NULL,
		last VARCHAR(128) NOT NULL,
		email VARCHAR(128) NOT NULL,
		phone VARCHAR(128) NOT NULL
	);

	INSERT INTO contacts
	(first, last, email, phone) VALUES
		("George", "Washington", "gwashington@whitehouse.gov", "3458945790245"),
		("Abraham", "Lincoln", "alincoln@whitehouse.gov", "469368306780")
	;

	DROP USER IF EXISTS 'contacts_user'@'localhost';
	CREATE USER 'contacts_user'@'localhost' IDENTIFIED BY 'testing testing 123';
	GRANT ALL ON nodeUser4.contacts TO 'contacts_user'@'localhost';
	FLUSH PRIVILEGES;
EOF

if [[ Field$'\t'Type$'\t'Null$'\t'Key$'\t'Default$'\t'Extra$'\n'id$'\t'int\(11\)$'\t'NO$'\t'PRI$'\t'NULL$'\t'auto_increment$'\n'first$'\t'varchar\(128\)$'\t'NO$'\t'$'\t'NULL$'\t'$'\n'last$'\t'varchar\(128\)$'\t'NO$'\t'$'\t'NULL$'\t'$'\n'email$'\t'varchar\(128\)$'\t'NO$'\t'$'\t'NULL$'\t'$'\n'phone$'\t'varchar\(128\)$'\t'NO$'\t'$'\t'NULL$'\t' != "$(mariadb --user=root --password='root testing' nodeUser4 -e 'describe contacts')" ]] then
	echo -e '\e[1;91;mERROR: unexpected output when checking contact''s schema'
	exit 1
fi


if [[ id$'\t'first$'\t'last$'\t'email$'\t'phone$'\n'1$'\t'George$'\t'Washington$'\t'gwashington@whitehouse.gov$'\t'3458945790245$'\n'2$'\t'Abraham$'\t'Lincoln$'\t'alincoln@whitehouse.gov$'\t'469368306780 != "$(mariadb --user=root --password='root testing' nodeUser4 -e 'SELECT * FROM contacts')" ]] then
	echo -e '\e[1;91;mERROR: unexpected output when checking contacts''s rows'
	exit 1
fi

echo -e '\e[32msuccess'