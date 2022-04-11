package hat.cap.service;

import hat.cap.entity.Course;
import hat.cap.entity.ResultData;
import hat.cap.entity.Student;
import hat.cap.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static hat.cap.entity.ResultDataCode.*;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    public ResultData searchByDepartmentAndSemester(String department, String Semester){
        ResultData resultData;
        List<Course> courses = courseRepository.findByDepartmentAndSemester(department, Semester);
        if(courses.isEmpty()){
            resultData = new ResultData<>(COURSE_NOT_FOUND,null);
        }else {
            resultData = new ResultData<>(SUCCESS,courses);
        }
        return resultData;
    }
}
