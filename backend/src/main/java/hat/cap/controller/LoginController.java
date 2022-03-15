package hat.cap.controller;

import hat.cap.service.LoginService;
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
    public int login(@RequestBody Map<String, String> map) {
        return loginService.login(map.get("email"), map.get("password"),map.get("type"));
    }
}
