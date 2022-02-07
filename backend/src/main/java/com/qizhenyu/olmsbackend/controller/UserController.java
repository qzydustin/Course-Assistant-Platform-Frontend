package com.qizhenyu.olmsbackend.controller;

import com.qizhenyu.olmsbackend.model.User;
import com.qizhenyu.olmsbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @RequestMapping("/getUsersByCourse")
    public List<User> getUsersByCourse(int course_id) {
        return userService.getUsersByCourse(course_id);
    }

    @RequestMapping("/getUserByUsername")
    public User getUserByUsername(String username) {
        return userService.getUserByUsername(username);
    }

    @RequestMapping("/insert")
    public void insert(String username, String password, int auth) {
        userService.insert(username, password, auth);
    }

    @RequestMapping("/update")
    public void update(String username, String password, int auth) {
        userService.update(username, password, auth);
    }

    @RequestMapping("/delete")
    public void delete(String username) {
        userService.delete(username);
    }


}
