 DROP DATABASE IF EXISTS SENDIT;
 CREATE DATABASE IF NOT EXISTS SENDIT ;
 USE SENDIT;
 
CREATE TABLE `sendit`.`student` (
  `SRN` VARCHAR(15) NOT NULL,
  `FirstName` VARCHAR(20) NOT NULL,
  `LastName` VARCHAR(20),
  `Email` VARCHAR(50) NOT NULL,
  `Password` VARCHAR(100) NOT NULL,
  `Section` CHAR NOT NULL,
  `Semester` INT NOT NULL,
  PRIMARY KEY (`SRN`));

CREATE TABLE `sendit`.`task` (
  `task_id` INT NOT NULL,
  `questions` JSON NOT NULL,
  `solutions` JSON NOT NULL,
  `task_marks` INT NOT NULL,
  PRIMARY KEY (`task_id`));

  CREATE TABLE `sendit`.`submission` (
  `submissionID` INT NOT NULL AUTO_INCREMENT,
  `submission_date` DATETIME NOT NULL,
  `content` MEDIUMBLOB NULL,
  `plagiarism_report` VARCHAR(40),
  `marks` int,
  `task_id` int not null,
  `srn` varchar(15) not null,
  PRIMARY KEY (`submissionID`),
  FOREIGN KEY (task_id) REFERENCES `sendit`.`task` (task_id),
  FOREIGN KEY (srn) REFERENCES `sendit`.`student` (srn));  
    
  CREATE TABLE `sendit`.`teacher` (
  `teacher_id` VARCHAR(15) NOT NULL,
  `first_name` VARCHAR(20) NOT NULL,
  `last_name` VARCHAR(20) NULL,
  `email` VARCHAR(20) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`teacher_id`));

  CREATE TABLE `sendit`.`classroom` (
  `classroom_id` INT NOT NULL AUTO_INCREMENT,
  `section` CHAR(1) NULL,
  `name` VARCHAR(50) NOT NULL,
  `semester` INT NULL,
  `subject` VARCHAR(20) NULL,
  `teacher_id` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`classroom_id`),
  FOREIGN KEY (teacher_id) REFERENCES `sendit`.`teacher` (teacher_id)
  );

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
    
DROP FUNCTION IF EXISTS get_SRN_from_email;

DELIMITER $$
CREATE FUNCTION get_SRN_from_email(e varchar(50))
RETURNS VARCHAR(15) DETERMINISTIC
BEGIN
    DECLARE selected_srn VARCHAR(15);
    SELECT SRN INTO selected_srn FROM student WHERE email = e;
    RETURN selected_srn;
END $$
DELIMITER ;


























