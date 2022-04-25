package hat.cap.controller;

import hat.cap.entityResult.ResultData;
import hat.cap.service.InstructorService;
import hat.cap.service.PermissionService;
import hat.cap.service.StudentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;

import static hat.cap.resources.StateCode.NO_PERMISSION;
import static hat.cap.resources.StateCode.SUCCESS;

@RestController
public class LoginController {

    @Resource
    private InstructorService instructorService;
    @Resource
    private StudentService studentService;

    @Resource
    private PermissionService permissionService;


    @PostMapping("/login")
    public ResultData<?> login(@RequestBody Map<String, String> map) {
        String type = map.get("type");
        String email = map.get("email");
        String password = map.get("password");

        if (!permissionService.hasPermission(type, email, password)) {
            return new ResultData<>(NO_PERMISSION);
        }
        return new ResultData<>(SUCCESS);
    }
}
