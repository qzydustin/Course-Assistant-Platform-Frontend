package hat.cap.service;

import hat.cap.entity.Course;
import hat.cap.entity.ResultData;
import hat.cap.entity.Student;
import hat.cap.entity.StudentCourse;
import hat.cap.repository.CourseRepository;
import hat.cap.repository.StudentCourseRepository;
import hat.cap.repository.StudentRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

import static hat.cap.entity.ResultDataCode.*;

@Service
public class CourseService {
    @Resource
    private CourseRepository courseRepository;
    @Resource
    private StudentRepository studentRepository;
    @Resource
    private StudentCourseRepository studentCourseRepository;

    public ResultData<?> searchCoursesByDepartmentAndSemester(String department, String Semester) {
        ResultData<?> resultData;
        List<Course> courses = courseRepository.findCoursesByDepartmentAndSemester(department, Semester);
        if (courses.isEmpty()) {
            resultData = new ResultData<>(COURSE_NOT_FOUND, null);
        } else {
            for (Course course : courses) {
                course.getInstructor().setPassword("");
            }
            resultData = new ResultData<>(SUCCESS, courses);
        }
        return resultData;
    }

    public ResultData<?> addCourse(Course course) {
        ResultData<?> resultData;
        Course existCourse = courseRepository.findCourseByCodeAndSemester(course.getCode(), course.getSemester());
        if (existCourse == null) {
            courseRepository.save(course);
            resultData = new ResultData<>(SUCCESS, null);
        } else {
            resultData = new ResultData<>(COURSE_HAS_EXIST, null);
        }
        return resultData;
    }

    public ResultData<?> enrollCourseByStudent(String email, String code, String semester) {
        ResultData<?> resultData;
        Course course = courseRepository.findCourseByCodeAndSemester(code, semester);
        Student student = studentRepository.findStudentByEmail(email);
        StudentCourse student_course = new StudentCourse();
        student_course.setCourse(course);
        student_course.setStudent(student);
        int enrolled = studentCourseRepository.countByCourse(course);

        if (course.getSeat() - enrolled > 0) {
            studentCourseRepository.save(student_course);
            resultData = new ResultData<>(SUCCESS, null);
        } else {
            resultData = new ResultData<>(COURSE_IS_FULL, null);
        }
        return resultData;
    }

    public ResultData<?> enrollCourseByInstructor(String email, String code, String semester) {
        ResultData<?> resultData;
        Course course = courseRepository.findCourseByCodeAndSemester(code, semester);
        Student student = studentRepository.findStudentByEmail(email);
        StudentCourse student_course = new StudentCourse();
        student_course.setCourse(course);
        student_course.setStudent(student);
        studentCourseRepository.save(student_course);
        resultData = new ResultData<>(SUCCESS, null);
        return resultData;
    }
}
