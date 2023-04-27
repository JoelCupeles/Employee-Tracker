const inquirer = require('inquirer');
const Queries = require('./queries');

const queries = new Queries();
queries.connect();