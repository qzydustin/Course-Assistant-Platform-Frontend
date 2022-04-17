package hat.cap.repository;

import hat.cap.entity.Course;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CourseRepository extends CrudRepository<Course, Long> {
    List<Course> findCoursesByDepartmentAndSemester(String department, String Semester);

    Course findCourseByCodeAndSemester(String code, String Semester);

}
