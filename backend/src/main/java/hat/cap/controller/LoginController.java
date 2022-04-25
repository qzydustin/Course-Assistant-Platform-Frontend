package hat.cap.controller;

import hat.cap.entityResult.Result;
import hat.cap.service.PermissionService;
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
    private PermissionService permissionService;


    @PostMapping("/login")
    public Result<?> login(@RequestBody Map<String, String> map) {
        String type = map.get("type");
        String email = map.get("email").toLowerCase();
        String password = map.get("password");

        if (!permissionService.hasPermission(type, email, password)) {
            return new Result<>(NO_PERMISSION);
        }
        return new Result<>(SUCCESS);
    }
}
