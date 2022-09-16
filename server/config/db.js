const mysql = require('mysql')

const db = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password: 'kevin0459',
    database : 'test'
});

module.exports = db;