package hat.cap.controller;

import hat.cap.entityDatabase.Course;
import hat.cap.entityDatabase.Instructor;
import hat.cap.entityDatabase.Student;
import hat.cap.entityResult.ResultCourse;
import hat.cap.entityResult.ResultData;
import hat.cap.service.CourseService;
import hat.cap.service.InstructorService;
import hat.cap.service.PermissionService;
import hat.cap.service.StudentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static hat.cap.resources.StateCode.*;

@RestController
public class CourseController {
    @Resource
    private CourseService courseService;
    @Resource
    private InstructorService instructorService;
    @Resource
    private StudentService studentService;
    @Resource
    private PermissionService permissionService;


    @PostMapping("/get-courses")
    public ResultData<?> getCourses(@RequestBody Map<String, String> map) {
        String type = map.get("type");
        String email = map.get("email").toLowerCase();
        String password = map.get("password");
        String department = map.get("department");
        String semester = map.get("semester");

        if (!permissionService.hasPermission(type, email, password)) {
            return new ResultData<>(NO_PERMISSION);
        }
        List<Course> courses = courseService.getCourses(department, semester);
        ArrayList<ResultCourse> resultCourses = new ArrayList<>();
        for (Course course : courses) {
            resultCourses.add(new ResultCourse(course));
        }
        return new ResultData<>(SUCCESS, resultCourses);
    }

    @PostMapping("/create-course")
    public ResultData<?> createCourse(@RequestBody Map<String, String> map) {
        String type = map.get("type");
        String email = map.get("email").toLowerCase();
        String password = map.get("password");
        String code = map.get("code");
        String title = map.get("title");
        String information = map.get("information");
        String department = map.get("department");
        String semester = map.get("semester");
        String unit = map.get("unit");
        String seat = map.get("seat");

        if (!type.equals("instructor")) {
            return new ResultData<>(USER_TYPE_WRONG);
        }
        Instructor instructor = instructorService.getInstructor(email, password);
        if (instructor == null) {
            return new ResultData<>(COURSE_INSTRUCTOR_NOT_EXIST);
        }
        if (courseService.getCourse(code, semester) != null) {
            return new ResultData<>(COURSE_HAS_EXIST);
        }
        Course course = new Course();
        course.setInstructor(instructor);
        course.setCode(code);
        course.setTitle(title);
        course.setInformation(information);
        course.setDepartment(department);
        course.setSemester(semester);
        course.setUnit(Integer.parseInt(unit));
        course.setSeat(Integer.parseInt(seat));
        courseService.createCourse(course);
        return new ResultData<>(SUCCESS);

    }


    @PostMapping("/get-course-enrolled-student-number")
    public ResultData<?> getCourseEnrolledStudentNumber(@RequestBody Map<String, String> map) {
        String type = map.get("type");
        String email = map.get("email").toLowerCase();
        String password = map.get("password");
        String code = map.get("code");
        String semester = map.get("semester");

        if (!permissionService.hasPermission(type, email, password)) {
            return new ResultData<>(NO_PERMISSION);
        }
        Course course = courseService.getCourse(code, semester);
        if (course == null) {
            return new ResultData<>(COURSE_NOT_FOUND);
        }
        int courseEnrolledStudentNumber = courseService.getCourseEnrolledStudentNumber(course);

        return new ResultData<>(SUCCESS, courseEnrolledStudentNumber);
    }


    @PostMapping("/enroll-course")
    public ResultData<?> enrollCourse(@RequestBody Map<String, String> map) {
        String type = map.get("type");
        String email = map.get("email").toLowerCase();
        String password = map.get("password");
        String code = map.get("code");
        String semester = map.get("semester");
        String studentEmail;
        if (type.equals("student")) {
            studentEmail = email;
        } else {
            studentEmail = map.get("student_email");
        }

        if (!permissionService.hasPermission(type, email, password)) {
            return new ResultData<>(NO_PERMISSION);
        }
        Student student = studentService.getStudent(studentEmail);
        if (student == null) {
            return new ResultData<>(USER_NOT_EXIST);
        }
        Course course = courseService.getCourse(code, semester);
        if (course == null) {
            return new ResultData<>(COURSE_NOT_FOUND);
        }
        if (courseService.hasEnrolledCourse(student, course)) {
            return new ResultData<>(COURSE_HAS_BEEN_ENROLLED);
        }
        // instructor type branch
        if (type.equals("instructor")) {
            courseService.enrollCourse(student, course);
            return new ResultData<>(SUCCESS);
        }
        // student type branch
        int courseEnrolledStudentNumber = courseService.getCourseEnrolledStudentNumber(course);
        if (course.getSeat() - courseEnrolledStudentNumber > 0) {
            courseService.enrollCourse(student, course);
            return new ResultData<>(SUCCESS);
        }
        return new ResultData<>(COURSE_IS_FULL);
    }

    @PostMapping("/get-enrolled-courses")
    public ResultData<?> getEnrolledCourses(@RequestBody Map<String, String> map) {
        String type = map.get("type");
        String email = map.get("email").toLowerCase();
        String password = map.get("password");

        if (!permissionService.hasPermission(type, email, password)) {
            return new ResultData<>(NO_PERMISSION);
        }
        if (type.equals("student")) {
            Student student = studentService.getStudent(email, password);
            ArrayList<ResultCourse> resultCourses = courseService.getEnrolledCourses(student);
            return new ResultData<>(SUCCESS, resultCourses);
        }
        if (type.equals("instructor")) {
            Instructor instructor = instructorService.getInstructor(email, password);
            ArrayList<ResultCourse> resultCourses = courseService.getEnrolledCourses(instructor);
            return new ResultData<>(SUCCESS, resultCourses);
        }
        return new ResultData<>(USER_TYPE_WRONG);
    }
}
