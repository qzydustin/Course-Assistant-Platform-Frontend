package hat.cap.controller;

import hat.cap.entityDatabase.Instructor;
import hat.cap.entityDatabase.Student;
import hat.cap.entityResult.Result;
import hat.cap.entityResult.ResultUser;
import hat.cap.service.InstructorService;
import hat.cap.service.PermissionService;
import hat.cap.service.StudentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;
import java.util.regex.Pattern;

import static hat.cap.entityResult.Code.*;

@RestController
public class UserController {
    @Resource
    private InstructorService instructorService;
    @Resource
    private StudentService studentService;
    @Resource
    private PermissionService permissionService;

    @PostMapping("/signup")
    public Result<?> signup(@RequestBody Map<String, String> map) {
        String type = map.get("type");
        String email = map.get("email").toLowerCase();
        String username = map.get("username");
        String password = map.get("password");

        if(email.equals("") || username.equals("") || password.equals("")){
            return new Result<>(INFORMATION_IS_EMPTY);
        }

        if(email.equals(password)){
            return new Result<>(PASSWORD_CAN_NOT_EQUAL_USERNAME);

        }

        // RFC 5322
        String regexPattern = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";
        boolean emailValidation = Pattern.compile(regexPattern).matcher(email).matches();
        if(!emailValidation){
            return new Result<>(EMAIL_IS_NOT_VALID);
        }
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
    @PostMapping("/update-password")
    public Result<?> updatePassword(@RequestBody Map<String, String> map) {
        String type = map.get("type");
        String email = map.get("email").toLowerCase();
        String password = map.get("password");
        String newPassword = map.get("newPassword");

        if (!permissionService.hasPermission(type, email, password)) {
            return new Result<>(NO_PERMISSION);
        }
        if (type.equals("student")) {
            Student student = studentService.getStudent(email);
            studentService.updatePassword(newPassword, student.getId());
            student.setPassword(newPassword);
            return new Result<>(SUCCESS,new ResultUser(student));
        } else if (type.equals("instructor")) {
            Instructor instructor = instructorService.getInstructor(email);
            instructorService.updatePassword(newPassword, instructor.getId());
            instructor.setPassword(newPassword);
            return new Result<>(SUCCESS,new ResultUser(instructor));
        } else {
            return new Result<>(USER_TYPE_WRONG);
        }
    }

    @PostMapping("/update-username")
    public Result<?> updateUsername(@RequestBody Map<String, String> map) {
        String type = map.get("type");
        String email = map.get("email").toLowerCase();
        String password = map.get("password");
        String newUsername = map.get("newUsername");

        if (!permissionService.hasPermission(type, email, password)) {
            return new Result<>(NO_PERMISSION);
        }
        if (type.equals("student")) {
            Student student = studentService.getStudent(email);
            studentService.updateUsername(newUsername, student.getId());
            student.setUsername(newUsername);

            return new Result<>(SUCCESS,new ResultUser(student));
        } else if (type.equals("instructor")) {
            Instructor instructor = instructorService.getInstructor(email);
            instructorService.updateUsername(newUsername, instructor.getId());
            instructor.setUsername(newUsername);

            return new Result<>(SUCCESS,new ResultUser(instructor));
        } else {
            return new Result<>(USER_TYPE_WRONG);
        }
    }
}