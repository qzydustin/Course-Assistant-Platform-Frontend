package hat.cap.controller;

import hat.cap.entity.ResultData;
import hat.cap.service.InstructorService;
import hat.cap.service.StudentService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;

import static hat.cap.entity.ResultDataCode.USER_TYPE_WRONG;

@RestController
public class SignupController {
    @Resource
    private InstructorService instructorService;
    @Resource
    private StudentService studentService;

    @RequestMapping("/signup")
    public ResultData<?> signup(@RequestBody Map<String, String> map) {
        if (map.get("type").equals("student")) {
            return studentService.signup(map.get("email"), map.get("username"), map.get("password"));
        } else if (map.get("type").equals("instructor")) {
            return instructorService.signup(map.get("email"), map.get("username"), map.get("password"));
        } else {
            return new ResultData<>(USER_TYPE_WRONG, null);
        }
    }

}