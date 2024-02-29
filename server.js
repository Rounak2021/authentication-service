const express = require("express")
const app = express();
var cors = require('cors')
const port = process.env.PORT || 3000;

const pool = require("./database.js");
const router = require("./Routes/Routes.js");
// const pathToSwaggerUi = require('swagger-ui-dist').absolutePath()
// const SwaggerUI = require('swagger-ui')


app.use(express.json());
app.use("/user", router);  //Route for /user endpoint of API
app.use(cors());


pool.connect((err) => { //Connected Database

    if (err) {
        console.log(err);
    }
    else {
        console.log("Data logging initiated!");
    }

});






app.listen(port, () => {
    console.log(`Express just needs to take off. Server running in port ${port}`);
})
