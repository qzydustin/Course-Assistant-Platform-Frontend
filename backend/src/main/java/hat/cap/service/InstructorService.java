package hat.cap.service;

import hat.cap.entity.Instructor;
import hat.cap.entity.ResultData;
import hat.cap.repository.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import static hat.cap.entity.ResultDataCode.*;

@Service

public class InstructorService {
    @Autowired
    private InstructorRepository instructorRepository;

    public ResultData searchByUsername(String username){
        ResultData resultData;
        Instructor instructor = instructorRepository.findByUsername(username);
        if(instructor == null){
            resultData = new ResultData<>(USER_NOT_EXIST,null);
        }else {
            resultData = new ResultData<>(SUCCESS,instructor);
        }
        return resultData;
    }

    public ResultData searchByEmail(String email) {
        ResultData resultData;
        Instructor instructor = instructorRepository.findByEmail(email);
        if(instructor == null){
            resultData = new ResultData<>(USER_NOT_EXIST,null);
        }else {
            resultData = new ResultData<>(SUCCESS,instructor);
        }
        return resultData;
    }
}
