package hat.cap.entityResult;

import hat.cap.entityDatabase.Instructor;
import hat.cap.entityDatabase.Student;
import lombok.Data;

@Data
public class ResultUser {
    private Long id;
    private String type;
    private String username;
    private String email;
    private String password;

    public ResultUser(Student student) {
        id = student.getId();
        type = "student";
        username = student.getUsername();
        email = student.getEmail();
        password = student.getPassword();
    }

    public ResultUser(Instructor instructor) {
        id = instructor.getId();
        type = "instructor";
        username = instructor.getUsername();
        email = instructor.getEmail();
        password = instructor.getPassword();
    }

}
