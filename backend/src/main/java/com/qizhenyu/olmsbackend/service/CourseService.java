package com.qizhenyu.olmsbackend.service;

import com.qizhenyu.olmsbackend.dao.CourseMapper;
import com.qizhenyu.olmsbackend.model.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    @Autowired
    private CourseMapper courseMapper;

    public List<Course> getCourseByUsername(String username, String auth) {
        if (auth.equals("0")) {
            return courseMapper.getTeacherCourseByUsername(username);
        } else {
            return courseMapper.getStudentCourseByUsername(username);
        }

    }

    public int createCourse(int ID, int cid, String course_name) {
        courseMapper.createCourse(ID, cid, course_name);
        return 200;
    }

    public int addCourse(int ID, int cid) {
        courseMapper.addCourse(ID, cid);
        return 200;
    }

    public int deleteCourse(String auth, int ID, int cid) {
        if (auth.equals("0")) {
            courseMapper.teacherDeleteCourse(ID, cid);
        } else {
            courseMapper.deleteCourse(ID, cid);
        }
        return 200;
    }

}
