create table user
(
    uid      int auto_increment,
    username varchar(100) not null,
    password varchar(100) not null,
    auth     int          not null,
    constraint user_uid_uindex
        unique (uid),
    constraint user_username_uindex
        unique (username)
);

alter table user
    add primary key (uid);

INSERT INTO olms.user (uid, username, password, auth) VALUES (14, '测试老师', '01922bcc0de4e8fe514271f5f3cfa2ef877589e8', 0);
INSERT INTO olms.user (uid, username, password, auth) VALUES (15, '测试学生', '8763c6d9bfe6b4155c1742367a8a3ec83b273951', 1);
INSERT INTO olms.user (uid, username, password, auth) VALUES (16, '答辩测试老师', '9e1a829184e0cfd1193ef66fc301c72c3e03d86c', 0);
INSERT INTO olms.user (uid, username, password, auth) VALUES (17, '答辩测试学生', 'c0f9ffaf701077dac11dd58cb79b1d0d40228464', 1);
INSERT INTO olms.user (uid, username, password, auth) VALUES (18, '张三', 'ced07fb42b05a2ed9efa330250e2bb9175f962ce', 1);
INSERT INTO olms.user (uid, username, password, auth) VALUES (19, '钱老师', '4adc42e5214d676fa24ae43b45a5daed258b63c1', 0);
INSERT INTO olms.user (uid, username, password, auth) VALUES (20, '小刚', '4ef42b2f10890376cb9e87b619fe9566fa143444', 1);