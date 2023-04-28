const inquirer = require('inquirer');
const Queries = require('./queries');

const queries = new Queries();
queries.connect();

async function mainMenu() {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit'
        ]
      }
    ]);
  
    switch (action) {
      case 'View all departments':
      
        case 'View all departments':
        const departments = await queries.viewAllDepartments();
        console.table(departments);

        break;

        // Add these cases in the switch statement in src/app.js
        case 'View all roles':
        const roles = await queries.viewAllRoles();
        console.table(roles);
        break;
  
        case 'View all employees':
        const employees = await queries.viewAllEmployees();
        console.table(employees);
        break;
  
  
      case 'Exit':
        console.log('Goodbye!');
        await queries.end();
        process.exit(0);
    }
  
   
    mainMenu();
  }
  
  
  mainMenu();