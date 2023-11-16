 DROP DATABASE IF EXISTS SENDIT;
 CREATE DATABASE IF NOT EXISTS SENDIT ;

 use sendit;
 
CREATE TABLE `sendit`.`student` (
  `SRN` VARCHAR(15) NOT NULL,
  `FirstName` VARCHAR(20) NOT NULL,
  `LastName` VARCHAR(20),
  `Email` VARCHAR(50) NOT NULL,
  `Password` VARCHAR(100) NOT NULL,
  `Section` CHAR NOT NULL,
  `Semester` INT NOT NULL,
  PRIMARY KEY (`SRN`));

-- insert into student values("PES2UG21CS594","Varun","K", "wfewfub@gmail.com", 'efbfue','J',5);

  
CREATE TABLE `sendit`.`task` (
  `task_id` INT NOT NULL,
  `questions` JSON NOT NULL,
  `solutions` JSON NOT NULL,
  `task_marks` INT NOT NULL,
  PRIMARY KEY (`task_id`));

-- insert into task values
-- (1, 'sol 1', "Que 1",1),
-- (2, "sol 2", "Que 2",5),
-- (3, "sol 3", "Que 3",10);

  
  
  CREATE TABLE `sendit`.`submission` (
  `submissionID` INT NOT NULL AUTO_INCREMENT,
  `submission_date` DATETIME NOT NULL,
  -- `content` MEDIUMBLOB NULL,
  `content` varchar(15) NULL,
  `plagiarism_report` VARCHAR(20),
  `marks` int,
  `task_id` int not null,
  `srn` varchar(15) not null,
  PRIMARY KEY (`submissionID`),
  FOREIGN KEY (task_id) REFERENCES `sendit`.`task` (task_id),
  FOREIGN KEY (srn) REFERENCES `sendit`.`student` (srn));

-- select * from submission;
--   
-- insert into submission values (12, '2023-10-20', "SOME CODE FOR 1", NULL, NULL, 1, 'PES2UG21CS594');
-- insert into submission values (13, '2023-10-20', "SOME CODE for 1", NULL, NULL, 1, 'PES2UG21CS594');
-- insert into submission values (15, '2023-10-21', "SOME CODE for 2", NULL, NULL, 2, 'PES2UG21CS594');
    
    
  CREATE TABLE `sendit`.`teacher` (
  `teacher_id` VARCHAR(15) NOT NULL,
  `first_name` VARCHAR(20) NOT NULL,
  `last_name` VARCHAR(20) NULL,
  `email` VARCHAR(20) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`teacher_id`));
  
-- insert into teacher values ("temp123", "FN", "LN", "email@emai.com", "pass");


  CREATE TABLE `sendit`.`classroom` (
  `classroom_id` INT NOT NULL AUTO_INCREMENT,
  `section` CHAR(1) NULL,
  `name` VARCHAR(20) NOT NULL,
  `semester` INT NULL,
  `subject` VARCHAR(20) NULL,
  `teacher_id` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`classroom_id`),
  FOREIGN KEY (teacher_id) REFERENCES `sendit`.`teacher` (teacher_id)
  );
  
-- insert into classroom values(3, 'J', 'Big Data Classroom', 5, 'Big Data', 'temp123');

CREATE TABLE `sendit`.`assignment` (
  `assignment_id` INT NOT NULL,
  `deadline` DATETIME NOT NULL,
  `task_id` INT NOT NULL,
  `teacher_id` VARCHAR(15) NOT NULL,
  `classroom_id` INT NOT NULL,
  PRIMARY KEY (`assignment_id`,`task_id`),
  FOREIGN KEY (task_id) REFERENCES `sendit`.`task` (task_id),
  FOREIGN KEY (classroom_id) REFERENCES `sendit`.`classroom` (classroom_id),
  FOREIGN KEY (teacher_id) REFERENCES `sendit`.`teacher` (teacher_id));

-- insert into assignment values(32, '2023-10-21', 1,'temp123', 3);
-- insert into assignment values(32, '2023-10-21', 2,'temp123', 3);
-- insert into assignment values(32, '2023-10-21', 3,'temp123', 3);

CREATE TABLE `sendit`.`student_in_classroom` (
  `SRN` VARCHAR(15) NOT NULL,
  `ClassroomID` INT NOT NULL,
  INDEX `SRN_F_Key_idx` (`SRN` ASC) VISIBLE,
  INDEX `ClassroomID_F_Key_idx` (`ClassroomID` ASC) VISIBLE,
  PRIMARY KEY (`ClassroomID`, `SRN`),
  CONSTRAINT `SRN_F_Key`
    FOREIGN KEY (`SRN`)
    REFERENCES `sendit`.`student` (`SRN`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `ClassroomID_F_Key`
    FOREIGN KEY (`ClassroomID`)
    REFERENCES `sendit`.`classroom` (`classroom_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
    
-- insert into student_in_classroom values('PES2UG21CS594',3);



-- CHECKING

-- use sendit;

-- select * from submission as s join assignment as t where s.task_id = t.task_id;

-- select * from student;

-- select * from teacher;

-- select * from task;
-- select questions from task where task_id = 101;

-- drop table submission;
-- drop table assignment;
-- drop table task;

-- SELECT task_id, questions->"$.title" AS `title` FROM task;

-- select * from classroom;

-- select * from assignment;

-- select * from submission;
-- delete from submission where submissionID = 10;


select * from student;
select * from teacher;
select * from task;
select * from classroom;
-- insert into student values ("PES2UG21CS593", "VARUN", "C", "test@email.com", "Password", "J", 5);

-- INSERT INTO classroom(section, 'name', 'semester', 'subject', 'teacher_id') VALUES('G', 'MI Classroom', 5, 'Machine Intelligence', 'PESUT001');



INSERT INTO student VALUES('SRN1', 'firstname', 'lastname', 'email', 'dasdasdasd', 'J', 5);


























