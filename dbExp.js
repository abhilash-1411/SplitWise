const { Pool } = require('pg');

const poolExpenses = new Pool({
    user: "postgres",
    host: "localhost",
    database: 'expenses',
    password: '1234',
    port: 5433,
});

module.exports = poolExpenses;