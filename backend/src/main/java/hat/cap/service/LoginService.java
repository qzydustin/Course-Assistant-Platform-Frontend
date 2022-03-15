package hat.cap.service;

import hat.cap.dao.InstructorMapper;
import hat.cap.dao.StudentMapper;
import hat.cap.model.Instructor;
import hat.cap.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    @Autowired
    private StudentMapper studentMapper;
    private InstructorMapper instructorMapper;


    public int login(String email,String password, String type) {
        int state;
        if (type.equals("student")) {
            Student student = studentMapper.getStudentByEmail(email);
            if (student != null && student.getPassword().equals(password)) {
                state = 200;
            } else {
                state = 400;
            }
        } else {
            Instructor instructor = instructorMapper.getInstructorByEmail(email);
            if (instructor != null && instructor.getPassword().equals(password)) {
                state = 200;
            } else {
                state = 400;
            }
        }
        return state;
    }
}

