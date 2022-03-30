# mysql

CREATE SCHEMA IF NOT EXISTS `CAP`;
USE `CAP`;

CREATE TABLE student
(
    id       BIGINT       NOT NULL,
    email    VARCHAR(255) NULL,
    username VARCHAR(255) NULL,
    password VARCHAR(255) NULL,
    CONSTRAINT pk_student PRIMARY KEY (id)
);

ALTER TABLE student
    ADD CONSTRAINT uc_student_email UNIQUE (email);

CREATE TABLE instructor
(
    id       BIGINT       NOT NULL,
    email    VARCHAR(255) NULL,
    username VARCHAR(255) NULL,
    password VARCHAR(255) NULL,
    CONSTRAINT pk_instructor PRIMARY KEY (id)
);

ALTER TABLE instructor
    ADD CONSTRAINT uc_instructor_email UNIQUE (email);

CREATE TABLE course
(
    id            BIGINT       NOT NULL,
    instructor_id BIGINT       NULL,
    code          VARCHAR(255) NULL,
    name          VARCHAR(255) NULL,
    information   VARCHAR(255) NULL,
    department    VARCHAR(255) NULL,
    unit          INT          NULL,
    semester      date         NULL,
    seat          INT          NULL,
    CONSTRAINT pk_course PRIMARY KEY (id)
);

ALTER TABLE course
    ADD CONSTRAINT uc_course_code_semester UNIQUE (code, semester);

ALTER TABLE course
    ADD CONSTRAINT FK_COURSE_ON_INSTRUCTOR FOREIGN KEY (instructor_id) REFERENCES instructor (id);


CREATE TABLE student_course
(
    id         BIGINT NOT NULL,
    student_id BIGINT NULL,
    course_id  BIGINT NULL,
    grade      INT    NULL,
    CONSTRAINT pk_student_course PRIMARY KEY (id)
);

ALTER TABLE student_course
    ADD CONSTRAINT FK_STUDENT_COURSE_ON_COURSE FOREIGN KEY (course_id) REFERENCES course (id);

ALTER TABLE student_course
    ADD CONSTRAINT FK_STUDENT_COURSE_ON_STUDENT FOREIGN KEY (student_id) REFERENCES student (id);