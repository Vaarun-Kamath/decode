const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'DBMS',
    password: 'Kabir@123',
    database: 'sendit',
    connectionLimit: 10
})

const PORT = 4000

const app = express();

function logger(req, res, next){
    console.log(`[${Date.now()}] ${req.method} ${req.url}`)
    next();
}

app.use(logger);
app.use(bodyParser.json());

app.get('/test',(req,res)=>{
    pool.query('select * from submission as s join assignment as t where s.task_id = t.task_id', (err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        console.log(result);
    })
    res.json({status: true})
});

app.post('/api/create-new-student',(req,res)=>{
    // SRN, First name, Last name, Email, Password, Section, Semester
    pool.query(
    `insert into student values('${req.body.srn}', '${req.body.fname}', '${req.body.lname}', '${req.body.email}', '${req.body.password}', '${req.body.section}', '${req.body.semester}');`, 
        (err, result, fields)=>{
            if(err){
                res.json({status: 'error', message: err});
                console.log(err);
                return console.log("Error inserting student")
            }
            res.json({status: `Created New User ${req.body.srn}`})
            // console.log(result);
        }
    )
});



app.listen(PORT, ()=>{
    console.log(`SendIt Server started on port: ${PORT}`);
})