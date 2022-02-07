create table user_course
(
    student_id int not null,
    cid        int not null,
    grade      int null,
    constraint user_course_course_cid_fk
        foreign key (cid) references course (cid)
            on update cascade on delete cascade,
    constraint user_course_user_uid_fk
        foreign key (student_id) references user (uid)
            on update cascade on delete cascade
);

INSERT INTO olms.user_course (student_id, cid, grade) VALUES (17, 555, null);
INSERT INTO olms.user_course (student_id, cid, grade) VALUES (20, 111111, null);