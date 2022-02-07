package com.qizhenyu.olmsbackend.dao;

import com.qizhenyu.olmsbackend.model.Course;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface CourseMapper {

    @Select("select c.cid, c.course_name, tu.username\n" +
            "from user_course as uc,\n" +
            "     course as c,\n" +
            "     user as u,\n" +
            "     user as tu\n" +
            "where uc.cid = c.cid && uc.student_id = u.uid && tu.uid = c.teacher_id && u.username = #{username}")
    @Results({
            @Result(property = "cid", column = "cid"),
            @Result(property = "course_name", column = "course_name"),
            @Result(property = "username", column = "username"),
    })
    List<Course> getStudentCourseByUsername(String username);

    @Select("select c.cid, c.course_name, tu.username\n" +
            "from course as c,\n" +
            "     user as tu\n" +
            "where tu.uid = c.teacher_id && tu.username = #{username}")
    @Results({
            @Result(property = "cid", column = "cid"),
            @Result(property = "course_name", column = "course_name"),
            @Result(property = "username", column = "username"),
    })
    List<Course> getTeacherCourseByUsername(String username);


    @Insert("INSERT INTO course(cid,teacher_id,course_name) VALUES(#{cid},#{id}, #{course_name})")
    void createCourse(int id, int cid, String course_name);

    @Insert("INSERT INTO user_course(student_id,cid) VALUES(#{id}, #{cid})")
    void addCourse(int id, int cid);

    @Delete("Delete FROM user_course WHERE student_id = #{id} and cid = #{cid} ")
    void deleteCourse(int id, int cid);

    @Delete("Delete FROM course WHERE teacher_id = #{id} and cid = #{cid} ")
    void teacherDeleteCourse(int id, int cid);
}
