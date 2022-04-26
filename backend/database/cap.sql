# mysql

DROP SCHEMA `CAP`;
CREATE SCHEMA IF NOT EXISTS `CAP`;
USE `CAP`;

CREATE TABLE student
(
    id       BIGINT AUTO_INCREMENT NOT NULL,
    email    VARCHAR(255)          NOT NULL,
    username VARCHAR(255)          NOT NULL,
    password VARCHAR(255)          NOT NULL,
    CONSTRAINT pk_student PRIMARY KEY (id)
);

ALTER TABLE student
    ADD CONSTRAINT uc_student_email UNIQUE (email);

CREATE TABLE instructor
(
    id       BIGINT AUTO_INCREMENT NOT NULL,
    email    VARCHAR(255)          NOT NULL,
    username VARCHAR(255)          NOT NULL,
    password VARCHAR(255)          NOT NULL,
    CONSTRAINT pk_instructor PRIMARY KEY (id)
);

ALTER TABLE instructor
    ADD CONSTRAINT uc_instructor_email UNIQUE (email);

CREATE TABLE course
(
    id            BIGINT AUTO_INCREMENT NOT NULL,
    instructor_id BIGINT                NULL,
    code          VARCHAR(255)          NOT NULL,
    title         VARCHAR(255)          NOT NULL,
    information   VARCHAR(255)          NULL,
    department    VARCHAR(255)          NOT NULL,
    semester      VARCHAR(255)          NOT NULL,
    unit          INT                   NOT NULL,
    seat          INT                   NOT NULL,
    CONSTRAINT pk_course PRIMARY KEY (id)
);

ALTER TABLE course
    ADD CONSTRAINT uc_bbb8dea96c9a828583bb1a0e4 UNIQUE (code, semester);

ALTER TABLE course
    ADD CONSTRAINT FK_COURSE_ON_INSTRUCTOR FOREIGN KEY (instructor_id) REFERENCES instructor (id);

CREATE TABLE student_course
(
    id         BIGINT AUTO_INCREMENT NOT NULL,
    student_id BIGINT                NULL,
    course_id  BIGINT                NULL,
    grade      INT                   NULL,
    CONSTRAINT pk_studentcourse PRIMARY KEY (id)
);

ALTER TABLE student_course
    ADD CONSTRAINT FK_STUDENTCOURSE_ON_COURSE FOREIGN KEY (course_id) REFERENCES course (id);

ALTER TABLE student_course
    ADD CONSTRAINT FK_STUDENTCOURSE_ON_STUDENT FOREIGN KEY (student_id) REFERENCES student (id);

CREATE TABLE post
(
    id            BIGINT AUTO_INCREMENT NOT NULL,
    course_id     BIGINT                NULL,
    title         VARCHAR(255)          NOT NULL,
    content       VARCHAR(255)          NULL,
    student_id    BIGINT                NULL,
    instructor_id BIGINT                NULL,
    CONSTRAINT pk_post PRIMARY KEY (id)
);

ALTER TABLE post
    ADD CONSTRAINT FK_POST_ON_COURSE FOREIGN KEY (course_id) REFERENCES course (id);

ALTER TABLE post
    ADD CONSTRAINT FK_POST_ON_INSTRUCTOR FOREIGN KEY (instructor_id) REFERENCES instructor (id);

ALTER TABLE post
    ADD CONSTRAINT FK_POST_ON_STUDENT FOREIGN KEY (student_id) REFERENCES student (id);

CREATE TABLE post_comment
(
    id            BIGINT AUTO_INCREMENT NOT NULL,
    post_id       BIGINT                NULL,
    context       VARCHAR(255)          NULL,
    student_id    BIGINT                NULL,
    instructor_id BIGINT                NULL,
    CONSTRAINT pk_postcomment PRIMARY KEY (id)
);

ALTER TABLE post_comment
    ADD CONSTRAINT FK_POSTCOMMENT_ON_INSTRUCTOR FOREIGN KEY (instructor_id) REFERENCES instructor (id);

ALTER TABLE post_comment
    ADD CONSTRAINT FK_POSTCOMMENT_ON_POST FOREIGN KEY (post_id) REFERENCES post (id);

ALTER TABLE post_comment
    ADD CONSTRAINT FK_POSTCOMMENT_ON_STUDENT FOREIGN KEY (student_id) REFERENCES student (id);