package hat.cap.service;

import hat.cap.entity.Instructor;
import hat.cap.entity.ResultData;
import hat.cap.entity.Student;
import hat.cap.repository.InstructorRepository;
import hat.cap.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static hat.cap.entity.ResultDataCode.*;

@Service
public class LoginService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private InstructorRepository instructorRepository;


    public ResultData login(String email, String password, String type) {
        ResultData resultData;
        if (type.equals("student")) {
            Student student = studentRepository.findByEmail(email);
            if (student == null) {
                resultData = new ResultData<>(USER_NOT_EXIST, null);
            } else if (!student.getPassword().equals(password)) {
                resultData = new ResultData<>(USER_PASSWORD_WRONG, null);
            } else {
                resultData = new ResultData<>(SUCCESS, null);
            }
        } else {
            Instructor instructor = instructorRepository.findByEmail(email);
            if (instructor == null) {
                resultData = new ResultData<>(USER_NOT_EXIST, null);
            } else if (!instructor.getPassword().equals(password)) {
                resultData = new ResultData<>(USER_PASSWORD_WRONG, null);
            } else {
                resultData = new ResultData<>(SUCCESS, null);
            }
        }
        return resultData;
    }
}

