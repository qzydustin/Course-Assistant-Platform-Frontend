package com.qizhenyu.olmsbackend.controller;

import com.qizhenyu.olmsbackend.model.Course;
import com.qizhenyu.olmsbackend.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CourseController {
    @Autowired
    private CourseService courseService;

    @RequestMapping("/getCourseByUsername")
    public List<Course> getCourseByUsername(String username, String auth) {
        return courseService.getCourseByUsername(username, auth);
    }

    @RequestMapping("/createCourse")
    public int createCourse(String ID, String cid, String course_name) {
        return courseService.createCourse(Integer.parseInt(ID), Integer.parseInt(cid), course_name);
    }

    @RequestMapping("/addCourse")
    public int addCourse(String ID, String cid) {
        return courseService.addCourse(Integer.parseInt(ID), Integer.parseInt(cid));
    }

    @RequestMapping("/deleteCourse")
    public int deleteCourse(String Auth, String ID, String cid) {
        return courseService.deleteCourse(Auth, Integer.parseInt(ID), Integer.parseInt(cid));
    }

}
