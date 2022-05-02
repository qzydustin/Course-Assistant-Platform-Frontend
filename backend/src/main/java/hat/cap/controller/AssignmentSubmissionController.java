package hat.cap.controller;

import hat.cap.entityDatabase.Assignment;
import hat.cap.entityDatabase.AssignmentSubmission;
import hat.cap.entityDatabase.Student;
import hat.cap.entityResult.Result;
import hat.cap.entityResult.ResultAssignmentSubmission;
import hat.cap.service.AssignmentService;
import hat.cap.service.PermissionService;
import hat.cap.service.StudentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import static hat.cap.entityResult.Code.*;

@RestController
public class AssignmentSubmissionController {
    @Resource
    private PermissionService permissionService;

    @Resource
    private AssignmentService assignmentService;

    @Resource
    private StudentService studentService;


    @PostMapping("/get-assignment-submissions")
    public Result<?> getAssignmentSubmissions(@RequestBody Map<String, String> map) {
        String type = map.get("type");
        String email = map.get("email").toLowerCase();
        String password = map.get("password");
        Long courseID = Long.valueOf(map.get("courseID"));
        Long assignmentID = Long.valueOf(map.get("assignmentID"));

        if(!type.equals("instructor")){
            return new Result<>(USER_TYPE_WRONG);
        }

        if (!permissionService.hasCoursePermission(type, email, password, courseID)) {
            return new Result<>(NO_PERMISSION);
        }

        Assignment assignment = assignmentService.getAssignment(assignmentID);
        List<ResultAssignmentSubmission> resultPostAssignmentSubmission = assignmentService.getSubmissions(assignment);
        return new Result<>(SUCCESS, resultPostAssignmentSubmission);
    }

    @PostMapping("/create-assignment-submission")
    public Result<?> createAssignmentSubmission(@RequestBody Map<String, String> map) throws ParseException {
        String type = map.get("type");
        String email = map.get("email").toLowerCase();
        String password = map.get("password");
        Long courseID = Long.valueOf(map.get("courseID"));
        Long assignmentID = Long.valueOf(map.get("assignmentID"));
        String content = map.get("content");
        String filePath = map.get("filePath");
        Date submitDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").parse(map.get("submitDate"));


        if (!permissionService.hasCoursePermission(type, email, password, courseID)) {
            return new Result<>(NO_PERMISSION);
        }
        Assignment assignment = assignmentService.getAssignment(assignmentID);
        if (assignment == null) {
            return new Result<>(ASSIGNMENT_NOT_EXIST);
        }
        Student student = studentService.getStudent("email");
        AssignmentSubmission assignmentSubmission = new AssignmentSubmission();
        assignmentSubmission.setStudent(student);
        assignmentSubmission.setAssignment(assignment);
        assignmentSubmission.setContent(content);
        assignmentSubmission.setFilePath(filePath);
        assignmentSubmission.setSubmitDate(submitDate);

        assignmentService.createAssignmentSubmission(assignmentSubmission);
        return new Result<>(SUCCESS);
    }

    @PostMapping("/set-assignment-submission-score")
    public Result<?> setAssignmentSubmissionScore(@RequestBody Map<String, String> map){
        String type = map.get("type");
        String email = map.get("email").toLowerCase();
        String password = map.get("password");
        Long courseID = Long.valueOf(map.get("courseID"));
        Long assignmentSubmissionID = Long.valueOf(map.get("assignmentSubmissionID"));
        Double score = Double.valueOf(map.get("score"));


        if(!type.equals("instructor")){
            return new Result<>(USER_TYPE_WRONG);
        }
        if (!permissionService.hasCoursePermission(type, email, password, courseID)) {
            return new Result<>(NO_PERMISSION);
        }
        assignmentService.updateScore(score,assignmentSubmissionID);
        AssignmentSubmission assignmentSubmission = assignmentService.getAssignmentSubmission(assignmentSubmissionID);

        return new Result<>(SUCCESS,new ResultAssignmentSubmission(assignmentSubmission));
    }

    @PostMapping("/get-assignment-submission-score")
    public Result<?> getAssignmentSubmissionScore(@RequestBody Map<String, String> map){
        String type = map.get("type");
        String email = map.get("email").toLowerCase();
        String password = map.get("password");
        Long courseID = Long.valueOf(map.get("courseID"));
        Long assignmentSubmissionID = Long.valueOf(map.get("assignmentSubmissionID"));

        if (!permissionService.hasCoursePermission(type, email, password, courseID)) {
            return new Result<>(NO_PERMISSION);
        }
        AssignmentSubmission assignmentSubmission= assignmentService.getAssignmentSubmission(assignmentSubmissionID);

        return new Result<>(SUCCESS,new ResultAssignmentSubmission(assignmentSubmission));

    }



}
