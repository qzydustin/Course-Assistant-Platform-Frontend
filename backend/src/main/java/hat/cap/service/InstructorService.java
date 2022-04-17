package hat.cap.service;

import hat.cap.entity.Instructor;
import hat.cap.entity.ResultData;
import hat.cap.repository.InstructorRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

import static hat.cap.entity.ResultDataCode.*;

@Service
public class InstructorService {
    @Resource
    private InstructorRepository instructorRepository;

    public ResultData<?> login(String email, String password) {
        ResultData<?> resultData;
        Instructor instructor = instructorRepository.findInstructorByEmail(email);
        if (instructor == null) {
            resultData = new ResultData<>(USER_NOT_EXIST, null);
        } else if (!instructor.getPassword().equals(password)) {
            resultData = new ResultData<>(USER_PASSWORD_WRONG, null);
        } else {
            resultData = new ResultData<>(SUCCESS, null);
        }
        return resultData;
    }


    public ResultData<?> searchByI_email(String email) {
        ResultData<?> resultData;
        Instructor instructor = instructorRepository.findInstructorByEmail(email);
        if (instructor == null) {
            resultData = new ResultData<>(USER_NOT_EXIST, null);
        } else {
            resultData = new ResultData<>(SUCCESS, instructor);
        }
        return resultData;
    }

    public ResultData<?> signup(String email, String username, String password) {
        ResultData<?> resultData;
        Instructor instructor = instructorRepository.findInstructorByEmail(email);
        if (instructor != null) {
            resultData = new ResultData<>(USER_HAS_EXIST, null);
        } else {
            instructor = new Instructor();
            instructor.setEmail(email);
            instructor.setUsername(username);
            instructor.setPassword(password);
            instructorRepository.save(instructor);
            resultData = new ResultData<>(SUCCESS, null);
        }
        return resultData;
    }
}
