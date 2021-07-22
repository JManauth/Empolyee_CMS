const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

let rolesArray = [];

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user:'root',
    password:'root',
    database:'employees_db',
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`Succesfully Connected to employees_db \n`);
    console.log('Welcome to Jafet Manauth Enterprises\' Employee CMS');
    console.log('\n');
    init();
});

function init(){
    
    inquirer
    .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do today?',
        choices: [
            'View All...',
            'Add...',
            'Update...',
            'Search...',
            'EXIT',
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
            case 'EXIT':
                console.log('Thank you for using our Empolyee CMS Software today!');
                return process.exit();
            default:
                console.log('something went wrong in the what would you like to do today tree');
                break;
        }
            
    });
};

function viewEmployees(){
    console.log('Displaying All Employees \n');
    const query = 'SELECT id, first_name, last_name, role_title, salary, dep_name FROM employee, role, department WHERE employee.role_id = employees_db.role.role_id AND role.department_id = department.dep_id;';
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            console.log('\n');
            init(); 
        });
};

function viewRoles(){
    console.log('\n Displaying All Roles \n');
    const query = 'SELECT role_id, role_title, salary FROM role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        console.log('\n');
        init();
    })
};

function viewDepartments(){
    console.log('\n Displaying All Departments \n');
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        console.log('\n');
        init();
    })
};

 function addEmployee(){
    const roleInq = 'SELECT role_id, role_title FROM role';


    connection.query(roleInq, (err, res) => {
        if (err) throw err;
            res.forEach(({role_title}) => {
                rolesArray.push(role_title);
            });
        
         addEmployee2();
    }); 
};

function addEmployee2(){
    inquirer
    .prompt([
        {
        name: 'fname',
        type: 'input',
        message: 'First Name:'
        },
        {
            name:'lname',
            type:'input',
            message:'Last Name:',
        },
        {
            name:'role',
            type:'list',
            message:'Employee Role',
            choices: rolesArray,
        }
    ])
    .then((ans) => {
        let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('${ans.fname}', '${ans.lname}', ${rolesArray.indexOf(ans.role) + 1}, 0)`;
        connection.query(query, (err, res) =>{
            if(err) throw err;
            console.log(`\n${ans.fname}  ${ans.lname} has been succesfully added to the system!\n`);
        });
    }) 

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