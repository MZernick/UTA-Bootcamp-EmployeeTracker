-- view all departments
USE office_db;

SELECT id, title, salary, department_id;
SELECT OrderNumber, TotalAmount, FirstName, LastName, City, Country
  FROM roles 
  LEFT JOIN [department] department_name ON department.department_name = roles.department_id
 ORDER BY TotalAmount