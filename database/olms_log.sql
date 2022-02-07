create table log
(
    uid int          not null,
    log varchar(255) not null,
    constraint log_user_uid_fk
        foreign key (uid) references user (uid)
            on update cascade on delete cascade
);

