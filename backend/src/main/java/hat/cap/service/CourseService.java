package hat.cap.service;

import hat.cap.entityDatabase.Course;
import hat.cap.entityDatabase.Instructor;
import hat.cap.entityDatabase.Student;
import hat.cap.entityDatabase.StudentCourse;
import hat.cap.entityResult.ResultCourse;
import hat.cap.repository.CourseRepository;
import hat.cap.repository.StudentCourseRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class CourseService {
    @Resource
    private CourseRepository courseRepository;
    @Resource
    private StudentCourseRepository studentCourseRepository;

    public List<Course> getCourses(String department, String Semester) {
        return courseRepository.findCoursesByDepartmentAndSemester(department, Semester);
    }

    public void createCourse(Course course) {
        courseRepository.save(course);
    }

    public void dropCourse(Course course, Student student) {
        studentCourseRepository.deleteByStudentAndCourse(student,course);
    }

    public ArrayList<ResultCourse> getEnrolledCourses(Student student) {
        List<StudentCourse> studentCourses = studentCourseRepository.findStudentCoursesByStudent(student);
        ArrayList<ResultCourse> resultCourses = new ArrayList<>();
        for (StudentCourse studentCourse : studentCourses) {
            resultCourses.add(new ResultCourse(studentCourse.getCourse()));
        }
        return resultCourses;
    }

    public ArrayList<ResultCourse> getEnrolledCourses(Instructor instructor) {
        List<Course> courses = courseRepository.findCoursesByInstructor(instructor);
        ArrayList<ResultCourse> resultCourses = new ArrayList<>();
        for (Course course : courses) {
            resultCourses.add(new ResultCourse(course));
        }
        return resultCourses;
    }

    public Course getCourse(String code, String semester) {
        return courseRepository.findCourseByCodeAndSemester(code, semester);
    }

    public int getCourseEnrolledStudentNumber(Course course) {
        return studentCourseRepository.countByCourse(course);
    }

    public void enrollCourse(Student student, Course course) {
        StudentCourse student_course = new StudentCourse();
        student_course.setCourse(course);
        student_course.setStudent(student);
        studentCourseRepository.save(student_course);
    }


    public boolean hasEnrolledCourse(Student student, Course course) {
        return studentCourseRepository.findStudentCourseByStudentAndCourse(student, course) != null;
    }

    public Course getCourse(Long id) {
        return courseRepository.findCourseById(id);
    }
}
