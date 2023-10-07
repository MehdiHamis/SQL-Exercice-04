-- supprimer la base de données si elle existe, en mode développement
DROP DATABASE IF EXISTS formation;

-- créer une base de données
CREATE DATABASE formation;

-- créer une table classroom
CREATE TABLE formation.classroom(
	id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(6) NOT NULL
);

-- créer une table skill
CREATE TABLE formation.skill(
	id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL UNIQUE
);

-- créer une table student
CREATE TABLE formation.student(
	id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	firstname VARCHAR(30) NOT NULL,
	lastname VARCHAR(50) NOT NULL,
	age TINYINT(2) NOT NULL,
	birthday DATE,
	isExternal BOOLEAN NOT NULL,
	classroom_id TINYINT UNSIGNED NOT NULL,
	FOREIGN KEY(classroom_id) REFERENCES formation.classroom(id)
);

-- créer la table de jointure student/skill
CREATE TABLE formation.student_skill(
	student_id TINYINT UNSIGNED NOT NULL,
	skill_id TINYINT UNSIGNED NOT NULL,
	FOREIGN KEY(student_id) REFERENCES formation.student(id) ON DELETE CASCADE,
	FOREIGN KEY(skill_id) REFERENCES formation.skill(id),
	PRIMARY KEY(student_id, skill_id)
);

-- créer la table role
CREATE TABLE formation.role(
	id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL UNIQUE
);

-- créer la table user
CREATE TABLE formation.user(
	id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(150) NOT NULL,
	role_id TINYINT UNSIGNED NOT NULL,
	FOREIGN KEY(role_id) REFERENCES formation.role(id)
);

-- insertion de données
INSERT INTO formation.role
VALUES
	(NULL, 'admin'),
	(NULL, 'user')
;

INSERT INTO formation.user
VALUES
	(NULL, 'admin@admin.com', '$argon2i$v=19$m=16,t=2,p=1$RzJERmpXMm5ya1ROSVBkdA$uZgl0SmM9THt37d9JWZRwg', 1),
	(NULL, 'user@user.com', '$argon2i$v=19$m=16,t=2,p=1$RnAwbmd6S2VMclpoWHNFYg$H0Dsq6l2+366MXMxbIzA9Q', 2)
;

/*
	lister les enregistrements
		en mode développement : TABLE database_name.table_name;
		en mode production :
			SELECT
				table_name.*
			FROM
				database_name.table_name;
*/
INSERT INTO formation.classroom
VALUES
	( NULL, '6eme A' ),
	( NULL, '6eme B' ),
	( NULL, '5eme A' ),
	( NULL, '5eme B' )
;

INSERT INTO formation.skill
VALUES
	( NULL, 'HTML' ),
	( NULL, 'CSS' ),
	( NULL, 'JS' ),
	( NULL, "L'Agile" ),
	( NULL, 'WordPress' )
;

INSERT INTO formation.student
VALUES
	( NULL, 'Amoro', 'Traore', 25, '1998-12-01', 1, 3 ),
	( NULL, 'Valène', 'Bouleau', 20, '2003-12-01', 0, 1 ),
	( NULL, 'Mahamadou', 'Diagouraga', 30, '1993-12-01', 0, 4 ),
	( NULL, 'Mohamed', 'Abbacar', 22, '2001-12-01', 0, 3 ),
	( NULL, 'Younes', 'Ghezali', 23, '2000-12-01', 1, 2 )
;

INSERT INTO formation.student_skill
VALUES
	( 4, 4 ),
	( 4, 1 ),
	( 2, 3 ),
	( 1, 1 ),
	( 1, 2 ),
	( 1, 3 ),
	( 1, 4 ),
	( 1, 5 )
;

-- mise à jour
-- UPDATE formation.student
-- SET
-- 	student.age = 20,
-- 	student.isExternal = 0,
-- 	student.birthday = '2003-12-31'
-- WHERE
-- 	student.id = 1
-- ;

-- suppression
-- DELETE FROM formation.student
-- WHERE student.id = 1;
