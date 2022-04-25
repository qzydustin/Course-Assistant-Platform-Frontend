package hat.cap.repository;

import hat.cap.entityDatabase.Course;
import hat.cap.entityDatabase.Instructor;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CourseRepository extends CrudRepository<Course, Long> {
    List<Course> findCoursesByDepartmentAndSemester(String department, String Semester);

    Course findCourseByCodeAndSemester(String code, String Semester);

    List<Course> findCoursesByInstructor(Instructor instructor);

}
