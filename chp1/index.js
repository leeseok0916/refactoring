const { plays, invoices } = require('./data');
const { statement } = require('./statement');

console.log(statement(invoices[0], plays));