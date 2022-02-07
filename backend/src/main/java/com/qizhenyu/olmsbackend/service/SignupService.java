package com.qizhenyu.olmsbackend.service;

import com.qizhenyu.olmsbackend.dao.UserMapper;
import com.qizhenyu.olmsbackend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignupService {
    @Autowired
    private UserMapper userMapper;

    public int signup(String username, String password, int auth) {
        int state;
        User user = userMapper.getUserByUsername(username);
        if (user != null) {
            state = 412;
        } else {
            userMapper.insert(username, password, auth);
            state = 200;
        }

        return state;
    }
}
