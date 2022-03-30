
INSERT INTO student (id, email, username, password)
VALUES ('1', 'ym1001@email.arizona.edu', '12345', 'ym1001');

INSERT INTO student (id, email, username, password)
VALUES ('2', 'ym1002@email.arizona.edu', '12345', 'ym1002');

INSERT INTO student (id, email, username, password)
VALUES ('3', 'ym1003@email.arizona.edu', '12345', 'ym1003');

INSERT INTO student (id, email, username, password)
VALUES ('4', 'ym1004@email.arizona.edu', '12345', 'ym1004');




INSERT INTO instructor (id, email, username, password)
VALUES ('5', 'ym1005@email.arizona.edu', '123456', 'ym1005');

INSERT INTO instructor (id, email, username, password)
VALUES ('6', 'ym1006@email.arizona.edu', '1234567', 'ym1006');

INSERT INTO instructor (id, email, username, password)
VALUES ('7', 'ym1007@email.arizona.edu', '12345678', 'ym1007');

INSERT INTO instructor (id, email, username, password)
VALUES ('8', 'ym1008@email.arizona.edu', '123456789', 'ym1008');




INSERT INTO course (id, instructor_id, code, title, information, department, semester, unit, seat)
VALUES ('220','5','20220329','IntroToComputerScience1','CS','2022spring','3','100');
INSERT INTO course (id, instructor_id, code, title, information, department, semester, unit, seat)
VALUES ('221','6','20220328','IntroToComputerScience2','CS','2022spring','3','100');
INSERT INTO course (id, instructor_id, code, title, information, department, semester, unit, seat)
VALUES ('222','7','20220327','IntroToComputerScience3','CS','2022spring','3','100');
INSERT INTO course (id, instructor_id, code, title, information, department, semester, unit, seat)
VALUES ('223','8','20220326','IntroToComputerScience4','CS','2022spring','3','100');





INSERT INTO student_course (id, student_id, course_id, grade)
VALUES ('110', '1', 'cs110', 'A');

INSERT INTO student_course (id, student_id, course_id, grade)
VALUES ('120', '2', 'cs120', 'B');

INSERT INTO student_course (id, student_id, course_id, grade)
VALUES ('130', '3', 'cs130', 'C');

INSERT INTO student_course (id, student_id, course_id, grade)
VALUES ('140', '4', 'cs140', 'D');









