package hat.cap.service;

import hat.cap.entityDatabase.Assignment;
import hat.cap.entityDatabase.AssignmentSubmission;
import hat.cap.entityDatabase.Course;
import hat.cap.entityResult.ResultAssignment;
import hat.cap.entityResult.ResultAssignmentSubmission;
import hat.cap.repository.AssignmentRepository;
import hat.cap.repository.AssignmentSubmissionRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class AssignmentService {
    @Resource
    private AssignmentRepository assignmentRepository;
    @Resource
    private AssignmentSubmissionRepository assignmentSubmissionRepository;

    public List<ResultAssignment> getAssignments(Course course) {
        List<Assignment> Assignments = assignmentRepository.findAssignmentsByCourse(course);
        ArrayList<ResultAssignment> resultAssignments = new ArrayList<>();
        for (Assignment Assignment : Assignments) {
            resultAssignments.add(new ResultAssignment(Assignment));
        }
        return resultAssignments;
    }

    public void createAssignment(Assignment Assignment) {
        assignmentRepository.save(Assignment);
    }

    public Assignment getAssignment(Long id) {
        return assignmentRepository.findAssignmentById(id);
    }

    public List<ResultAssignmentSubmission> getSubmissions(Assignment Assignment) {
        List<AssignmentSubmission> AssignmentSubmissions = assignmentSubmissionRepository.findAssignmentSubmissionsByAssignment(Assignment);
        ArrayList<ResultAssignmentSubmission> resultAssignmentSubmissions = new ArrayList<>();
        for (AssignmentSubmission AssignmentSubmission : AssignmentSubmissions) {
            resultAssignmentSubmissions.add(new ResultAssignmentSubmission((AssignmentSubmission)));
        }
        return resultAssignmentSubmissions;
    }

    public void createAssignmentSubmission(AssignmentSubmission AssignmentSubmission) {
        assignmentSubmissionRepository.save(AssignmentSubmission);
    }

    public AssignmentSubmission getAssignmentSubmission(Long id){
        return assignmentSubmissionRepository.findAssignmentSubmissionById(id);
    }

    public void updateScore(Double score, Long id){
        assignmentSubmissionRepository.updateScoreById(score, id);
    }
}
