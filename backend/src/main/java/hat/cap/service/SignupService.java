package hat.cap.service;

import hat.cap.entity.ResultData;
import hat.cap.repository.InstructorRepository;
import hat.cap.repository.StudentRepository;
import hat.cap.entity.Instructor;
import hat.cap.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static hat.cap.entity.ResultDataCode.*;

@Service
public class SignupService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private InstructorRepository instructorRepository;


    public ResultData signup(String email, String username, String password, String type) {
        ResultData resultData;
        if (type.equals("student")) {
            Student student = studentRepository.findByEmail(email);
            if (student != null) {
                resultData = new ResultData<>(USER_HAS_EXIST,null);
            } else {
                student = new Student();
                student.setEmail(email);
                student.setUsername(username);
                student.setPassword(password);
                studentRepository.save(student);
                resultData = new ResultData<>(SUCCESS,null);
            }
        } else {
            Instructor instructor = instructorRepository.findByEmail(email);
            if (instructor != null) {
                resultData = new ResultData<>(USER_HAS_EXIST,null);
            } else {
                instructor = new Instructor();
                instructor.setEmail(email);
                instructor.setUsername(username);
                instructor.setPassword(password);
                instructorRepository.save(instructor);
                resultData = new ResultData<>(SUCCESS,null);
            }
        }
        return resultData;
    }
}

