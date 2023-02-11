const mysql = require('mysql2');
const inquirer = require('inquirer');

//MAIN PROMPTS
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Password1234',
        database: 'office_db'
    })

//MAIN PROMPT
const main = () => { 
inquirer.prompt([
    {
        type: 'list',
        name: 'mainprompt',
        message: 'What would you like to do?',
        choices: [
            'View all Departments', 
            'View all Roles', 
            'View all Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update Employee Role',
            'Quit'
        ]
    }
]).then((response)=> {
    console.log(response);
    if (response.mainprompt === 'View all Departments') {
       return viewDepartments();
    }else if (response.mainprompt === 'View all Roles') {
        return viewRoles(); 
    }else if (response.mainprompt === 'View all Employees') {
        return viewEmployees(); 
    }else if (response.mainprompt === 'Add a Department') {
        return addDepartment(); 
    }else if (response.mainprompt === 'Add an Employee') {
        return addEmployee(); 
    }else if (response.mainprompt === 'Add a Role') {
        return addRole(); 
    }else if (response.mainprompt === 'Update Employee Role') {
        return updateEmployee(); 
    }else if (response.mainprompt === 'Quit') {
        return response.end(); 
    }     
})
};

//VIEW DEPARTMENTS
function viewDepartments() { 
    db.query("SELECT * FROM department;", (err, result) => {
            console.table(result);
            main();
        });
    };

//VIEW ROLES
function viewRoles() {
    db.query("SELECT roles.id, roles.title, roles.salary, department.department_name FROM roles INNER JOIN department ON department.id = roles.department_id ORDER BY roles.id;", (err, result) => {
            console.table(result);
            main();
        });
};

//VIEW EMPLOYEES
function viewEmployees() {
    db.query("SELECT a.id, a.first_name AS 'First Name', a.last_name AS 'Last Name', a.role_id AS 'Title', department.department_name AS 'Department', roles.salary AS 'Salary', CONCAT(b.first_name, ' ', b.last_name) AS 'Manager' FROM employees AS a JOIN roles ON a.role_id = roles.id JOIN department ON roles.department_id = department.id LEFT OUTER JOIN employees AS b ON a.manager_id = b.id;",(err, result) => {
            console.table(result);
            main();
        });
};

//ADD DEPARTMENT
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the New Department?',
            name: 'department_name',
        },
    ]).then((response) => {
        console.log(response)
        db.query("INSERT INTO department (department_name) VALUES (?)", response.department_name, (err, result) => {
            if (err) {
                response.status(500).json({ error: err.message });
                return;
            }
        })
    })
        .then(() => {
            console.log("Added New Department")
            main();
        })
};
    


//ADD ROLE
const addRole = () => {
    inquirer.prompt([
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
            type: 'list',
            message: 'What Department is this role in?',
            name: 'department',
            choices: [
                '1 Sales',
                '2 Engineering',
                '3 Finance',
                '4 Legal'
            ]
        }
    ]).then((response) => {
        console.log(response);
        console.log(response.title);
        console.log(response.salary);
        console.log(response.department.substring(0,2));

        db.query("INSERT INTO roles (id, title, salary, department_id) VALUES (DEFAULT, ?, ?, ?);", [response.title, response.salary, response.department.substring(0,2)], (err, result) => {
            if (err) {
                response.status(500).json({ error: err.message });
                return;
            }
            })
    })
        .then(() => {
            console.log("Added Role");
            main();
        })
};

//CURRENT DEPARTMENT


//ADD Employee
const addEmployee = () => {
    inquirer.prompt([
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
                '1 Salesperson',
                '2 Sales Team Lead',
                '3 Lead Engineer',
                '4 Software Engineer',
                '5 Account Manager',
                '6 Accountant',
                '7 Legal Team Lead',
                '8 Lawyer'
            ]
        },
        {
            type: 'list',
            message: 'Who will they report to?',
            name: 'manager',
            choices: [
                '2 Joe Luna',
                '3 Ashley Rodriguez',
                '5 Kunal Singh',
                '7 Sarah Lourd'
            ]
        },
    ])
    .then((response) => {
        console.log(response)
        db.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [response.first_name, response.last_name, response.title.substring(0,2), response.manager.substring(0,2)], (err, result) => {
            if (err) {
                response.status(500).json({ error: err.message });
                return;
            }
        })
    })
        .then(() => {
            console.log("Added New Employee");
            main();
        })
};

//UPDATE Employee
const updateEmployee = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee would you like to update?',
            name: 'first_name',
            choices: [
                'Mike',
                'Joe',
                'Ashley',
                'Kevin',
                'Kunal',
                'Malia',
                'Sarah',
                'Tom'
            ]
        },
        {
            type: 'list',
            message: 'What is the role of the new employee?',
            name: 'title',
            choices: [
                '1 Salesperson',
                '2 Sales Team Lead',
                '3 Lead Engineer',
                '4 Software Engineer',
                '5 Account Manager',
                '6 Accountant',
                '7 Legal Team Lead',
                '8 Lawyer'
            ]
        },
    ]).then((response) => {
        console.log(response)
        db.query("UPDATE employees SET role_id = ? WHERE first_name = ?", [response.title.substring(0,2), response.first_name], (err, result) => {
            if (err) {
                response.status(500).json({ error: err.message });
                return;
            }
        })
    })
        .then(() => {
            console.log(`"Updated file"`)
            main();
        })};

main();