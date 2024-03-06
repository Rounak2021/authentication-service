const Pool = require("pg").Pool

const item_store = new Pool({
    "user": "postgres",
    "host": "localhost",
    "database": "storeitems_mst",
    "password": "P@ssw0rd",
    "port": "5433"
})



module.exports = item_store