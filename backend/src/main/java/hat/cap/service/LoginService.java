package hat.cap.service;

import hat.cap.dao.InstructorRepository;
import hat.cap.dao.StudentRepository;
import hat.cap.model.Instructor;
import hat.cap.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private InstructorRepository instructorRepository;


    public int login(String email,String password, String type) {
        int state;
        if (type.equals("student")) {
            Student student = studentRepository.findByEmail(email);
            if (student != null && student.getPassword().equals(password)) {
                state = 200;
            } else {
                state = 400;
            }
        } else {
            Instructor instructor = instructorRepository.findByEmail(email);
            if (instructor != null && instructor.getPassword().equals(password)) {
                state = 200;
            } else {
                state = 400;
            }
        }
        return state;
    }
}

