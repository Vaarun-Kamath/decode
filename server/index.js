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
    const query = `SELECT Email, FirstName, Password FROM student WHERE Email = '${req.body.email}' LIMIT 1;`;

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
    const query = `INSERT INTO task VALUES('${req.body.taskID}', '${JSON.stringify(req.body.problemStatement)}', '${JSON.stringify(req.body.sampleInputOutput)}', ${req.body.marks});`;

    try {
        const results = await executeQuery(query);
        res.json(results);
    } catch (error) {
        console.error("Error in /api/create-new-task endpoint:", error);
        handleServerError(res);
    }
});


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
    const query = `INSERT INTO assignment VALUES(${req.body.assignmentID}, '${req.body.deadline}', ${req.body.taskId}, '${req.body.teacherID}', ${req.body.classroomID});`;

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
    const query = `INSERT INTO student_in_classroom VALUES ('${req.body.SRN}', '${req.body.classroomID}');`;

    try {
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

app.listen(PORT, ()=>{
    console.log(`SendIt Server started on port: ${PORT}`);
})