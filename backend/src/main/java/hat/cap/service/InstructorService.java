package hat.cap.service;

import hat.cap.entityDatabase.Instructor;
import hat.cap.repository.InstructorRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class InstructorService {
    @Resource
    private InstructorRepository instructorRepository;


    public Instructor getInstructor(String email, String password) {
        Instructor instructor = instructorRepository.findInstructorByEmailAndPassword(email, password);
        return instructor;
    }

    public Instructor getInstructor(String email) {
        Instructor instructor = instructorRepository.findInstructorByEmail(email);
        return instructor;
    }

    public void createInstructor(String email, String username, String password) {
        Instructor instructor = new Instructor(email, username, password);
        instructorRepository.save(instructor);
    }

    public void updateUsername(String username,Long id) {
        instructorRepository.updateUsernameById(username,id);
    }

    public void updatePassword(String password,Long id) {
        instructorRepository.updatePasswordById(password,id);
    }
}
