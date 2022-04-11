package hat.cap.controller;

import hat.cap.entity.ResultData;
import hat.cap.service.SignupService;
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
    public Object signup(@RequestBody Map<String, String> map) {
        return signupService.signup(map.get("email"),map.get("username"),map.get("password"),map.get("type"));
    }

}