const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const { randomUUID } = require('crypto');
const bcrypt = require('bcryptjs');
// var session = require('express-session');
const cookieParser = require("cookie-parser");
const cors = require("cors");


const PORT = 4000
const app = express();

app.use(express.urlencoded({ extended: true }));

// app.use(logger);
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Update with your client URL
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

const oneDay = 1000 * 60 * 60 * 24;
// app.use(session({  
//     name: `userRole`,
//     secret: 'some-secret-example',  
//     resave: false,
//     saveUninitialized: true,
//     cookie: { 
//         secure: false, // This will only work if you have https enabled!
//         maxAge: oneDay // 1 min
//     } 
// }));


// var sessionChecker = (req, res, next) => {    
//     console.log(`Session Checker: ${req.session.id}`.green);
//     console.log(req.session);
//     if (req.session.profile) {
//         console.log(`Found User Session`.green);
//         next();
//     } else {
//         console.log(`No User Session Found`.red);
//         res.redirect('/login');
//     }
// };

// app.get('/', sessionChecker, async function(req, res, next) {
//     res.redirect('/account');
// });

require('dotenv').config({path: "../.env"});


const e = require('express');

app.use(cors());
app.options('/api/teacherExists', cors());

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

// function logger(req, res, next){
//     console.log(`[${Date.now()}] ${req.method} ${req.url}`)
//     next();
// }

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

async function handleNormalLogin(password, user, res, req, results, type) {
    console.log("HASH: ",password, user.password)
    const passwordMatch = await bcrypt.compare(password, user.password);
    const results2 = [{
        email: results[0].email,
        userRole: type
    }]
    if (passwordMatch) {
        res.json(results2)
    } else {
        handleUnauthorized(res);
    }
}

app.get('/api/logout', async function(req, res, next) {
    res.clearCookie('userRole')
    res.redirect('/login');
});

app.post('/api/studentExists', async (req, res) => {
    const query = `select email, first_name, password from student where email = '${req.body.email}' LIMIT 1;`;
    try {
        const resultsJSON = await executeQuery(query);
        if (resultsJSON["success"] == false) {
            handleServerError(res);
            return;
        }

        console.log("resultsJSON",resultsJSON)

        const results = resultsJSON['data'];
        const user = results[0];
       

        if (results.length < 1) {
            handleNotFound(res);
            return;
        }

        if (req.body.loginMethod == "Normal") {
            handleNormalLogin(req.body.password, user, res, req, results, 0);
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

app.post('/api/teacherExists', async (req, res) => {
    // console.log(`select email, first_name, password from teacher where email = '${req.body.email}' limit 1;`)
    const query = `select email, first_name, password from teacher where email = '${req.body.email}' limit 1;`;
    try {
        const resultsJSON = await executeQuery(query);
        if (resultsJSON["success"] == false) {
            handleServerError(res);
            return;
        }

        const results = resultsJSON["data"];
        // console.log(resultsJSON)
        const user = results[0];
        console.log("user",user)

        // console.log("PASS:", req.body.password)
        // console.log("Cookie", req.cookies)

        if (results.length < 1) {
            handleNotFound(res);
            return;
        }

        // console.log("results: ",results)

        // res.json(results);
        if (req.body.loginMethod == "Normal") {
            handleNormalLogin(req.body.password, user, res, req, results, 1);
        } else if (req.body.loginMethod == "NextAuth") {
            res.json(results);
        } else{
            handleBadRequest(res);
        }

    } catch (error) {
        console.error('Error in /api/teacherExists endpoint:', error);
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

    const SRNQuery = `select get_SRN_from_email('${req.body.email}') AS SRN;`; 

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

app.post('/api/get-teacher-id', async (req,res)=>{

    const TIDQuery = `select get_tid_from_email('${req.body.email}') AS TID;`; 

    try {

        const TIDResults = await executeQuery(TIDQuery);
        if(TIDResults["success"] == false){
            handleServerError(res);
            return;
        }
        
        if(TIDResults["data"].length < 1){
            handleNotFound(res);
            return;
        }

        // var TID = TIDResults["data"][0]["TID"];
        
        res.json(TIDResults);
    } catch (error) {
        console.error("Error in /api/student-join-classroom endpoint:", error);
        handleServerError(res);
    }
});

app.post('/api/get-classrooms-for-student', async (req,res)=>{

    const SRNQuery = `select get_SRN_from_email('${req.body.email}') AS SRN;`;  
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
        const query = `select classroom_id AS classroomId, section, name, semester, subject, CONCAT(t.first_name, ' ', t.last_name) AS teacher from classroom c JOIN student_in_classroom sic on c.classroom_id = sic.ClassroomID JOIN teacher t ON t.teacher_id = c.teacher_id where sic.srn = '${SRN}';`;

        const results = await executeQuery(query);
        res.json(results);
    } catch (error) {
        console.error("Error in /api/create-new-submission endpoint:", error);
        handleServerError(res);
    }
});

app.post('/api/get-classrooms-for-teacher', async (req,res)=>{

    const query = `select classroom_id AS classroomId, code, section, name, semester, subject from classroom where teacher_id='${req.body.teacherId}';`; 
    //select classroom_id AS classroomId, code, section, name, semester, subject from classroom where teacher_id="PESUT001";
    
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
        // const query = `select classroom_id AS classroomId, section, name, semester, subject, CONCAT(t.first_name, ' ', t.last_name) AS teacher from classroom c JOIN student_in_classroom sic on c.classroom_id = sic.ClassroomID JOIN teacher t ON t.teacher_id = c.teacher_id where sic.srn = '${SRN}';`;

        const results = await executeQuery(query);
        res.json(results);
    } catch (error) {
        console.error("Error in /api/create-new-submission endpoint:", error);
        handleServerError(res);
    }
});

app.get('/api/get-srn', async (req,res)=>{
    const query = `select get_SRN_from_email('${req.body.email}') AS SRN;`;

    try {
        const results = await executeQuery(query);
        res.json(results);
    } catch (error) {
        console.error("Error in /api/get-srn endpoint:", error);
        handleServerError(res);
    }
});

app.get('/api/get-assignments-for-classroom', async (req,res)=>{
    const query = `select DISTINCT name, deadline, teacher_id from assignment where classroom_id = ${req.body.classroomId};`;

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
    const query = `SELECT task_id,questions, solutions, task_marks FROM task WHERE assignment_id = ${req.body.assignmentId};`;

    try {
        const results = await executeQuery(query);
        res.json(results);
    } catch (error) {
        console.error("Error in /api/get-tasks-for-assignment endpoint:", error);
        handleServerError(res);
    }
});

app.post('/api/get-assignment-for-classroom', async (req,res)=>{
    console.log(req.body)
    const query = `SELECT assignment_id, name, deadline, teacher_id FROM assignment WHERE classroom_id = ${req.body.classroomId};`;

    try {
        const results = await executeQuery(query);
        res.json(results);
    } catch (error) {
        console.error("Error in /api/get-tasks-for-assignment endpoint:", error);
        handleServerError(res);
    }
});



app.post('/api/check-class-code', async (req,res)=>{
    const query = `select * from classroom where code = '${req.body.classroomCode}' LIMIT 1;`;

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