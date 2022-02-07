create table resource
(
    cid       int          not null,
    title     varchar(255) null,
    content   varchar(255) null,
    file_path varchar(255) null,
    constraint resource_course_cid_fk
        foreign key (cid) references course (cid)
            on update cascade on delete cascade
);

INSERT INTO olms.resource (cid, title, content, file_path) VALUES (1, '答辩通知测试', '这是测试的内容', null);
INSERT INTO olms.resource (cid, title, content, file_path) VALUES (1, '测试资料标题', '这是资料的正文', 'http://127.0.0.1:8081/附件：答辩学生分组安排总表.xlsx');
INSERT INTO olms.resource (cid, title, content, file_path) VALUES (667788, '通知测试', '这是一条通知', null);
INSERT INTO olms.resource (cid, title, content, file_path) VALUES (667788, '发布资料', '这是一个资料', 'http://127.0.0.1:8081/附件：答辩学生分组安排总表.xlsx');
INSERT INTO olms.resource (cid, title, content, file_path) VALUES (112233, '通知测试1', '这是通知的内容', null);
INSERT INTO olms.resource (cid, title, content, file_path) VALUES (112233, '测试资料', '这是一个资料', 'http://127.0.0.1:8081/附件：答辩学生分组安排总表 (2).xlsx');
INSERT INTO olms.resource (cid, title, content, file_path) VALUES (555, '测试通知', '123', null);
INSERT INTO olms.resource (cid, title, content, file_path) VALUES (555, '测试资料', '123', 'http://127.0.0.1:8081/附件：答辩学生分组安排总表 (1).xlsx');
INSERT INTO olms.resource (cid, title, content, file_path) VALUES (111111, '2021-5-25开会', '请大家于2021-5-25日中午N6会议室开会', null);
INSERT INTO olms.resource (cid, title, content, file_path) VALUES (111111, '实验报告', '周五实验课的实验报告', 'http://127.0.0.1:8081/实验报告.docx');