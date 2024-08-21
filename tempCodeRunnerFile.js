let con = require('./connection');
let express = require("express");
let app = express();
let path = require("path");

let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(__dirname));


app.get("/register", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
    console.log("Started");
});

app.post("/register",function(req,res){
 let name = req.body.name;
 let email = req.body.email;
 let contact = req.body.contact;
 con.connect(function(error){
    if (error) throw error

    let sql = "INSERT INTO details (name, email, contact) VALUES (?, ?, ?)";
        con.query(sql, [name, email, contact], function (error, result) {
            if (error) throw error;
            res.send('Student successfully registered');
    })
 })
})
app.listen(7000, function() {
    console.log("Server is running on port 7000");
});