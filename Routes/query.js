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
    return connection.query("SELECT * FROM roles;")
        .then(([roles]) => {
            console.table(roles);
        });
};

//VIEW EMPLOYEES
const viewEmployees = (connection) => {
    return connection.query("SELECT * FROM employees;")
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
        return connection.query("INSERT INTO department SET ?", department_name, (err, result)=> {
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
    ]).then(({  }) => {
        return connection.query("INSERT INTO Role SET ?", {title, salary, department_id}, (err, result)=> {
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
        return connection.query("INSERT INTO Employee SET ?", Employee_name, (err, result)=> {
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