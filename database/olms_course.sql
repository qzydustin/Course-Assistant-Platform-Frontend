create table course
(
    cid         int          not null,
    teacher_id  int          not null,
    course_name varchar(255) not null,
    constraint course_cid_uindex
        unique (cid)
);

alter table course
    add primary key (cid);

INSERT INTO olms.course (cid, teacher_id, course_name) VALUES (1, 8, '论文答辩测试');
INSERT INTO olms.course (cid, teacher_id, course_name) VALUES (555, 16, '测试课程');
INSERT INTO olms.course (cid, teacher_id, course_name) VALUES (111111, 19, '数据库管理');
INSERT INTO olms.course (cid, teacher_id, course_name) VALUES (112233, 14, '数据库');
INSERT INTO olms.course (cid, teacher_id, course_name) VALUES (667788, 12, '数据库');