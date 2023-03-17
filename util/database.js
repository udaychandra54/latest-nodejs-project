const mysql = require('mysql2');

const pool = mysql.createPool({
    host:"localhost",
    user:'root',
    database:'node-complete',
    password:'Uday@1996'
})

module.exports=pool.promise()