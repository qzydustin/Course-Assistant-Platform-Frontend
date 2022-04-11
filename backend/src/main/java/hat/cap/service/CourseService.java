package hat.cap.service;

import hat.cap.entity.Course;
import hat.cap.entity.ResultData;
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
            for (Course course:courses) {
                course.getInstructor().setPassword("");
            }
            resultData = new ResultData<>(SUCCESS,courses);
        }
        return resultData;
    }

    public ResultData addCourse(Course course) {
        ResultData resultData;
        List<Course> courses = courseRepository.findByCodeAndSemester(course.getCode(), course.getSemester());
        if(courses.isEmpty()){
            courseRepository.save(course);
            resultData = new ResultData<>(SUCCESS,null);
        }else {
            resultData = new ResultData<>(COURSE_HAS_EXIST,null);
        }
        return resultData;
    }
}
