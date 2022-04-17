package hat.cap.repository;

import hat.cap.entity.Course;
import hat.cap.entity.StudentCourse;
import org.springframework.data.repository.CrudRepository;

public interface StudentCourseRepository extends CrudRepository<StudentCourse, Long> {
    int countByCourse(Course course);

}

