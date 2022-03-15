package hat.cap.service;

import hat.cap.dao.InstructorMapper;
import hat.cap.dao.StudentMapper;
import hat.cap.model.Instructor;
import hat.cap.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignupService {
    @Autowired
    private StudentMapper studentMapper;
    private InstructorMapper instructorMapper;


    public int signup(String email, String username, String password, String type) {
        int state;
        if (type.equals("student")) {
            Student student = studentMapper.getStudentByEmail(email);
            if (student != null) {
                state = 412;
            } else {
                studentMapper.signUp(email, username, password);
                state = 200;
            }
        } else {
            Instructor instructor = instructorMapper.getInstructorByEmail(email);
            if (instructor != null) {
                state = 412;
            } else {
                instructorMapper.signUp(email, username, password);
                state = 200;
            }
        }
        return state;
    }
}

