create table work
(
    work_id      int auto_increment,
    cid          int          not null,
    work_title   varchar(255) not null,
    work_content varchar(255) not null,
    isExam       int          not null,
    constraint work_work_id_uindex
        unique (work_id),
    constraint work_course_cid_fk
        foreign key (cid) references course (cid)
            on update cascade on delete cascade
);

alter table work
    add primary key (work_id);

INSERT INTO olms.work (work_id, cid, work_title, work_content, isExam) VALUES (18, 1, '测试作业', '这是一个作业的测试', 0);
INSERT INTO olms.work (work_id, cid, work_title, work_content, isExam) VALUES (19, 1, '测试考试', '考试范围第一章节', 1);
INSERT INTO olms.work (work_id, cid, work_title, work_content, isExam) VALUES (20, 667788, '作业测试1', '这是作业的介绍', 0);
INSERT INTO olms.work (work_id, cid, work_title, work_content, isExam) VALUES (21, 667788, '测试考试', '这是考试的范围', 1);
INSERT INTO olms.work (work_id, cid, work_title, work_content, isExam) VALUES (22, 112233, '测试作业', '作业内容', 0);
INSERT INTO olms.work (work_id, cid, work_title, work_content, isExam) VALUES (23, 112233, '测试考试', '测试范围', 1);
INSERT INTO olms.work (work_id, cid, work_title, work_content, isExam) VALUES (24, 555, '测试作业', '123123', 0);
INSERT INTO olms.work (work_id, cid, work_title, work_content, isExam) VALUES (25, 555, '测试考试', '11111', 1);
INSERT INTO olms.work (work_id, cid, work_title, work_content, isExam) VALUES (26, 111111, '实验课练习题一', '搭建Mysql服务器环境', 0);
INSERT INTO olms.work (work_id, cid, work_title, work_content, isExam) VALUES (27, 111111, '期中考试', '书本第一章至第六章', 1);