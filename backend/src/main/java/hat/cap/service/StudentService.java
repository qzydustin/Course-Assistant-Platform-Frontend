package hat.cap.service;

import hat.cap.entityDatabase.Student;
import hat.cap.repository.StudentRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class StudentService {
    @Resource
    private StudentRepository studentRepository;

    public Student getStudent(String email, String password) {
        return studentRepository.findStudentByEmailAndPassword(email, password);
    }

    public Student getStudent(String email) {
        return studentRepository.findStudentByEmail(email);
    }

    public void createStudent(String email, String username, String password) {
        Student student = new Student(email, username, password);
        studentRepository.save(student);
    }

    public void updateUsername(String username,Long id) {
        studentRepository.updateUsernameById(username,id);
    }

    public void updatePassword(String password,Long id) {
        studentRepository.updatePasswordById(password,id);
    }
}
