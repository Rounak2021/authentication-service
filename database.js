const Pool = require("pg").Pool

const pool = new Pool({
    "user": "postgres",
    "host": "localhost",
    "database": "authentication_mst",
    "password": "P@ssw0rd",
    "port": "5432"
})



module.exports = pool