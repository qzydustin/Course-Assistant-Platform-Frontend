package hat.cap.repository;

import hat.cap.entityDatabase.Course;
import hat.cap.entityDatabase.Student;
import hat.cap.entityDatabase.StudentCourse;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface StudentCourseRepository extends CrudRepository<StudentCourse, Long> {
    int countByCourse(Course course);

    List<StudentCourse> findStudentCoursesByStudent(Student student);

    StudentCourse findStudentCourseByStudentAndCourse(Student student, Course course);

    @Transactional
    void deleteByStudentAndCourse(Student student, Course course);

}

