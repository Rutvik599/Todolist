const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "login",
});
conn.connect((err) => {
      /*const query = `CREATE TABLE task (id INT AUTO_INCREMENT PRIMARY KEY, task VARCHAR(50))`;
      conn.query(query, (er) => {
        if (!er) {
          console.log("Table is created");
        } else {
          console.log(er);
        }
      });
    } */
    if(!err){
        console.log("server is connected..");
    }
    else {
        console.log(err.message);
    }
  });
  
app.use(cors());
app.get('/',(req,res)=>{
    console.log("Server side is Correct...!");
});
app.post('/select',(req,res)=>{
    const query = `SELECT task from task`;
    conn.query(query,(err,result)=>{
        if(!err){
            res.json({result1:result,statusmessage:true});
        }
        else{
            console.log(err);
            res.json({statusmessage:false});
        }
    })
})
app.post('/add',(req,res)=>{
    const  data = Object.values(req.body);
    const query = `INSERT INTO task(task) VALUES(?)`
    conn.query(query,[data[0]],(err)=>{
        if(!err){
            console.log("data added to database")
            res.json({statusmessage:true});
        }
        else{
            console.log(err);
            res.json({statusmessage:false});
        }
    })
})
app.post('/delete',(req,res)=>{
    const  data = Object.values(req.body);
    const query = `DELETE FROM task WHERE task = ?`
    conn.query(query,[data[0]],(err)=>{
        if(!err){
            res.json({statusmessage:true});
        }
        else{
            console.log(err);
            res.json({statusmessage:false});
        }
    })
});
app.listen(8081, (err) => {
  if (!err) console.log("Server is Listening on http://localhost:8081");
});
