package com.qizhenyu.olmsbackend.service;

import com.qizhenyu.olmsbackend.dao.DiscussionMapper;
import com.qizhenyu.olmsbackend.model.Discussion;
import com.qizhenyu.olmsbackend.model.topic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiscussionService {
    @Autowired
    private DiscussionMapper discussionMapper;

    public int createTopic(String cid, String title, String content) {
        discussionMapper.createTopic(Integer.parseInt(cid), title, content);
        return 200;
    }

    public List<topic> getTopic(String cid) {
        List<topic> lists = discussionMapper.getTopic(Integer.parseInt(cid));
        for (int i = 0; i < lists.size(); i++) {
            int topicID = lists.get(i).getTid();
            lists.get(i).setDiscussion(getDiscussion(topicID));
        }
        return lists;
    }

    private List<Discussion> getDiscussion(int topicID) {
        return discussionMapper.getDiscussion(topicID);
    }

    public int addDiscussion(String tid, String uid, String message) {
        discussionMapper.addDiscussion(Integer.parseInt(tid), Integer.parseInt(uid), message);
        return 200;
    }
}
