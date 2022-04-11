package hat.cap.controller;

import hat.cap.entity.Course;
import hat.cap.entity.Instructor;
import hat.cap.entity.ResultData;
import hat.cap.service.CourseService;
import hat.cap.service.InstructorService;
import hat.cap.service.LoginService;
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
    @Autowired
    private InstructorService instructorService;


    @RequestMapping("/search-course")
    public ResultData searchCourse(@RequestBody Map<String, String> map) {
        ResultData resultData = loginService.login(map.get("email"), map.get("password"),map.get("type"));
        if (resultData.getCode() != SUCCESS.getCode()) {
            return new ResultData(NO_PERMISSION,null);
        }
        return courseService.searchByDepartmentAndSemester(map.get("department"),map.get("semester"));
    }

    @RequestMapping("/add-course")
    public ResultData addCourse(@RequestBody Map<String, String> map) {
        if(map.get("type").equals("student")){
            return new ResultData(NO_PERMISSION,null);
        }
        ResultData resultData = loginService.login( map.get("email"),  map.get("password"), map.get("type"));
        if (resultData.getCode() != SUCCESS.getCode()) {
            return new ResultData(NO_PERMISSION,null);
        }
        Course course = new Course();
        resultData = instructorService.searchByEmail( map.get("email"));
        if (resultData.getCode()==SUCCESS.getCode()){
            course.setInstructor((Instructor) resultData.getData());
            course.setCode( map.get("code"));
            course.setTitle( map.get("title"));
            course.setInformation( map.get("information"));
            course.setDepartment( map.get("department"));
            course.setSemester( map.get("semester"));
            course.setUnit(Integer.parseInt(map.get("unit")));
            course.setSeat(Integer.parseInt(map.get("seat")));
            return courseService.addCourse(course);
        }else{
            return new ResultData(COURSE_INSTRUCTOR_NOT_EXIST,null);
        }

    }

}
