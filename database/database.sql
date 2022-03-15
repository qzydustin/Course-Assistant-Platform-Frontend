-- -----------------------------------------------------
-- Schema CAP
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `CAP` ;
USE `CAP` ;

-- -----------------------------------------------------
-- Table `CAP`.`instructors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CAP`.`instructors` (
  `iid` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`iid`),
  UNIQUE INDEX `iid_UNIQUE` (`iid` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
;

-- -----------------------------------------------------
-- Table `CAP`.`students`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CAP`.`students` (
  `sid` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`sid`),
  UNIQUE INDEX `sid_uindex` (`sid` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
;


-- -----------------------------------------------------
-- Table `CAP`.`courses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CAP`.`courses` (
  `cid` INT NOT NULL,
  `iid` INT NOT NULL,
  `course_name` VARCHAR(120) NOT NULL,
  `course_id` VARCHAR(45) NOT NULL,
  `description` VARCHAR(120) NULL DEFAULT NULL,
  `department` VARCHAR(45) NOT NULL,
  `units` INT NOT NULL,
  `offered_time` DATE NOT NULL,
  `availability` INT NOT NULL,
  PRIMARY KEY (`cid`),
  UNIQUE INDEX `course_cid_uindex` (`cid` ASC) VISIBLE,
  INDEX `course_iid_fk_idx` (`iid` ASC) VISIBLE,
  UNIQUE INDEX `course_id_UNIQUE` (`course_id` ASC) VISIBLE,
  UNIQUE INDEX `course_name_UNIQUE` (`course_name` ASC) VISIBLE,
  CONSTRAINT `course_iid_fk`
    FOREIGN KEY (`iid`)
    REFERENCES `CAP`.`instructors` (`iid`))
;


-- -----------------------------------------------------
-- Table `CAP`.`components`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CAP`.`components` (
  `components_id` INT NOT NULL,
  `cid` INT NOT NULL,
  `components_name` VARCHAR(45) NOT NULL,
  `components_score_percentage` INT NOT NULL,
  PRIMARY KEY (`components_id`),
  UNIQUE INDEX `components_id_UNIQUE` (`components_id` ASC) VISIBLE,
  INDEX `components_cid_fk` (`cid` ASC) VISIBLE,
  CONSTRAINT `components_cid_fk`
    FOREIGN KEY (`cid`)
    REFERENCES `CAP`.`courses` (`cid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
;


-- -----------------------------------------------------
-- Table `CAP`.`resources`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CAP`.`resources` (
  `rid` INT NOT NULL AUTO_INCREMENT,
  `cid` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `file_path` VARCHAR(255) NULL DEFAULT NULL,
  `start_time` DATE NOT NULL,
  `end_time` DATE NOT NULL,
  `components_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`rid`),
  UNIQUE INDEX `resources_rid_uindex` (`rid` ASC) INVISIBLE,
  INDEX `resources_cid_fk` (`cid` ASC) VISIBLE,
  INDEX `resources_components_id_idx` (`components_id` ASC) VISIBLE,
  CONSTRAINT `resources_cid_fk`
    FOREIGN KEY (`cid`)
    REFERENCES `CAP`.`courses` (`cid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `resources_components_id`
    FOREIGN KEY (`components_id`)
    REFERENCES `CAP`.`components` (`components_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;



-- -----------------------------------------------------
-- Table `CAP`.`students_courses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CAP`.`students_courses` (
  `sid` INT NOT NULL,
  `cid` INT NOT NULL,
  `grade` INT NULL DEFAULT NULL,
  INDEX `students_course_cid_fk` (`cid` ASC) VISIBLE,
  INDEX `students_course_sid_fk` (`sid` ASC) VISIBLE,
  CONSTRAINT `students_course_cid_fk`
    FOREIGN KEY (`cid`)
    REFERENCES `CAP`.`courses` (`cid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `students_course_sid_fk`
    FOREIGN KEY (`sid`)
    REFERENCES `CAP`.`students` (`sid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
;


-- -----------------------------------------------------
-- Table `CAP`.`students_resources`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CAP`.`students_resources` (
  `sid` INT NULL DEFAULT NULL,
  `rid` INT NULL DEFAULT NULL,
  `score` INT NULL DEFAULT NULL,
  `file_path` VARCHAR(255) NULL DEFAULT NULL,
  `text_contents` VARCHAR(250) NULL DEFAULT NULL,
  `students_resourcescol` VARCHAR(45) NULL DEFAULT NULL,
  INDEX `students_resources_sid_fk` (`sid` ASC) VISIBLE,
  INDEX `students_resources_rid_fk` (`rid` ASC) VISIBLE,
  CONSTRAINT `students_resources_rid_fk`
    FOREIGN KEY (`rid`)
    REFERENCES `CAP`.`resources` (`rid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `students_resources_sid_fk`
    FOREIGN KEY (`sid`)
    REFERENCES `CAP`.`students` (`sid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
;
