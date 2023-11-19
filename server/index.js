const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const { randomUUID } = require('crypto');
const bcrypt = require('bcryptjs');


const PORT = 4000
const app = express();

app.use(logger);
app.use(bodyParser.json());

require('dotenv').config({path: "../.env"});

const cors = require("cors");
app.use(cors());

const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    idleTimeout: 60000,
    queueLimit: 0
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

function logger(req, res, next){
    console.log(`[${Date.now()}] ${req.method} ${req.url}`)
    next();
}

function executeQuery(query) {
    return new Promise((resolve, reject) => {
        pool.query(query, (err, result) => {
            if (err) {
                reject({ success: false, error: err });
            } else {
                resolve({ success: true, data: result });
            }
        });
    });
}
async function handleServerError(res) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
}

async function handleNotFound(res) {
    res.status(404).json({ success: false, error: 'Not found' });
}

async function handleBadRequest(res) {
    res.status(400).json({ success: false, error: 'Bad Request' });
}

async function handleUnauthorized(res) {
    res.status(401).json({ success: false, error: 'Unauthorized' });
}

async function handleNormalLogin(password, user, res, results) {
    const passwordMatch = await bcrypt.compare(password, user.Password);
    
    if (passwordMatch) {
        res.json(results);
    } else {
        handleUnauthorized(res);
    }
}

app.post('/api/studentExists', async (req, res) => {
    const query = `SELECT email, first_name, password FROM student WHERE email = '${req.body.email}' LIMIT 1;`;
    try {
        const resultsJSON = await executeQuery(query);
        if (resultsJSON["success"] == false) {
            handleServerError(res);
            return;
        }

        const results = resultsJSON["data"];
        const user = results[0];

        if (results.length < 1) {
            handleNotFound(res);
            return;
        }

        if (req.body.loginMethod == "Normal") {
            handleNormalLogin(req.body.password, user, res, results);
        } else if (req.body.loginMethod == "NextAuth") {
            res.json(results);
        } else {
            handleBadRequest(res);
        }

    } catch (error) {
        console.error('Error in /api/studentExists endpoint:', error);
        handleServerError(res);
    }
});


app.post('/api/create-new-student', async (req,res)=>{
    // SRN, First name, Last name, Email, Password, Section, Semester
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const query = `INSERT INTO student VALUES('${req.body.srn}', '${req.body.first}', '${req.body.last}', '${req.body.email}', '${hashedPassword}', '${req.body.section}', ${req.body.semester});`;

    try {
        const results = await executeQuery(query);
        res.json(results);
    } catch (error) {
        console.error("Error in /api/create-new-student endpoint:", error);
        handleServerError(res);
    }
});

app.post('/api/create-new-teacher', async (req,res)=>{
    // tid, First name, Last name, Email, Password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const query = `INSERT INTO teacher VALUES('${req.body.tid}', '${req.body.fname}', '${req.body.lname}', '${req.body.email}', '${hashedPassword}');`;
    
    try {
        const results = await executeQuery(query);
        res.json(results);
    } catch (error) {
        console.error("Error in /api/create-new-teacher endpoint:", error);
        handleServerError(res);
    }
});

app.post('/api/create-new-task', async (req,res)=>{
    // taskId, problemStatement, sampleInputOutput, marks
    const assignmentIDQuery = `SELECT assignment_id AS assignId FROM assignment WHERE name = '${req.body.assignmentName}' LIMIT 1;`;

    
    try {
        const IDresults = await executeQuery(assignmentIDQuery);

        if(IDresults["success"] == false){
            handleServerError(res);
            return;
        }
        
        if(IDresults["data"].length < 1){
            handleNotFound(res);
            return;
        }

        const ID = IDresults["data"][0]["assignId"];
        const query = `INSERT INTO task VALUES('${req.body.taskID}', '${ID}', '${JSON.stringify(req.body.problemStatement)}', '${JSON.stringify(req.body.sampleInputOutput)}', ${req.body.marks});`;
        
        const results = await executeQuery(query);
        res.json(results);
    } catch (error) {
        console.error("Error in /api/create-new-task endpoint:", error);
        handleServerError(res);
    }
});

// app.post('/api/create-new-testcase', async (req,res)=>{
//     const query = `INSERT INTO testcase VALUES(${req.body.testcaseId}, ${req.body.taskId}, '${req.body.input}', '${req.body.output}', '${req.body.explanation}', ${req.body.hidden});`;

//     try {
//         const results = await executeQuery(query);
//         res.json(results);
//     } catch (error) {
//         console.error("Error in /api/create-new-testcase endpoint:", error);
//         handleServerError(res);
//     }
// });

app.post('/api/create-new-classroom', async (req,res)=>{
    const query = `INSERT INTO classroom(section, name, semester, subject, teacher_id) VALUES('${req.body.section}', '${req.body.name}', ${req.body.semester}, '${req.body.subject}', '${req.body.teacherId}');`;

    try {
        const results = await executeQuery(query);
        res.json(results);
    } catch (error) {
        console.error("Error in /api/create-new-classroom endpoint:", error);
        handleServerError(res);
    }
});


app.post('/api/create-new-assignment', async (req,res)=>{
    const query = `INSERT INTO assignment (name, deadline, teacher_id, classroom_id) VALUES('${req.body.assignmentName}', '${req.body.deadline}', '${req.body.teacherID}', ${req.body.classroomID});`;

    try {
        const results = await executeQuery(query);
        res.json(results);
    } catch (error) {
        console.error("Error in /api/create-new-assignment endpoint:", error);
        handleServerError(res);
    }
});


app.post('/api/create-new-submission', async (req,res)=>{
    const query = `INSERT INTO submission(submission_date, content, plagiarism_report, marks, task_id, srn) VALUES ('${req.body.submissionDate}', '${req.body.content}', ${req.body.plagiarismReport}, ${req.body.marks}, ${req.body.taskID}, '${req.body.srn}');`;

    try {
        const results = await executeQuery(query);
        res.json(results);
    } catch (error) {
        console.error("Error in /api/create-new-submission endpoint:", error);
        handleServerError(res);
    }
});

app.post('/api/student-join-classroom', async (req,res)=>{

    const SRNQuery = `SELECT get_SRN_from_email('${req.body.email}') AS SRN;`; 

    try {

        const SRNResults = await executeQuery(SRNQuery);
        if(SRNResults["success"] == false){
            handleServerError(res);
            return;
        }
        
        if(SRNResults["data"].length < 1){
            handleNotFound(res);
            return;
        }

        var SRN = SRNResults["data"][0]["SRN"];
        const query = `INSERT INTO student_in_classroom VALUES ('${SRN}', '${req.body.classroomID}');`;
        
        const results = await executeQuery(query);
        res.json(results);
    } catch (error) {
        console.error("Error in /api/student-join-classroom endpoint:", error);
        handleServerError(res);
    }
});

app.post('/api/get-classrooms-for-student', async (req,res)=>{

    const SRNQuery = `SELECT get_SRN_from_email('${req.body.email}') AS SRN;`;  
    try {
        
        const SRNResults = await executeQuery(SRNQuery);
        if(SRNResults["success"] == false){
            handleServerError(res);
            return;
        }
        
        if(SRNResults["data"].length < 1){
            handleNotFound(res);
            return;
        }

        var SRN = SRNResults["data"][0]["SRN"];
        const query = `SELECT classroom_id AS classroomId, section, name, semester, subject, CONCAT(t.first_name, ' ', t.last_name) AS teacher FROM classroom c JOIN student_in_classroom sic on c.classroom_id = sic.ClassroomID JOIN teacher t ON t.teacher_id = c.teacher_id where sic.srn = '${SRN}';`;

        const results = await executeQuery(query);
        res.json(results);
    } catch (error) {
        console.error("Error in /api/create-new-submission endpoint:", error);
        handleServerError(res);
    }
});

app.post('/api/get-classrooms-for-teacher', async (req,res)=>{

    const query = `SELECT classroom_id AS classroomId, code, section, name, semester, subject FROM classroom WHERE teacher_id='${req.body.teacherId}';`; 
    //SELECT classroom_id AS classroomId, code, section, name, semester, subject FROM classroom WHERE teacher_id="PESUT001";
    
    try {
        
        // const IDResults = await executeQuery(SRNQuery);
        // if(SRNResults["success"] == false){
        //     handleServerError(res);
        //     return;
        // }
        
        // if(SRNResults["data"].length < 1){
        //     handleNotFound(res);
        //     return;
        // }

        // var SRN = SRNResults["data"][0]["SRN"];
        // const query = `SELECT classroom_id AS classroomId, section, name, semester, subject, CONCAT(t.first_name, ' ', t.last_name) AS teacher FROM classroom c JOIN student_in_classroom sic on c.classroom_id = sic.ClassroomID JOIN teacher t ON t.teacher_id = c.teacher_id where sic.srn = '${SRN}';`;

        const results = await executeQuery(query);
        res.json(results);
    } catch (error) {
        console.error("Error in /api/create-new-submission endpoint:", error);
        handleServerError(res);
    }
});

app.get('/api/get-srn', async (req,res)=>{
    const query = `SELECT get_SRN_from_email('${req.body.email}') AS SRN;`;

    try {
        const results = await executeQuery(query);
        res.json(results);
    } catch (error) {
        console.error("Error in /api/get-srn endpoint:", error);
        handleServerError(res);
    }
});

app.get('/api/get-assignments-for-classroom', async (req,res)=>{
    const query = `SELECT DISTINCT name, deadline, teacher_id FROM assignment WHERE classroom_id = ${req.body.classroomId};`;

    try {
        const results = await executeQuery(query);
        res.json(results);
    } catch (error) {
        console.error("Error in /api/get-srn endpoint:", error);
        handleServerError(res);
    }
});

app.post('/api/get-assignments-for-classroom', async (req,res)=>{
    const query = `SELECT name, deadline, teacher_id FROM assignment WHERE classroom_id = ${req.body.classId};`;

    try {
        const results = await executeQuery(query);
        res.json(results);
    } catch (error) {
        console.error("Error in /api/get-assignments-for-classroom endpoint:", error);
        handleServerError(res);
    }
});

app.post('/api/get-tasks-for-assignment', async (req,res)=>{
    const query = `SELECT questions, solutions, task_marks FROM task WHERE assignment_id = ${req.body.assignmentId};`;

    try {
        const results = await executeQuery(query);
        res.json(results);
    } catch (error) {
        console.error("Error in /api/get-tasks-for-assignment endpoint:", error);
        handleServerError(res);
    }
});

app.post('/api/check-class-code', async (req,res)=>{
    const query = `SELECT * FROM classroom WHERE code = '${req.body.classroomCode}' LIMIT 1;`;

    try {
        const results = await executeQuery(query);
        res.json(results);
    } catch (error) {
        console.error("Error in /api/check-class-code endpoint:", error);
        handleServerError(res);
    }
});

app.post('/api/get-task', async (req,res)=>{
    const query = `SELECT * FROM task WHERE task_id = '${req.body.taskID}' LIMIT 1;`;

    try {
        const results = await executeQuery(query);
        res.json(results);
    } catch (error) {
        console.error("Error in /api/get-task endpoint:", error);
        handleServerError(res);
    }
});

app.listen(PORT, ()=>{
    console.log(`SendIt Server started on port: ${PORT}`);
})