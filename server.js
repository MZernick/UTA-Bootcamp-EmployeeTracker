const mysql = require('mysql2');
const inquirer = require('inquirer');
const Connection = require('mysql2/typings/mysql/lib/Connection');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//MAIN PROMPTS
mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Password1234',
        database: 'office_db'
    })
    .then((db) => {
        connection = db;
        console.log(`Connected to the office_db database.`);
    })
    .then(() => {
        return viewDepartments();
    })
    .then(() => {
        return addDepartment();
    });

// const params = [req.body.review, req.params.id];
//MAIN PROMPT
const main = inquirer.prompt([
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
            'Update Employee Role'
        ]
    }
])

