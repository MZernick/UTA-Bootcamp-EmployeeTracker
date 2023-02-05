const mysql = require('mysql2');
const inquirer = require('inquirer');
const Connection = require('mysql2/typings/mysql/lib/Connection');


//VIEW DEPARTMENTS
const viewDepartments = (connection) => {
    return connection.query("SELECT * FROM department;")
        .then(([department]) => {
            console.table(department);
        });
};

//VIEW ROLES
const viewRoles = (connection) => {
    return connection.query("SELECT roles.id, roles.title, roles.salary, department.department_name FROM roles INNER JOIN department ON department.id = roles.department_id ORDER BY roles.id;")
        .then(([roles]) => {
            console.table(roles);
        });
};

//VIEW EMPLOYEES
const viewEmployees = (connection) => {
    return connection.query("SELECT a.id, a.first_name AS 'First Name', a.last_name AS 'Last Name', a.role_id AS 'Title', department.department_name AS 'Department', roles.salary AS 'Salary', CONCAT(b.first_name, ' ', b.last_name) AS 'Manager' FROM employees AS a JOIN roles ON a.role_id = roles.id JOIN department ON roles.department_id = department.id LEFT OUTER JOIN employees AS b ON a.manager_id = b.id;")
        .then(([employees]) => {
            console.table(employees);
        });
};

//ADD DEPARTMENT
const addDepartment = (connection) => {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the New Department?',
            name: 'department_name',
        },
    ]).then(({ department_name }) => {
        return connection.query("INSERT INTO department SET ?", department_name, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: result
            });
        })
    })
        .then(() => {
            console.log("Added New Department")
        })
};

//ADD ROLE
const addRole = (connection) => {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'What is the New Role?',
            name: 'title',
        },
        {
            type: 'input',
            message: 'How much does this role make?',
            name: 'salary',
        },
        {
            type: 'checkbox',
            message: 'What Department is this role in?',
            name: 'department',
            choices: [
                '1 Sales',
                '2 Engineering',
                '3 Finance',
                '4 Legal'
            ]
        }
    ]).then(({ }) => {
        return connection.query("INSERT INTO Role SET ?", { title, salary, department_id }, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: result
            });
        })
    })
        .then(() => {
            console.log("Added Role")
        })
};

//ADD Employee
const addEmployee = (connection) => {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'What is the first name of the new employee?',
            name: 'first_name',
        },
        {
            type: 'input',
            message: 'What is the last name of the new employee?',
            name: 'last_name',
        },
        {
            type: 'list',
            message: 'What is the role of the new employee?',
            name: 'title',
            choices: [
                'Salesperson',
                'Sales Team Lead',
                'Lead Engineer',
                'Software Engineer',
                'Account Manager',
                'Accountant',
                'Legal Team Lead',
                'Lawyer'
            ]
        },
        {
            type: 'list',
            message: 'Who will they report to?',
            name: 'manager',
            choices: [
                'Joe Luna',
                'Ashley Rodriguez',
                'Kunal Singh',
                'Sarah Lourd'
            ]
        },
    ]).then(({ Employee_name }) => {
        return connection.query("INSERT INTO Employee SET ?", Employee_name, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: result
            });
        })
    })
        .then(() => {
            console.log("Added New Employee")
        })
};

module.exports = addDepartment;

module.exports = viewDepartments;