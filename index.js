// let con = require('./connection');
// let express = require("express");
// let app = express();
// let path = require("path");
// let bodyParser = require("body-parser");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}))
// app.use(express.static(__dirname));

// con.connect(function(error) {
//     if (error) throw error;
//     console.log("Connected to the database.");
// });

// app.set('view engine','ejs');


// app.get("/register", function(req, res) {
//     res.sendFile(path.join(__dirname, "index.html"));
//     console.log("Started");
// });
// app.post("/register",function(req,res){
//  let name = req.body.name;
//  let email = req.body.email;
//  let contact = req.body.contact;
//  //con.connect(function(error){                  shows enqueue error 
//  //   if (error) throw error

//     let sql = "INSERT INTO details (name, email, contact) VALUES (?, ?, ?)";
//         con.query(sql, [name, email, contact], function (error, result) {
//             if (error) throw error;
//             // res.send('Student successfully registered');
//             res.redirect('/student');
//     })
//  })
// //})

// app.get('/student',function(req,res){
   

//         let sql = 'select * from details';
//         con.query(sql,function(error,result){
//             if (error) throw error

//             res.render(__dirname+"/student",{student:result});


//         })
//     })

// app.get('/delete-student',function(req,res){
//     let sql = "delete from details where id=?"
//     let id = req.query.id;
//     con.query(sql,[id],function(error,result){
//         if (error) throw error

//         res.redirect('/student');


//     })
    
// })


// app.get('/update-student',function(req,res){
//     let sql = "select * from details where id=?"
//     let id = req.query.id;
//     con.query(sql,[id],function(error,result){
//         if (error) throw error
//         res.render(__dirname+ "/update-student",{student:result})
        


//     })
    
// })

// app.post("/update-student",function(req,res){
//     let name = req.body.name;
//     let email = req.body.email;
//     let contact = req.body.contact;
//     let id = req.body.id;
//     //con.connect(function(error){                  shows enqueue error 
//     //   if (error) throw error
   
//        let sql = "UPDATE details set name=?,email=?,contact=? where id = ?";
//            con.query(sql, [name, email, contact,id], function (error, result) {
//                if (error) throw error;
//                // res.send('Student successfully registered');
//                res.redirect('/student');
//        })
//     })


let con = require('./connection');
let express = require("express");
let app = express();
let path = require("path");
let bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname));

con.connect(function(error) {
    if (error) throw error;
    console.log("Connected to the database.");
});

app.set('view engine','ejs');

app.get("/register", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
    console.log("Started");
});

app.post("/register",function(req,res){
    let name = req.body.name;
    let email = req.body.email;
    let contact = req.body.contact;

    let sql = "INSERT INTO details (name, email, contact) VALUES (?, ?, ?)";
    con.query(sql, [name, email, contact], function (error, result) {
        if (error) throw error;
        res.redirect('/student');
    });
});

app.get('/student',function(req,res){
    let sql = 'SELECT * FROM details';
    con.query(sql, function(error, result){
        if (error) throw error;
        res.render(__dirname + "/student", {student: result});
    });
});

app.get('/delete-student', function(req,res){
    let sql = "DELETE FROM details WHERE id=?";
    let id = req.query.id;
    con.query(sql, [id], function(error, result){
        if (error) throw error;
        res.redirect('/student');
    });
});

app.get('/update-student', function(req, res){
    let sql = "SELECT * FROM details WHERE id=?";
    let id = req.query.id;
    con.query(sql, [id], function(error, result){
        if (error) throw error;
        res.render(__dirname + "/update-student", {student: result});
    });
});

app.post("/update-student", function(req, res){
    let name = req.body.name;
    let email = req.body.email;
    let contact = req.body.contact;
    let id = req.body.id;

    let sql = "UPDATE details SET name=?, email=?, contact=? WHERE id = ?";
    con.query(sql, [name, email, contact, id], function (error, result) {
        if (error) throw error;
        res.redirect('/student');
    });
});

app.get('/search-student', function(req, res){
    let sql = "SELECT * FROM details";
    con.query(sql, function(error, result){
        if (error) throw error;
        res.render(__dirname + "/search-student", {student: result});
    });
});

app.get('/search', function(req, res){
    let name = req.query.name || '';
    let email = req.query.email || '';
    let contact = req.query.contact || '';

    let sql = "SELECT * FROM details WHERE name LIKE ? AND email LIKE ? AND contact LIKE ?";
    let values = [`%${name}%`, `%${email}%`, `%${contact}%`];

    con.query(sql, values, function(error, result){
        if (error) throw error;
        res.render(__dirname + "/search-student", {student: result});
    });
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});



//  app.get('/search-student',function(req,res){
//     let sql = "select * from details"
    
//     con.query(sql,function(error,result){
//         if (error) throw error
//         res.render(__dirname+ "/search-student",{student:result})
        
//     })

//  })

//  app.get('/search', function(req, res) {
//     let name = req.query.name || '';
//     let email = req.query.email || '';
//     let contact = req.query.contact || '';

//     let sql = "SELECT * FROM details WHERE name LIKE ? AND email LIKE ? AND contact LIKE ?";
//     let values = [`%${name}%`, `%${email}%`, `%${contact}%`];

//     con.query(sql, values, function(error, result) {
//         if (error) throw error;
//         res.render(__dirname + "/search-student", { student: result });
//     });
// });

// app.listen(7000, function() {
//     console.log("Server is running on port 7000");
// });