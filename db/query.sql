-- view all departments
USE office_db;

-- CREATE TABLE alltables SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, department.department_name, manager_id
-- FROM roles
--   INNER JOIN department ON department.id = roles.department_id
--   INNER JOIN employees ON employees.role_id = roles.id
--  ORDER BY employees.id;

-- CREATE TABLE managers SELECT  employees.first_name, employees.last_name, manager_id
-- FROM employees
-- WHERE manager_id IS NULL;

-- View All Employees
SELECT a.id,
    a.first_name AS "First Name",
    a.last_name AS "Last Name",
    a.role_id AS "Title",
    department.department_name AS "Department",
    roles.salary AS "Salary",
    CONCAT(b.first_name, " ", b.last_name) AS "Manager"
FROM employees AS a
JOIN roles ON a.role_id = roles.id
JOIN department ON roles.department_id = department.id
LEFT OUTER JOIN employees AS b ON a.manager_id = b.id;