package hat.cap.repository;

import hat.cap.entityDatabase.Course;
import hat.cap.entityDatabase.Student;
import hat.cap.entityDatabase.StudentCourse;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface StudentCourseRepository extends CrudRepository<StudentCourse, Long> {
    int countByCourse(Course course);

    List<StudentCourse> findStudentCoursesByStudent(Student student);

    StudentCourse findStudentCourseByStudentAndCourse(Student student, Course course);

}

