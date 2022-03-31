package hat.cap.service;

import hat.cap.repository.InstructorRepository;
import hat.cap.repository.StudentRepository;
import hat.cap.entity.Instructor;
import hat.cap.entity.Student;
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

