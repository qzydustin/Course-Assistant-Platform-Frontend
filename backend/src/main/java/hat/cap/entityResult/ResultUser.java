package hat.cap.entityResult;

import hat.cap.entityDatabase.Instructor;
import hat.cap.entityDatabase.Student;
import lombok.Data;

@Data
public class ResultUser {
    private Long id;
    private String type;
    private String username;

    public ResultUser(Student student) {
        id = student.getId();
        type = "student";
        username = student.getUsername();
    }

    public ResultUser(Instructor instructor) {
        id = instructor.getId();
        type = "instructor";
        username = instructor.getUsername();
    }

}
