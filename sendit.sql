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
  `assignment_id` INT NOT NULL,
  `questions` JSON NOT NULL,
  `solutions` JSON NOT NULL,
  `task_marks` INT NOT NULL,
  PRIMARY KEY (`task_id`, `assignment_id`));

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
  `code` VARCHAR(8) UNIQUE,
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
  `name` VARCHAR(100) NOT NULL,
  `deadline` DATETIME NOT NULL,
  `teacher_id` VARCHAR(15) NOT NULL,
  `classroom_id` INT NOT NULL,
  PRIMARY KEY (`assignment_id`),
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

ALTER TABLE task ADD FOREIGN KEY (assignment_id) REFERENCES `sendit`.`assignment` (assignment_id);

DELIMITER $$
CREATE FUNCTION right_rotate(input_string VARCHAR(8), positions INT)
RETURNS VARCHAR(8) DETERMINISTIC
BEGIN
    DECLARE rotated_string VARCHAR(8);
    SET rotated_string = CONCAT(SUBSTRING(input_string, positions+1), SUBSTRING(input_string, 1, positions));

    RETURN rotated_string;
END $$
DELIMITER ;

DELIMITER $$
CREATE FUNCTION generate_code()
RETURNS VARCHAR(10) DETERMINISTIC
BEGIN
    DECLARE random_number INT;
    DECLARE code_string VARCHAR(10);
    DECLARE code_exists INT;
    DECLARE max_counter INT;
    
    SET max_counter = 30; -- Maximum iterations to check for collisions in classroom code.
    
    REPEAT

		SET random_number = FLOOR(RAND() * 100000);
		SET random_number = CAST(random_number AS CHAR CHARACTER SET utf8mb4);
		SET code_string = LPAD(random_number, 8, '0');
		SET code_string = right_rotate(code_string, 6);
		SET random_number = CAST(code_string AS UNSIGNED);
		SET code_string = CONV(random_number, 10, 34);
		SET code_string = REPLACE(REPLACE(code_string, '0', 'y'), '1', 'z');
		SET code_string = UPPER(code_string);
        
        -- Decrement max counter
        SET max_counter = max_counter - 1;
        
        -- Check if code exists
        SELECT COUNT(*) INTO code_exists FROM classroom WHERE code = code_string;
        
	UNTIL code_exists = 0 OR max_counter = 0 END REPEAT;

    RETURN code_string;
END $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER generate_class_room_code
BEFORE INSERT
ON classroom
FOR EACH ROW
BEGIN
    SET NEW.code = IFNULL(NEW.code, generate_code());
END $$
DELIMITER ;













