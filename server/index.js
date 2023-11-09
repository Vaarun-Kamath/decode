const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

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



//! ############################################ ID GENERATION FORMULA ########################################

//! You may like the way that we do it. I wanted a reversible unique code that looked "random" -a fairly common problem.
//! We take an input number such as 1,942.

//! Left pad it into a string: "0000001942"
//! Put the last two digits onto the front: "4200000019"
//! Convert that into a number: 4,200,000,019

//! We now have a number that varies wildly between calls and is guaranteed to be less than 10,000,000,000. Not a bad start.
//! Convert that number to a Base 34 string: "2oevc0b"
//! Replace any zeros with 'y' and any ones with 'z': "2oevcyb"
//! Upshift: "2OEVCYB"

//! ############################################ ID GENERATION FORMULA ########################################


app.post('/api/create-new-student',(req,res)=>{
    // SRN, First name, Last name, Email, Password, Section, Semester
    pool.query(
    `insert into student values('${req.body.srn}', '${req.body.fname}', '${req.body.lname}', '${req.body.email}', '${req.body.password}', '${req.body.section}', ${req.body.semester});`, 
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

app.post('/api/create-new-teacher',(req,res)=>{
    // tid, First name, Last name, Email, Password
    pool.query(
    `insert into teacher values('${req.body.tid}', '${req.body.fname}', '${req.body.lname}', '${req.body.email}', '${req.body.password}');`, 
        (err, result, fields)=>{
            if(err){
                res.json({status: 'error', message: err});
                console.log(err);
                return console.log("Error inserting teacher")
            }
            res.json({status: `Created New Teacher ${req.body.tid}`})
            // console.log(result);
        }
    )
});

// problemStatement = {
//      "title": "Two Sum",
//      "description": `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
//                      You may assume that each input would have exactly one solution, and you may not use the same element twice.
//                      You can return the answer in any order.`,
//      "constraints": [
//          "2 <= nums.length <= 10^4",
//          "-10^9 <= nums[i] <= 10^9",
//          "-10^9 <= target <= 10^9",
//      ]
// }

// sampleInputOutput = {
//         testcase:[
//              {
//                  Input: "nums = [2,7,11,15], target = 9",
//                  Output: "[0,1]",
//                  Explaination: "Because nums[0] + nums[1] == 9, we return [0, 1]."
//              },
//              {
//                  Input: "nums = [3,2,4], target = 6",
//                  Output: "[1,2]",
//                  Explaination: "None"
//              },
//              {
//                  Input: "nums = [2,7,11,15], target = 9",
//                  Output: "[0,1]",
//                  Explaination: "None"
//              },
//         ]
// }

app.post('/api/create-new-task',(req,res)=>{
    // taskId, problemStatement, sampleInputOutput, marks
    pool.query(
    `insert into task values('${req.body.taskID}', '${JSON.stringify(req.body.problemStatement)}', '${JSON.stringify(req.body.sampleInputOutput)}', ${req.body.marks});`, 
        (err, result, fields)=>{
            if(err){
                res.json({status: 'error', message: err});
                console.log(err);
                return console.log("Error inserting task")
            }
            res.json({status: `Created New Task ${req.body.taskID}`})
            // console.log(result);
        }
    )
});


app.post('/api/create-new-classroom',(req,res)=>{
    // classroomID, section, name, semester, subject, teacherId
    pool.query(
    `insert into classroom values(${req.body.classroomID}, '${req.body.section}', '${req.body.name}', ${req.body.semester}, '${req.body.subject}', '${req.body.teacherId}');`, 
        (err, result, fields)=>{
            if(err){
                res.json({status: 'error', message: err});
                console.log(err);
                return console.log("Error inserting classroom")
            }
            res.json({status: `Created New Classroom ${req.body.classroomID}`})
            // console.log(result);
        }
    )
});


app.post('/api/create-new-assignment',(req,res)=>{
    // assignmentID, deadline, taskId, teacherID, classroomID
    pool.query(
    `insert into assignment values(${req.body.assignmentID}, '${req.body.deadline}', ${req.body.taskId}, '${req.body.teacherID}', ${req.body.classroomID});`, 
        (err, result, fields)=>{
            if(err){
                res.json({status: 'error', message: err});
                console.log(err);
                return console.log("Error inserting assignment")
            }
            res.json({status: `Created New Assignment ${req.body.assignmentID}`})
            // console.log(result);
        }
    )
});


app.post('/api/create-new-submission',(req,res)=>{
    // submissionID, submissionDate, content, plagiarismReport, marks, taskID, srn
    pool.query(
    `insert into submission values(${req.body.submissionID}, '${req.body.submissionDate}', '${req.body.content}', ${req.body.plagiarismReport}, ${req.body.marks}, ${req.body.taskID}, '${req.body.srn}');`, 
        (err, result, fields)=>{
            if(err){
                res.json({status: 'error', message: err});
                console.log(err);
                return console.log("Error inserting submission")
            }
            res.json({status: `Created New Submission ${req.body.submissionID}`})
            // console.log(result);
        }
    )
});

app.post('/api/get-student',(req,res)=>{
    // studentId, 
    pool.query(
    `insert into submission values(${req.body.submissionID}, '${req.body.submissionDate}', '${req.body.content}', ${req.body.plagiarismReport}, ${req.body.marks}, ${req.body.taskID}, '${req.body.srn}');`, 
        (err, result, fields)=>{
            if(err){
                res.json({status: 'error', message: err});
                console.log(err);
                return console.log("Error inserting submission")
            }
            res.json({status: `Created New Submission ${req.body.submissionID}`})
            // console.log(result);
        }
    )
});



app.listen(PORT, ()=>{
    console.log(`SendIt Server started on port: ${PORT}`);
})