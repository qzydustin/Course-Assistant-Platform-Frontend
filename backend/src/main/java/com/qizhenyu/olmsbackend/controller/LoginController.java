package com.qizhenyu.olmsbackend.controller;

import com.qizhenyu.olmsbackend.model.Login;
import com.qizhenyu.olmsbackend.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController

public class LoginController {

    @Autowired
    private LoginService loginService;

    @RequestMapping("/login")
    public Login login(@RequestBody Map<String, String> map) {
        return loginService.login(map.get("username"), map.get("password"));
    }
}
