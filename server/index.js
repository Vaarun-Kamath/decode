const express = require('express');
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Nepture@MNS123',
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


app.get('/test',(req,res)=>{
    pool.query('select * from submission as s join assignment as t where s.task_id = t.task_id', (err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        console.log(result);
    })
    res.json({status: true})
});

app.post('/newuser',(req,res)=>{
    
});



app.listen(PORT, ()=>{
    console.log(`SendIt Server started on port: ${PORT}`);
})