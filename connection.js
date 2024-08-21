let mysql = require("mysql");
let connect = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"mgns2926",
    database:"studentData"

});
module.exports = connect;