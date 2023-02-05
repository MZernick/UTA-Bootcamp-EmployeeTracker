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
        type: 'checkbox',
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
    if (response = 'View all Departments') {
       return viewDepartments();
    }else if (response = 'View all Roles') {
        return viewRoles(); 
    }else if (response = 'View all Employees') {
        return viewEmployees(); 
    }
        
});
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

main();