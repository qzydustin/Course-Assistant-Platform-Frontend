package hat.cap.service;

import hat.cap.entityDatabase.Course;
import hat.cap.entityDatabase.Assignment;
import hat.cap.entityDatabase.AssignmentSubmission;
import hat.cap.entityResult.ResultAssignment;
import hat.cap.entityResult.ResultAssignmentSubmission;
import hat.cap.repository.AssignmentSubmissionRepository;
import hat.cap.repository.AssignmentRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class AssignmentService {
    @Resource
    private AssignmentRepository AssignmentRepository;
    @Resource
    private AssignmentSubmissionRepository AssignmentSubmissionRepository;

    public List<ResultAssignment> getAssignments(Course course) {
        List<Assignment> Assignments = AssignmentRepository.findAssignmentsByCourse(course);
        ArrayList<ResultAssignment> resultAssignments = new ArrayList<>();
        for (Assignment Assignment : Assignments) {
            resultAssignments.add(new ResultAssignment(Assignment));
        }
        return resultAssignments;
    }

    public void createAssignment(Assignment Assignment) {
        AssignmentRepository.save(Assignment);
    }

    public Assignment getAssignment(Long id) {
        return AssignmentRepository.findAssignmentById(id);
    }

    public List<ResultAssignmentSubmission> getSubmissions(Assignment Assignment) {
        List<AssignmentSubmission> AssignmentSubmissions = AssignmentSubmissionRepository.findAssignmentSubmissionsByAssignment(Assignment);
        ArrayList<ResultAssignmentSubmission> resultAssignmentSubmissions = new ArrayList<>();
        for (AssignmentSubmission AssignmentSubmission : AssignmentSubmissions) {
            resultAssignmentSubmissions.add(new ResultAssignmentSubmission((AssignmentSubmission)));
        }
        return resultAssignmentSubmissions;
    }

    public void createAssignmentSubmission(AssignmentSubmission AssignmentSubmission) {
        AssignmentSubmissionRepository.save(AssignmentSubmission);
    }
}
