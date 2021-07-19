const mysql = require('mysql');
const inquirer = require('inquirer');
const { inherits } = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user:'root',
    password:'root',
    database:'employees_db',
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`Succesfully Connected to employees_db`);
    init();
});

function init(){
    console.log('Welcome to Jafet Manauth Enterprises\' Employee CMS');
    inquirer
    .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do today?',
        choices: [
            'View All...',
            'Add...',
            'Update...',
        ]
    })
    .then((answer) => {
        switch(answer.action) {
            case 'View All...':
                inquirer
                .prompt({
                    name: 'viewChoice',
                    type: 'list',
                    message: 'Do you want to view all...',
                    choices: [
                        'Employees?',
                        'Roles?',
                        'Departments?',
                    ]
                })
                .then((answer2) => {
                    switch(answer2.viewChoice) {
                        case 'Employees?':
                            viewEmployees();
                            break;
                        case 'Roles?':
                            viewRoles();
                            break;
                        case 'Departments?':
                            viewDepartments();
                            break;
                        default:
                            console.log('something went wrong in the the viewall choice switch');
                            break;
                    }
                });
                break;
            case 'Add...':
                inquirer
                .prompt({
                    name:'addChoice',
                    type:'list',
                    message: 'What do you want to add?',
                    choices: [
                        'Employee',
                        'Role',
                        'Department',
                    ]
                })
                .then((answer3) => {
                    switch(answer3.addChoice) {
                        case 'Employee':
                            addEmployee();
                            break;
                        case 'Role':
                            addRole();
                            break;
                        case 'Department':
                            addDepartment();
                            break;
                        default:
                            console.log('something went wrong in the addchoice choice switch');
                            break;
                    }
                });
                break;
            case 'Update...':
                inquirer
                .prompt({
                    name:'updateChoice',
                    type: 'list',
                    message: 'What would you like to update?',
                    choices: [
                        'Employee',
                        'Role',
                        'Department',
                    ]
                })
                .then((answer4) => {
                    switch(answer4.updateChoice){
                        case 'Employee':
                            updateEmployee();
                            break;
                        case 'Role':
                            updateRole();
                            break;
                        case 'Department':
                            updateDepartment();
                            break;
                        default:
                            console.log('something went wrong in the update choice switch tree');
                            break;
                    }
                });
                break;
            default:
                console.log('something went wrong in the what would you like to do today tree');
                break;
        }
            
    });
};

function viewEmployees(){
    console.log('wasssup foo you made it this far');
};

function viewRoles(){
    console.log('wassup foo you made it this far');
};

function viewDepartments(){
    console.log('wassup foo you made it this far');
};

function addEmployee(){
    console.log('wassup foo you made it this far');
};

function addRole(){
    console.log('wassup foo you made it this far');
};

function addDepartment(){
    console.log('wassup foo you made it this far');
};

function updateEmployee(){
    console.log('wassup foo you made it this far');
};

function updateRole(){
    console.log('wassup foo you made it this far');
};

function updateDepartment(){
    console.log('wassup foo you made it this far');
};