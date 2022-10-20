const inquirer = require('inquirer');
const db = require('./db')
require('console.table');

function frontPrompts() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'select',
                message: 'What would you like to do',
                choices: [
                    {
                        name: 'All Departments',
                    },
                    {
                        name: 'All Roles',
                    },
                    {
                        name: 'All Employees',
                    },
                    {
                        name: 'Add Departmet',
                    },
                    {
                        name: 'Add Role',
                    },
                    {
                        name: 'Add Employee',
                    },
                    {
                        name: 'Update Employee',
                    }
                ]
            }
        ]).then(res => {
            let choice = res.choice;
            switch(choice) {
                case 'All_Departments':
                    allDepartments();
                    break;
                case 'All_Roles':
                    allRoles();
                    break;
                case 'All_Employees':
                    allEmployees();
                    break;
                case 'Add_Department':
                    addDepartment();
                    break;
                case 'Add_Role':
                    addRole();
                    break;
                case 'Add_Employee':
                    addEmployee();
                    break;
                case 'Update_Employee':
                    updateEmployee();
            }
        })
}

function allDepartments() {
    const query = connection.query(
        'SELECT * FROM department',
        (err, res) => {
            if (err) {
                console.log(err);
            } else {
            let values = [res]
            console.table(values[0]);
            frontPrompts();
            };
        }
    )
};

function allRoles() {
    const query = connection.query(
        'SELECT * FROM role',
        (err, res) => {
            if (err) {
                console.log(err);
            } else {
                let values = [res]
                console.table(values[0]);
                frontPrompts();
            };
        }
    )
};

function allEmployees() {
    const query = connection.query(
        'SELECT * FROM employees',
        (err, res) => {
            if (err) {
                console.log(err);
            } else {
                let values = [res]
                console.table(values[0]);
                frontPrompts();
            };
        }
    )
};

function addDepartment() {
    inquirer
        .prompt([
            {
                name: 'department',
                message: 'What is the name of your new department?'
            }
        ]).then(res => {
            let name = res.deparment;
            const query = connection.query(
                'INSERT INTO department (name) VALUES (?)',
                (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Department Added!')
                        frontPrompts();
                    };
                }
            )
        })
};

async function addRole() {
    let deparment =  await connection.promise().query('SELECT * FROM department');
    console.log(deparment[0]);
    let deparmentChoices = department[0].map(({ id, name}) => ({
        name: `${name}`,
        value: id
    }));
    inquirer
        .prompt([
            {
                name: 'title',
                message: 'What is the title of the new role?'
            },
            {
                name: 'salary',
                message: 'What is the salary for the new role?'
            },
            {
                type: 'list',
                name: 'department',
                message: 'What department does this role belong to?',
                choices: deparmentChoices
            }
        ]).then(res => {
            let title = res.title;
            let salary = res.salary;
            let department = res.department;
            const query = connection.query(
                'INSERT INTO role (title, salary, department) VALUES (?, ?, ?)',
                (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Role added!');
                        frontPrompts();
                    };
                }
            )
        })
};

async function addEmployee() {
    const mang = await connection.promise().query('SELECT id, first_name, last_name FROM employee WHERE employee.is_manager = 1')
    const mangChoices = mang[0].map(({ id, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));
    const role = await connection.promise().query('SELECT id, title FROM role')
    const roleChoices = role[0].map(({ id, title}) => ({
        name: `${title}`,
        value: id
    }));
    inquirer
        .prompt([
            {
                name: 'firstName',
                message: 'What is the first name of the new employee?'
            },
            {
                name: 'lastName',
                message: 'What is the last name of the new employee?'
            },
            {
                type: 'list',
                name: 'role',
                message: 'What will be this employees role?',
                choices: roleChoices
            },
            {
                type: 'list',
                name: 'managerId',
                message: 'Whos is this employees manager?',
                choices: mangChoices
            }
        ]).then(res => {
            let first_name = res.firstName;
            let last_name = res.lastName;
            let role_id = res.role;
            let mananger_id = res.managerId;
            const query = connection.query(
                'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
                (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Employee added!');
                        frontPrompts();
                    };
                }
            )
        })
};

async function updateEmployee() {
    const employees = await connection.promise().query('SELECT id, first_name, last_name FROM employee');
    const employeeChoices = employee[0].map(({ id, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));
    const roles =  await connection.promise().query('SELECT * FROM role');
    const roleChoices = roles[0].map(({ id, title}) => ({
        name: title,
        value: id
    }));
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Which employee do you wish to update?',
                choices: employeeChoices
            },
            {
                type: 'list',
                name: 'roleId',
                message: 'What is the new role of the employee?',
                choices: roleChoices
            }
        ]).then(res => {
            let id = res.employeeId;
            let role_id = res.roleId;
            const query = connection.query(
                'UPDATE emplyee SET role_id = (?) where id = (?)',
                (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Employee Updated!');
                        frontPrompts();
                    };
                }
            )
        })
};