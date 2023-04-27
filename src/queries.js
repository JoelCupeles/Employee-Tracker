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
  }
  
  module.exports = Queries;