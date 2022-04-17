package hat.cap.controller;

import hat.cap.entity.ResultData;
import hat.cap.service.InstructorService;
import hat.cap.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;

import static hat.cap.entity.ResultDataCode.USER_TYPE_WRONG;

@RestController
public class LoginController {

    @Autowired
    private InstructorService instructorService;
    @Autowired
    private StudentService studentService;


    @RequestMapping("/login")
    public ResultData<?> login(@RequestBody Map<String, String> map) {
        if (map.get("type").equals("student")) {
            return studentService.login(map.get("email"), map.get("password"));
        } else if (map.get("type").equals("instructor")) {
            return instructorService.login(map.get("email"), map.get("password"));
        } else {
            return new ResultData<>(USER_TYPE_WRONG, null);
        }
    }
}
