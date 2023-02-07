-- view all departments
USE office_db;

-- View All Employees
-- SELECT a.id,
--     a.first_name AS "First Name",
--     a.last_name AS "Last Name",
--     a.role_id AS "Title",
--     department.department_name AS "Department",
--     roles.salary AS "Salary",
--     CONCAT(b.first_name, " ", b.last_name) AS "Manager"
-- FROM employees AS a
-- JOIN roles ON a.role_id = roles.id
-- JOIN department ON roles.department_id = department.id
-- LEFT OUTER JOIN employees AS b ON a.manager_id = b.id;

-- Add a Department
-- INSERT INTO department (department_name) VALUES (?);

-- Add a Role
-- INSERT INTO roles (title, salary, department_id) 
-- VALUES ('Web Development', 80000, 2)

-- Update Employee
UPDATE employees 
SET role_id = ? 
WHERE first_name = 
            "", [response.title.substring(0,2), response.first_name]