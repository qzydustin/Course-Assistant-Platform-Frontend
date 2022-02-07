package com.qizhenyu.olmsbackend.dao;

import com.qizhenyu.olmsbackend.model.Information;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ResourceMapper {
    @Insert("INSERT INTO resource(cid,title,content) VALUES(#{cid}, #{title},#{content})")
    void addResource(int cid, String title, String content);

    @Insert("INSERT INTO resource(cid,title,content,file_path) VALUES(#{cid},#{title},#{content},#{file_path})")
    void addResourceFile(int cid, String title, String content, String file_path);


    @Select("select title,content\n" +
            "from resource\n" +
            "where cid = #{cid} and file_path IS NULL")
    @Results({
            @Result(property = "title", column = "title"),
            @Result(property = "content", column = "content"),
    })
    List<Information> getResourceInformation(int cid);

    @Select("select title,content,file_path\n" +
            "from resource\n" +
            "where cid = #{cid} and file_path IS NOT NULL")
    @Results({
            @Result(property = "title", column = "title"),
            @Result(property = "content", column = "content"),
            @Result(property = "file_path", column = "file_path"),
    })
    List<Information> getResourceData(int cid);
}
