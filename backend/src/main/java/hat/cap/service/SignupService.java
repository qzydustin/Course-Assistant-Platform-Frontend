package hat.cap.service;

import hat.cap.repository.InstructorRepository;
import hat.cap.repository.StudentRepository;
import hat.cap.entity.Instructor;
import hat.cap.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignupService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private InstructorRepository instructorRepository;


    public int signup(String email, String username, String password, String type) {
        int state;
        if (type.equals("student")) {
            Student student = studentRepository.findByEmail(email);
            if (student != null) {
                state = 412;
            } else {
                student = new Student();
                student.setEmail(email);
                student.setUsername(username);
                student.setPassword(password);
                studentRepository.save(student);
                state = 200;
            }
        } else {
            Instructor instructor = instructorRepository.findByEmail(email);
            if (instructor != null) {
                state = 412;
            } else {
                instructor = new Instructor();
                instructor.setEmail(email);
                instructor.setUsername(username);
                instructor.setPassword(password);
                instructorRepository.save(instructor);
                state = 200;
            }
        }
        return state;
    }
}

