package com.qizhenyu.olmsbackend.dao;

import com.qizhenyu.olmsbackend.model.Work;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface WorkMapper {
    @Insert("INSERT INTO work(cid,work_title,work_content,isExam) VALUES(#{cid}, #{title},#{content},#{isExam})")
    void addWork(int cid, String title, String content, int isExam);

    @Update("UPDATE user_work SET score=#{score} WHERE  student_id = #{user_id} and work_id = #{work_id}")
    void addScore(int user_id, int work_id, int score);

    @Insert("INSERT INTO user_work(student_id,work_id,file_path) VALUES(#{user_id}, #{work_id},#{file_path})")
    void updateFilePath(int user_id, int work_id, String file_path);


    @Select("select work_title, score\n" +
            "from user_work,\n" +
            "     work,\n" +
            "     user_course\n" +
            "where user_work.student_id = user_course.student_id\n" +
            "  and work.work_id = user_work.work_id\n" +
            "  and user_course.cid = #{cid} \n" +
            "  and user_work.student_id = #{uid} ")
    @Results({
            @Result(property = "work_title", column = "work_title"),
            @Result(property = "score", column = "score"),
    })
    List<Work> getScore(int cid, int uid);

    @Select("select cid,work_title,work_content,isExam,work_id\n" +
            "from work\n" +
            "where cid = #{cid} and isExam = #{isExam}")
    @Results({
            @Result(property = "cid", column = "cid"),
            @Result(property = "work_title", column = "work_title"),
            @Result(property = "work_content", column = "work_content"),
            @Result(property = "isExam", column = "isExam"),
            @Result(property = "work_id", column = "work_id"),
    })
    List<Work> getWork(int cid, int isExam);


}
