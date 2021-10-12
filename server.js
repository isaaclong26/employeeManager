const mysql = require('mysql2');

const table = require("console.table")
const inquirer = require("inquirer")
const db = mysql.createConnection({
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'roottoor',
        database: 'testdb'
    },
    console.log(`Connected to the testdb database.`)
);



const mainMenu = () => {
    inquirer
        .prompt([{
            name: "Menu",
            message: "What would you like to do? ",
            type: "list",
            choices: [
                "Veiw all departments",
                "Veiw all roles",
                "Veiw all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update employee role",
                "Quit"
            ]
        }])
        .then((answers) => {

            switch (answers.Menu) {
                case "Veiw all departments":
                    console.log("got to the switch");
                    veiwDepart();
                    break;
                case "Veiw all roles":
                    veiwRoles();
                    break;
                case "Veiw all employees":
                    veiwEmployees();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Update employee role":
                    updateRole();
                    break;
                case "Quit":
                    process.exit();
                    break;
            }

        })


}

const veiwEmployees = () => {
    let joinQ = ` SELECT employees.id , employees.first_name, employees.last_name, roles.title, roles.salary,  employees.manager_id
                From  employees, roles, departments 
                WHERE roles.id = employees.role_id AND departments.id = roles.department_id`

    db.query(joinQ, function (err, results) {
        console.table(results);
        return results;
        mainMenu();
    });
}

const veiwRoles = () => {
    //WORKING
    db.query("select * from roles", function (err, results) {
        console.table(results)
        mainMenu();
    })
}

const veiwDepart = () => {
    //WORKING
    db.query("select * from departments", function (err, results) {
        console.table(results)
        mainMenu();
    })
}

const addEmployee = (first, last, managerId, roleId) => {
    
    let sqlQ = `INSERT INTO employees (first_name, last_name, manager_id, role_id)
                VALUES("${first}", "${last}", ${managerId}, ${roleId});`

    db.query(sqlQ, function (err, results) {
        if (err) throw err;
        console.log("1 record inserted");
        mainMenu();
    })

}

const addRole = (id, title, salary, department_id) => {
    // WORKING
    let sqlQ = `INSERT INTO roles(id,title, salary, department_id)
                VALUES(${id},"${title}", ${salary}, ${department_id});`

    db.query(sqlQ, function (err, results) {
        if (err) throw err;
        console.log("1 record inserted");
        mainMenu();
    })

}

const addDepartment = (title) => {

    let sqlQ = `INSERT INTO departments(title)
                VALUES("${title}");`

    db.query(sqlQ, function (err, results) {
        if (err) throw err;
        console.log("1 record inserted");
        mainMenu();
    })

}

const updateRole = () => {
    // WORKING!
    let sqlQ = ` SELECT * FROM employees`;
    let employees = [];
    let employeeIds = []
    db.query(sqlQ, function (err, results) {
        if (err) throw err;
        for (i in results) {
            let employee = {
                name: `${results[i].first_name} ${results[i].last_name}`,
                value: results[i].id
            }
            employees.push(employee)
        }
        inquirer
            .prompt([{
                name: "employee",
                message: "Select employee to change role:",
                type: "list",
                choices: employees
            }])
            .then((answers) => {
                console.log(answers)
                let employeeId = answers.employee;
                console.log(employeeId)
                db.query(`SELECT * FROM roles`, function (err, results) {
                    if (err) throw err;
                    let roles = []
                    for (i in results) {
                        let role = {
                            name: `${results[i].title}`,
                            value: `${results[i].id}`
                        }
                        roles.push(role)

                    }
                    inquirer
                        .prompt([{
                            name: "role",
                            message: "Select new role",
                            type: "list",
                            choices: roles
                        }])
                        .then((answers) => {
                            db.query(`UPDATE employees SET role_id= ${answers.role} WHERE id = ${employeeId}`, function (err, results) {
                                if (err) throw err;
                                console.log("Updated Employee Role");
                                mainMenu();
                            })
                        })
                })
            });


    })




}


mainMenu();