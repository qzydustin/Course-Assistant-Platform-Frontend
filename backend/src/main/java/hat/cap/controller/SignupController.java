package hat.cap.controller;

import hat.cap.entityDatabase.Instructor;
import hat.cap.entityDatabase.Student;
import hat.cap.entityResult.Result;
import hat.cap.service.InstructorService;
import hat.cap.service.StudentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;

import static hat.cap.resources.StateCode.*;

@RestController
public class SignupController {
    @Resource
    private InstructorService instructorService;
    @Resource
    private StudentService studentService;

    @PostMapping("/signup")
    public Result<?> signup(@RequestBody Map<String, String> map) {
        String type = map.get("type");
        String email = map.get("email").toLowerCase();
        String username = map.get("username");
        String password = map.get("password");

        if (type.equals("student")) {
            Student student = studentService.getStudent(email);
            if (student != null) {
                return new Result<>(USER_HAS_EXIST);
            }
            studentService.createStudent(email, username, password);
            return new Result<>(SUCCESS);
        } else if (type.equals("instructor")) {
            Instructor instructor = instructorService.getInstructor(email);
            if (instructor != null) {
                return new Result<>(USER_HAS_EXIST);
            }
            instructorService.createInstructor(email, username, password);
            return new Result<>(SUCCESS);
        } else {
            return new Result<>(USER_TYPE_WRONG);
        }
    }

}