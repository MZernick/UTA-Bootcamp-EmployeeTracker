const mysql = require('mysql2');
const inquirer = require('inquirer');

//MAIN PROMPTS
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Password1234',
        database: 'office_db'
    });
    // .then((db) => {
    //     connection = db;
    //     console.log(`Connected to the office_db database.`);
    // })
    // db.then(({}) => {
    //     return main();
    // // })
    // // .then(() => {
    // //     return addDepartment();
    // });

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
        return ; 
    }
        
}).then((connection) => {
    connection.end();
});
};

//VIEW DEPARTMENTS
function viewDepartments() { 
    db.query("SELECT * FROM department;", (err, result) => {
            console.table(result);
            console.log(err);
            main();
        });
    };

//VIEW ROLES
function viewRoles() {
    db.query("SELECT roles.id, roles.title, roles.salary, department.department_name FROM roles INNER JOIN department ON department.id = roles.department_id ORDER BY roles.id;", (err, result) => {
            console.table(result);
            console.log(err);
            main();
        });
};

//VIEW EMPLOYEES
function viewEmployees() {
    db.query("SELECT a.id, a.first_name AS 'First Name', a.last_name AS 'Last Name', a.role_id AS 'Title', department.department_name AS 'Department', roles.salary AS 'Salary', CONCAT(b.first_name, ' ', b.last_name) AS 'Manager' FROM employees AS a JOIN roles ON a.role_id = roles.id JOIN department ON roles.department_id = department.id LEFT OUTER JOIN employees AS b ON a.manager_id = b.id;",(err, result) => {
            console.table(result);
            console.log(err);
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
        console.log(response)
        db.query("INSERT INTO roles (title, salary, department_id) VALUES (???, ??, ?);", [ response.title, response.salary, response.department.substring(0,2) ], (err, result) => {
            console.log(result);
            });
        // if (response.department === '1 Sales') {
        //     var departmentID = 1;
        //     db.query("INSERT INTO roles (title, salary, department_id) VALUES (???, ??, ?);", [ response.title, response.salary, departmentID ], (err, result) => {
        //         console.log(result);
        //         });
        // }else if (response.department === '2 Engineering') {
        //     var departmentID =2;
        //     db.query("INSERT INTO roles (title, salary, department_id) VALUES (???, ??, ?);", [ response.title, response.salary, departmentID ], (err, result) => {
        //         console.log(result);
        //         });
        // }else if (response.department === '3 Finance') {
        //     var departmentID =3;
        //     db.query("INSERT INTO roles (title, salary, department_id) VALUES (???, ??, ?);", [ response.title, response.salary, departmentID ], (err, result) => {
        //         console.log(result);
        //         });
        // }else if (response.department === '4 Legal') {
        //     var departmentID =4;
        //     db.query("INSERT INTO roles (title, salary, department_id) VALUES (???, ??, ?);", [ response.title, response.salary, departmentID ], (err, result) => {
        //         console.log(result);
        //         });
        // }
        // db.query("INSERT INTO roles (title, salary, department_id) VALUES (???, ??, ?);", [ response.title, response.salary, departmentID ], (err, result) => {
        // console.log(result)
        // })
    })
        .then(() => {
            console.log("Added Role");
            main();
        })
};

main();