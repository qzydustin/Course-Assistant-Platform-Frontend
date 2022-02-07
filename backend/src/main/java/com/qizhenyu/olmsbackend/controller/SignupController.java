package com.qizhenyu.olmsbackend.controller;

import com.qizhenyu.olmsbackend.service.SignupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class SignupController {
    @Autowired
    private SignupService signupService;

    @RequestMapping("/signup")
    public int signup(@RequestBody Map<String, Object> map) {
        return signupService.signup((String) map.get("username"), (String) map.get("password"), (int) map.get("auth"));
    }

}
