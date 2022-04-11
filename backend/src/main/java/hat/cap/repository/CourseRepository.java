package hat.cap.repository;

import hat.cap.entity.Course;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface CourseRepository extends CrudRepository<Course,Long> {
    List<Course> findByDepartmentAndSemester(String department, String Semester);
    List<Course> findByCodeAndSemester(String code, String Semester);
}
