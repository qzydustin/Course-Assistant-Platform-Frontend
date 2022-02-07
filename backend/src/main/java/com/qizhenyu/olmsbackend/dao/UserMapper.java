package com.qizhenyu.olmsbackend.dao;

import com.qizhenyu.olmsbackend.model.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface UserMapper {

    @Select("SELECT * FROM user WHERE username = #{username}")
    @Results({
            @Result(property = "uid", column = "uid"),
            @Result(property = "username", column = "username"),
            @Result(property = "password", column = "password"),
            @Result(property = "auth", column = "auth")
    })
    User getUserByUsername(String username);

    @Select("SELECT * FROM user")
    @Results({
            @Result(property = "uid", column = "uid"),
            @Result(property = "username", column = "username"),
            @Result(property = "password", column = "password"),
            @Result(property = "auth", column = "auth")

    })
    List<User> getAllUsers();

    @Select("SELECT student_id,username FROM user_course, user " +
            "where user_course.student_id = user.uid and cid = #{course_id}")
    @Results({
            @Result(property = "uid", column = "student_id"),
            @Result(property = "username", column = "username"),

    })
    List<User> getUsersByCourse(int course_id);

    @Insert("INSERT INTO user(username,password,auth) VALUES(#{username}, #{password}, #{auth})")
    void insert(String username, String password, int auth);

    @Update("UPDATE user SET password=#{password},auth=#{auth} WHERE username =#{username}")
    void update(String username, String password, int auth);

    @Delete("DELETE FROM user WHERE username = #{username}")
    void delete(String username);


}
