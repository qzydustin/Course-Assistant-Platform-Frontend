create table topic
(
    tid     int auto_increment,
    cid     int          not null,
    title   varchar(255) not null,
    content varchar(255) not null,
    constraint topic_tid_uindex
        unique (tid),
    constraint topic_course_cid_fk
        foreign key (cid) references course (cid)
            on update cascade on delete cascade
);

INSERT INTO olms.topic (tid, cid, title, content) VALUES (11, 1, '测试课后讨论', '大家来聊聊前后端分离的优点');
INSERT INTO olms.topic (tid, cid, title, content) VALUES (12, 667788, '测试讨论', '这是一个讨论，大家来发表看法');
INSERT INTO olms.topic (tid, cid, title, content) VALUES (13, 112233, '讨论话题', '这是简介');
INSERT INTO olms.topic (tid, cid, title, content) VALUES (14, 555, '测试讨论', '1111');
INSERT INTO olms.topic (tid, cid, title, content) VALUES (15, 111111, '聊聊上周实验课遇到了什么问题', '大家可以畅所欲言');