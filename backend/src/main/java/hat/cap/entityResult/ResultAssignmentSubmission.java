package hat.cap.entityResult;

import hat.cap.entityDatabase.AssignmentSubmission;
import lombok.Data;

import java.util.Date;

@Data
public class ResultAssignmentSubmission {
    private long id;
    private String assignmentTitle;
    private String content;
    private String filePath;
    private Date submitDate;

    public ResultAssignmentSubmission(AssignmentSubmission assignmentSubmission) {
        id = assignmentSubmission.getId();
        assignmentTitle = assignmentSubmission.getAssignment().getTitle();
        content = assignmentSubmission.getContent();
        filePath = assignmentSubmission.getFilePath();
        submitDate = assignmentSubmission.getSubmitDate();
    }
}
