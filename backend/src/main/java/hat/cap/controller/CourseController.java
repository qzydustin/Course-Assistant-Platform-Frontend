package hat.cap.controller;

import hat.cap.entity.Course;
import hat.cap.entity.Instructor;
import hat.cap.entity.ResultData;
import hat.cap.service.CourseService;
import hat.cap.service.InstructorService;
import hat.cap.service.StudentService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;

import static hat.cap.entity.ResultDataCode.*;

@RestController
public class CourseController {
    @Resource
    private CourseService courseService;
    @Resource
    private InstructorService instructorService;

    @Resource
    private StudentService studentService;


    @RequestMapping("/search-course")
    public ResultData<?> searchCourse(@RequestBody Map<String, String> map) {
        ResultData<?> userData;
        if (map.get("type").equals("student")) {
            userData = studentService.login(map.get("email"), map.get("password"));
        } else if (map.get("type").equals("instructor")) {
            userData = instructorService.login(map.get("email"), map.get("password"));
        } else {
            return new ResultData<>(USER_TYPE_WRONG, null);
        }
        if (userData.getCode() != SUCCESS.getCode()) {
            return new ResultData<>(NO_PERMISSION, null);
        }
        return courseService.searchCoursesByDepartmentAndSemester(map.get("department"), map.get("semester"));
    }

    @RequestMapping("/add-course")
    public ResultData<?> addCourse(@RequestBody Map<String, String> map) {
        ResultData<?> resultData;
        if (!map.get("type").equals("instructor")) {
            return new ResultData<>(NO_PERMISSION, null);
        } else {
            resultData = instructorService.login(map.get("email"), map.get("password"));
            if (resultData.getCode() != SUCCESS.getCode()) {
                return new ResultData<>(NO_PERMISSION, null);
            }
        }
        Course course = new Course();
        resultData = instructorService.searchByI_email(map.get("email"));
        if (resultData.getCode() == SUCCESS.getCode()) {
            course.setInstructor((Instructor) resultData.getData());
            course.setCode(map.get("code"));
            course.setTitle(map.get("title"));
            course.setInformation(map.get("information"));
            course.setDepartment(map.get("department"));
            course.setSemester(map.get("semester"));
            course.setUnit(Integer.parseInt(map.get("unit")));
            course.setSeat(Integer.parseInt(map.get("seat")));
            return courseService.addCourse(course);
        } else {
            return new ResultData<>(COURSE_INSTRUCTOR_NOT_EXIST, null);
        }

    }

    @RequestMapping("/enroll-course-by-student")
    public ResultData<?> enrollCourseByStudent(@RequestBody Map<String, String> map) {
        if (!map.get("type").equals("student")) {
            return new ResultData<>(USER_TYPE_WRONG, null);
        }
        ResultData<?> resultData = studentService.login(map.get("email"), map.get("password"));
        if (resultData.getCode() != SUCCESS.getCode()) {
            return new ResultData<>(NO_PERMISSION, null);
        }
        return courseService.enrollCourseByStudent(map.get("email"), map.get("code"), map.get("semester"));
    }

    @RequestMapping("/enroll-course-by-instructor")
    public ResultData<?> enrollCourseByInstructor(@RequestBody Map<String, String> map) {
        if (!map.get("type").equals("instructor")) {
            return new ResultData<>(USER_TYPE_WRONG, null);
        }
        ResultData<?> resultData = instructorService.login(map.get("email"), map.get("password"));
        if (resultData.getCode() != SUCCESS.getCode()) {
            return new ResultData<>(NO_PERMISSION, null);
        }
        return courseService.enrollCourseByInstructor(map.get("student_email"), map.get("code"), map.get("semester"));
    }


}
