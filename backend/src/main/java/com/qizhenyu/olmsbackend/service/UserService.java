package com.qizhenyu.olmsbackend.service;


import com.qizhenyu.olmsbackend.dao.UserMapper;
import com.qizhenyu.olmsbackend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;


@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;

    public List<User> getAllUsers() {
        return userMapper.getAllUsers();
    }

    public List<User> getUsersByCourse(int cid) {
        return userMapper.getUsersByCourse(cid);
    }

    public User getUserByUsername(String username) {
        return userMapper.getUserByUsername(username);
    }

    public void insert(String username, String password, int auth) {
        userMapper.insert(username, password, auth);
    }

    public void update(String username, String password, int auth) {
        userMapper.update(username, password, auth);
    }

    public void delete(@PathVariable("username") String username) {
        userMapper.delete(username);
    }

}
