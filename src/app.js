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
        const departments = await queries.viewAllDepartments();
        console.table(departments);
        break;

        case 'View all roles':
        const roles = await queries.viewAllRoles();
        console.table(roles);
        break;
  
        case 'View all employees':
        const employees = await queries.viewAllEmployees();
        console.table(employees);
        break;

        case 'Add a department':
            const { departmentName } = await inquirer.prompt([
              {
                type: 'input',
                name: 'departmentName',
                message: 'Enter the department name:',
              },
            ]);
            await queries.addDepartment(departmentName);
            console.log('Department added successfully.');
            break;
            case 'Add a role':
                const departmentsList = await queries.viewAllDepartments();
                const departmentChoices = departmentsList.map((dept) => ({
                  name: dept.name,
                  value: dept.id,
                }));
          
                const { roleTitle, roleSalary, departmentId } = await inquirer.prompt([
                  {
                    type: 'input',
                    name: 'roleTitle',
                    message: 'Enter the role title:',
                  },
                  {
                    type: 'input',
                    name: 'roleSalary',
                    message: 'Enter the role salary:',
                  },
                  {
                    type: 'list',
                    name: 'departmentId',
                    message: 'Select the department for this role:',
                    choices: departmentChoices,
                  },
                ]);
          
                await queries.addRole(roleTitle, roleSalary, departmentId);
                console.log('Role added successfully.');
                break;
          
              case 'Add an employee':
                const rolesList = await queries.viewAllRoles();
                const roleChoices = rolesList.map((role) => ({
                  name: role.title,
                  value: role.id,
                }));
          
                const employeesList = await queries.viewAllEmployees();
                const managerChoices = employeesList.map((employee) => ({
                  name: `${employee.first_name} ${employee.last_name}`,
                  value: employee.id,
                }));
                managerChoices.push({ name: 'None', value: null });
          
                const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
                  {
                    type: 'input',
                    name: 'firstName',
                    message: "Enter the employee's first name:",
                  },
                  {
                    type: 'input',
                    name: 'lastName',
                    message: "Enter the employee's last name:",
                  },
                  {
                    type: 'list',
                    name: 'roleId',
                    message: "Select the employee's role:",
                    choices: roleChoices,
                  },
                  {
                    type: 'list',
                    name: 'managerId',
                    message: "Select the employee's manager:",
                    choices: managerChoices,
                  },
                ]);
          
                await queries.addEmployee(firstName, lastName, roleId, managerId);
                console.log('Employee added successfully.');
                break;
  
  
                case 'Update an employee role':
              
                    break;
              
                  case 'Exit':
                    console.log('Goodbye!');
                    process.exit(0);
                    break;
              
                  default:
                    console.log('Invalid action.');
                }
              
                
                mainMenu();
              };
              
              
              mainMenu();