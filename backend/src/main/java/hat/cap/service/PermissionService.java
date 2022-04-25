package hat.cap.service;

import hat.cap.repository.InstructorRepository;
import hat.cap.repository.StudentRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class PermissionService {
    @Resource
    private InstructorRepository instructorRepository;
    @Resource
    private StudentRepository studentRepository;

    public Boolean hasPermission(String type, String email, String password) {
        Object user = null;
        if (type.equals("student")) {
            user = studentRepository.findStudentByEmailAndPassword(email, password);
        } else if (type.equals("instructor")) {
            user = instructorRepository.findInstructorByEmailAndPassword(email, password);
        }
        return user != null;
    }
}
