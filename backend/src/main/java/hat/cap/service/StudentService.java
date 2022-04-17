package hat.cap.service;

import hat.cap.entity.ResultData;
import hat.cap.entity.Student;
import hat.cap.repository.StudentRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

import static hat.cap.entity.ResultDataCode.*;

@Service
public class StudentService {
    @Resource
    private StudentRepository studentRepository;

    public ResultData<Student> login(String email, String password) {
        ResultData<Student> resultData;
        Student student = studentRepository.findStudentByEmail(email);
        if (student == null) {
            resultData = new ResultData<>(USER_NOT_EXIST, null);
        } else if (!student.getPassword().equals(password)) {
            resultData = new ResultData<>(USER_PASSWORD_WRONG, null);
        } else {
            resultData = new ResultData<>(SUCCESS, null);
        }
        return resultData;
    }

    public ResultData signup(String email, String username, String password) {
        ResultData resultData;
        Student student = studentRepository.findStudentByEmail(email);
        if (student != null) {
            resultData = new ResultData<>(USER_HAS_EXIST, null);
        } else {
            student = new Student();
            student.setEmail(email);
            student.setUsername(username);
            student.setPassword(password);
            studentRepository.save(student);
            resultData = new ResultData<>(SUCCESS, null);
        }
        return resultData;
    }
}
