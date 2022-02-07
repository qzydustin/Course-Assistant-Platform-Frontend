package com.qizhenyu.olmsbackend.dao;

import com.qizhenyu.olmsbackend.model.Discussion;
import com.qizhenyu.olmsbackend.model.topic;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface DiscussionMapper {

    @Insert("INSERT INTO topic(cid,title,content) VALUES(#{cid},#{title}, #{content})")
    void createTopic(int cid, String title, String content);

    @Insert("INSERT INTO discussion(tid,uid,message) VALUES(#{tid},#{uid}, #{message})")
    void addDiscussion(int tid, int uid, String message);

    @Select("select tid,title,content\n" +
            "from topic\n" +
            "where cid = #{cid}")
    @Results({
            @Result(property = "tid", column = "tid"),
            @Result(property = "title", column = "title"),
            @Result(property = "content", column = "content"),
    })
    List<topic> getTopic(int cid);

    @Select("select username, message\n" +
            "from discussion,\n" +
            "     user u\n" +
            "where discussion.uid = u.uid\n" +
            "  and tid = #{tid}")
    @Results({
            @Result(property = "username", column = "username"),
            @Result(property = "message", column = "message")

    })
    List<Discussion> getDiscussion(int tid);
}
