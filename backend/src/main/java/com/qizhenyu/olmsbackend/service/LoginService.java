package com.qizhenyu.olmsbackend.service;

import com.qizhenyu.olmsbackend.dao.UserMapper;
import com.qizhenyu.olmsbackend.model.Login;
import com.qizhenyu.olmsbackend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    @Autowired
    private UserMapper userMapper;

    public Login login(String username, String password) {
        Login login = new Login();
        User user = userMapper.getUserByUsername(username);
        if (user == null) {
            login.setState(404);
        } else if (!user.getPassword().equals(password)) {
            login.setState(401);
        } else {
            login.setState(200);
            login.setId(user.getUid());
            login.setUsername(user.getUsername());
            login.setAuth(user.getAuth());
        }
        return login;
    }
}
