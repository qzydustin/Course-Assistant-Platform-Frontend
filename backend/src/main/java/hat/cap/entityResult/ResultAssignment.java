package hat.cap.entityResult;

import hat.cap.entityDatabase.Assignment;
import lombok.Data;

import java.util.Date;

@Data
public class ResultAssignment {
    private long id;
    private String courseCode;
    private String title;
    private String content;
    private String filePath;
    private Date startDate;
    private Date endDate;

    public ResultAssignment(Assignment assignment) {
        id = assignment.getId();
        courseCode = assignment.getCourse().getCode();
        title = assignment.getTitle();
        content = assignment.getContent();
        filePath = assignment.getFilePath();
        startDate = assignment.getStartDate();
        endDate = assignment.getEndDate();
    }
}
