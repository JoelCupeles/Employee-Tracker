require('dotenv').config();
const mysql = require('mysql2/promise');


const connectionConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  };

  class Queries {
    constructor() {
      this.connection = null;
    }
  
    async connect() {
      this.connection = await mysql.createConnection(connectionConfig);
    }
  
    async end() {
      if (this.connection) {
        await this.connection.end();
      }
    }
  
    async viewAllDepartments() {
        const [rows] = await this.connection.query('SELECT * FROM department');
        return rows;
      }
      async viewAllRoles() {
        const query = `
          SELECT role.id, role.title, role.salary, department.name AS department
          FROM role
          INNER JOIN department ON role.department_id = department.id
        `;
        const [rows] = await this.connection.query(query);
        return rows;
      }
    
      async viewAllEmployees() {
        const query = `
          SELECT
            e.id, e.first_name, e.last_name,
            role.title AS role, department.name AS department, role.salary,
            CONCAT(m.first_name, ' ', m.last_name) AS manager
          FROM employee e
          INNER JOIN role ON e.role_id = role.id
          INNER JOIN department ON role.department_id = department.id
          LEFT JOIN employee m ON e.manager_id = m.id
        `;
        const [rows] = await this.connection.query(query);
        return rows;
      }
    
      // more functions forupdating departments, roles, and employees
    }
    
    module.exports = Queries;