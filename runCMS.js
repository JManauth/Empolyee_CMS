const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');


let rolesArray = [];
let deptArray = [];
let managersArray = [];
let employeeUpdateId = [];

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
        message: 'Welcome! How can I be of assitance today?',
        choices: [
            'View',
            'Add',
            'Update',
            'Search',
            'EXIT',
        ]
    })
    .then((answer) => {
        switch(answer.action) {
            case 'View':
                inquirer
                .prompt({
                    name: 'viewChoice',
                    type: 'list',
                    message: 'What do you want to view?',
                    choices: [
                        'Employees',
                        'Roles',
                        'Departments',
                    ]
                })
                .then((answer2) => {
                    switch(answer2.viewChoice) {
                        case 'Employees':
                            viewEmployees();
                            break;
                        case 'Roles':
                            viewRoles();
                            break;
                        case 'Departments':
                            viewDepartments();
                            break;
                        default:
                            console.log('something went wrong in the the viewall choice switch');
                            break;
                    }
                });
                break;
            case 'Add':
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
            case 'Update':
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
                console.log('\nThank you for using our Empolyee CMS Software today!');
                return process.exit();
            default:
                console.log('something went wrong in the what would you like to do today tree');
                break;
        }
            
    });
};

function viewEmployees(){
    console.log('\nDisplaying All Employees \n');
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
    rolesArray = [];
     managersArray = [];
    const roleInq = 'SELECT role_id, role_title FROM role';
    const managerInq = 'SELECT first_name FROM employee WHERE employee.role_id = 3'


    connection.query(roleInq, (err, res) => {
        if (err) throw err;
        res.forEach(({role_title}) => {
            rolesArray.push(role_title);
        });
        addEmployee2();
    });
    /*  
    connection.query(managerInq, (err, res) => {
        if (err) throw err;
        res.forEach(({first_name}) =>{
            managersArray.push(first_name);
        });
        addEmployee2();
    }); 
    */
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
            init();
        });
    }) 
};
function addRole(){
    
    const query = 'SELECT dep_name FROM department'

    connection.query(query, (err, res) =>{
        if(err) throw err;
        res.forEach(({dep_name}) =>{
        deptArray.push(dep_name);
        });
        addRole2();
    })
};
function addRole2() {
    inquirer
    .prompt([
        {
            name:'title',
            type:'input',
            message:'Role Title:'
        },
        {
            name:'salary',
            type:'input',
            message:'Salary:'
        },
        {
            name:'dept',
            type:'list',
            message:'Department:',
            choices: deptArray
        }
    ])
    .then((ans) => {
        const query = `INSERT INTO role (role_title, salary, department_id) \n
        VALUES('${ans.title}', ${ans.salary}, ${deptArray.indexOf(ans.dept) +1})`;
        connection.query(query, (err, res) => {
            if(err) throw err;
            console.log(`\n ${ans.title} Has been succesfully added to ${ans.dept} with a salary of ${ans.salary}\n`)
            init();
        });
    })
};
function addDepartment(){
    inquirer
    .prompt({
        name: 'dept',
        type:'input',
        message:'Department Name:'
    })
    .then((ans) => {
        const query = `INSERT INTO department (dep_name) VALUES ('${ans.dept}')`;
        connection.query(query, (err, res) => {
            if(err) throw err;
            console.log(`\n ${ans.dept} has been succesfully added to Departments\n`);
            init();
        })
    });
};

function updateEmployee(){
    rolesArray = [];
    employeeUpdateId = [];
    const roleInq = 'SELECT role_id, role_title FROM role';
    

    connection.query(roleInq, (err, res) => {
        if (err) throw err;
        res.forEach(({role_title}) => {
            rolesArray.push(role_title);
        });
        updateEmployee2();
    });
};
function updateEmployee2(){
    inquirer
    .prompt([
        {
            name:'id',
            type: 'input',
            message: 'Employee ID:'
        },
        {
        name:'choice',
        type: 'list',
        Message:'What do you want to update?',
        choices: [
            'First Name',
            'Last Name',
            'Role',
            ]
        },
    ])
    .then((ans) => {
        employeeUpdateId.push(ans.id);
        switch(ans.choice) {
            case 'First Name':
                updateFName();
                break;
            case 'Last Name':
                updateLName();
                break;
            case 'Role':
                updateEmployeeRole();
                break;
            default:
                console.log('\n something went wrong in the update specific thing for employee switch tree foo \n');
                break;
        };
    });
};

function updateFName(){
    
    inquirer
    .prompt({
        name:'fName',
        type: 'input',
        Message:'First Name:',
    })
    .then((ans) =>{
        const query = `UPDATE employee SET first_name = '${ans.fName}' WHERE id = ${employeeUpdateId}`;
        connection.query(query, (err, res) =>{
            if(err) throw err;
            console.log(`\n First Name was Succesfully updated to ${ans.name}! \n`);
            init();
        });
    });
};

function updateLName(){
    inquirer
    .prompt({
        name:'lName',
        type: 'input',
        Message:'Last Name:',
    })
    .then((ans) =>{
        const query = `UPDATE employee SET last_name = '${ans.lName}' WHERE id = ${employeeUpdateId}`;
        connection.query(query, (err, res) =>{
            if(err) throw err;
            console.log(`\n Last Name was Succesfully updated to ${ans.name}! \n`);
            init();
        });
    });
};

function updateEmployeeRole(){
    inquirer
    .prompt({
        name:'Role',
        type: 'list',
        message:'Role:',
        choices: rolesArray,
        
    })
    .then((ans) => {
        const query = `UPDATE employee SET role_id = ${rolesArray.indexOf(ans.Role) + 1} WHERE id = ${employeeUpdateId}`;
        connection.query(query, (err, res) => {
            if(err) throw err;
            console.log(`\nSuccessfuly updated Role to ${ans.Role}\n`);
            init();
        });
    });
};

function updateRole(){
    console.log('wassup foo you made it this far');
};

function updateDepartment(){
    console.log('wassup foo you made it this far');
};