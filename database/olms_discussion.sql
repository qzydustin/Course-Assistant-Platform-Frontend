create table discussion
(
    tid     int          not null,
    uid     int          not null,
    message varchar(255) not null,
    constraint discussion_topic_tid_fk
        foreign key (tid) references topic (tid)
            on update cascade on delete cascade
);

INSERT INTO olms.discussion (tid, uid, message) VALUES (11, 8, '同学们，也可以聊聊前后端分离的缺点');
INSERT INTO olms.discussion (tid, uid, message) VALUES (11, 9, '我觉得，前后端分离可以前后端同步开发，提高效率');
INSERT INTO olms.discussion (tid, uid, message) VALUES (12, 12, '大家发表自己的意见');
INSERT INTO olms.discussion (tid, uid, message) VALUES (12, 13, '学生测试一下');
INSERT INTO olms.discussion (tid, uid, message) VALUES (13, 14, '欢迎大家来发表意见');
INSERT INTO olms.discussion (tid, uid, message) VALUES (13, 15, '测试参与讨论');
INSERT INTO olms.discussion (tid, uid, message) VALUES (14, 16, '测试看法');
INSERT INTO olms.discussion (tid, uid, message) VALUES (14, 17, '我是学生');
INSERT INTO olms.discussion (tid, uid, message) VALUES (15, 19, '总结一下问题，本周实验课解答');
INSERT INTO olms.discussion (tid, uid, message) VALUES (15, 20, '暂时没有问题');