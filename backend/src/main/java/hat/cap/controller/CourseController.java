package hat.cap.controller;

import hat.cap.entity.ResultData;
import hat.cap.service.CourseService;
import hat.cap.service.LoginService;
import hat.cap.service.SignupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import static hat.cap.entity.ResultDataCode.*;

@RestController
public class CourseController {
    @Autowired
    private CourseService courseService;
    @Autowired
    private LoginService loginService;


    @RequestMapping("/search-course")
    public ResultData course(@RequestBody Map<String, String> map) {
        ResultData resultData = loginService.login(map.get("email"), map.get("password"),map.get("type"));
        if (resultData.getCode()==1000){
            return courseService.searchByDepartmentAndSemester(map.get("department"),map.get("semester"));
        }else{
            return new ResultData(NO_PERMISSION,null);
        }
    }

}
