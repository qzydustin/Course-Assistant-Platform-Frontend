package com.qizhenyu.olmsbackend.controller;

import com.qizhenyu.olmsbackend.model.topic;
import com.qizhenyu.olmsbackend.service.DiscussionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DiscussionController {
    @Autowired
    private DiscussionService discussionService;

    @RequestMapping("/createTopic")
    public int createTopic(String course_id, String title, String content) {
        return discussionService.createTopic(course_id, title, content);
    }

    @RequestMapping("/getTopic")
    public List<topic> getTopic(String course_id) {
        return discussionService.getTopic(course_id);
    }

    @RequestMapping("/addDiscussion")
    public int addDiscussion(String topic_id, String user_id, String message) {
        return discussionService.addDiscussion(topic_id, user_id, message);
    }

}
