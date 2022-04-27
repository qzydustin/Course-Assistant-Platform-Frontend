package hat.cap.repository;

import hat.cap.entityDatabase.Assignment;
import hat.cap.entityDatabase.Course;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface AssignmentRepository extends CrudRepository<Assignment, Long> {
    List<Assignment> findAssignmentsByCourse(Course course);

    Assignment findAssignmentById(Long id);
}
