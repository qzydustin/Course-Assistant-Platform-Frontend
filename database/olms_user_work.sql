create table user_work
(
    student_id int          null,
    work_id    int          null,
    score      int          null,
    file_path  varchar(255) null,
    constraint user_work_user_uid_fk
        foreign key (student_id) references user (uid)
            on update cascade on delete cascade,
    constraint user_work_work_work_id_fk
        foreign key (work_id) references work (work_id)
            on update cascade on delete cascade
);

INSERT INTO olms.user_work (student_id, work_id, score, file_path) VALUES (15, 22, 99, 'http://127.0.0.1:8081/scoopSearch.ps1');
INSERT INTO olms.user_work (student_id, work_id, score, file_path) VALUES (15, 23, 80, 'http://127.0.0.1:8081/11635458 Zhenyu Qi.pdf');
INSERT INTO olms.user_work (student_id, work_id, score, file_path) VALUES (17, 24, 80, 'http://127.0.0.1:8081/附件：答辩学生分组安排总表 (2) (1).xlsx');
INSERT INTO olms.user_work (student_id, work_id, score, file_path) VALUES (17, 25, 99, 'http://127.0.0.1:8081/11635458 Zhenyu Qi.pdf');
INSERT INTO olms.user_work (student_id, work_id, score, file_path) VALUES (20, 26, 88, 'http://127.0.0.1:8081/附件1+复议（二辩）名单.xlsx');
INSERT INTO olms.user_work (student_id, work_id, score, file_path) VALUES (20, 27, 99, 'http://127.0.0.1:8081/附件1+复议（二辩）名单.xlsx');