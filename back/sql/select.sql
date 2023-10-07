-- récupérer toutes les classes
-- SELECT classroom.*
-- FROM formation.classroom;

-- récupérer certaines colonnes
-- SELECT classroom.name
-- FROM formation.classroom;

-- créer une condition
-- SELECT skill.name
-- FROM formation.skill
-- WHERE skill.id = 3
-- OR skill.id = 4
-- ;

-- créer une condition liée à une liste de valeurs
-- SELECT skill.name
-- FROM formation.skill
-- WHERE skill.id IN (1, 5);

-- créer une condition liée à une recherche textuelle
-- SELECT skill.name
-- FROM formation.skill
-- WHERE skill.name LIKE '%e%';

-- créer une condition sur un intervalle
-- SELECT student.firstname, student.lastname
-- FROM formation.student
-- WHERE student.age BETWEEN 20 AND 25
-- AND student.isExternal = 1
-- ;

-- trier / limiter les étudiants
-- SELECT student.firstname, student.lastname
-- FROM formation.student
-- ORDER BY student.lastname
-- LIMIT 3;

-- créer des jointures
-- SELECT student.*, classroom.name AS classroom_name
-- FROM formation.student
-- JOIN formation.classroom
-- ON student.classroom_id = classroom.id
-- ;

SELECT
	student.lastname,
	student.birthday,
 	-- skill.name
	GROUP_CONCAT(skill.name) AS skills
FROM
	formation.student
JOIN
	formation.skill
JOIN
	formation.student_skill
ON
	student_skill.student_id = student.id
AND
	student_skill.skill_id = skill.id
GROUP BY
	student.lastname,
	student.birthday
ORDER BY
	student.lastname
;