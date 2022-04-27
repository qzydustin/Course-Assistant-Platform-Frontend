package hat.cap.repository;

import hat.cap.entityDatabase.Assignment;
import hat.cap.entityDatabase.AssignmentSubmission;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentSubmissionRepository extends CrudRepository<AssignmentSubmission, Long> {
    List<AssignmentSubmission> findAssignmentSubmissionsByAssignment(Assignment assignment);
}
