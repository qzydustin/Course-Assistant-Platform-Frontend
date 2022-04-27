package hat.cap.controller;


import hat.cap.entityDatabase.Assignment;
import hat.cap.entityDatabase.Course;
import hat.cap.entityResult.Result;
import hat.cap.entityResult.ResultAssignment;
import hat.cap.service.AssignmentService;
import hat.cap.service.CourseService;
import hat.cap.service.PermissionService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import static hat.cap.entityResult.Code.*;

@RestController

public class AssignmentController {
    @Resource
    private PermissionService permissionService;
    @Resource
    private CourseService courseService;
    @Resource
    private AssignmentService AssignmentService;


    @PostMapping("/get-assignments")
    public Result<?> getAssignments(@RequestBody Map<String, String> map) {
        String type = map.get("type");
        String email = map.get("email").toLowerCase();
        String password = map.get("password");
        Long courseID = Long.valueOf(map.get("courseID"));


        if (!permissionService.hasCoursePermission(type, email, password, courseID)) {
            return new Result<>(NO_PERMISSION);
        }

        Course course = courseService.getCourse(courseID);
        List<ResultAssignment> resultAssignments = AssignmentService.getAssignments(course);
        return new Result<>(SUCCESS, resultAssignments);
    }

    @PostMapping("/create-assignment")
    public Result<?> createAssignment(@RequestBody Map<String, String> map) throws ParseException {
        String type = map.get("type");
        String email = map.get("email").toLowerCase();
        String password = map.get("password");
        Long courseID = Long.valueOf(map.get("courseID"));
        String title = map.get("title");
        String content = map.get("content");
        String filePath = map.get("filePath");
        Date startDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").parse(map.get("startDate"));
        Date endDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").parse(map.get("endDate"));


        if (!permissionService.hasCoursePermission(type, email, password, courseID)) {
            return new Result<>(NO_PERMISSION);
        }
        if (title.isEmpty()) {
            return new Result<>(ASSIGNMENT_TITLE_IS_EMPTY);
        }
        Assignment Assignment = new Assignment();
        Assignment.setCourse(courseService.getCourse(courseID));
        Assignment.setTitle(title);
        Assignment.setContent(content);
        Assignment.setFilePath(filePath);
        Assignment.setStartDate(startDate);
        Assignment.setEndDate(endDate);

        AssignmentService.createAssignment(Assignment);
        return new Result<>(SUCCESS);
    }

}
