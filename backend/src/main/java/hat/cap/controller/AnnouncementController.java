package hat.cap.controller;

import hat.cap.entityDatabase.Announcement;
import hat.cap.entityDatabase.Course;
import hat.cap.entityResult.Result;
import hat.cap.entityResult.ResultAnnouncement;
import hat.cap.service.AnnouncementService;
import hat.cap.service.CourseService;
import hat.cap.service.PermissionService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

import static hat.cap.entityResult.Code.*;

@RestController
public class AnnouncementController {

    @Resource
    private PermissionService permissionService;
    @Resource
    private CourseService courseService;
    @Resource
    private AnnouncementService announcementService;

    @PostMapping("/get-announcements")
    public Result<?> getPosts(@RequestBody Map<String, String> map) {
        String type = map.get("type");
        String email = map.get("email").toLowerCase();
        String password = map.get("password");
        Long courseID = Long.valueOf(map.get("courseID"));


        if (!permissionService.hasCoursePermission(type, email, password, courseID)) {
            return new Result<>(NO_PERMISSION);
        }

        Course course = courseService.getCourse(courseID);
        List<ResultAnnouncement> resultAnnouncements = announcementService.getAnnouncements(course);
        return new Result<>(SUCCESS, resultAnnouncements);
    }

    @PostMapping("/create-announcement")
    public Result<?> createAnnouncement(@RequestBody Map<String, String> map) {
        String type = map.get("type");
        String email = map.get("email").toLowerCase();
        String password = map.get("password");
        Long courseID = Long.valueOf(map.get("courseID"));
        String title = map.get("title");
        String content = map.get("content");

        if (!type.equals("instructor")) {
            return new Result<>(USER_TYPE_WRONG);
        }
        if (!permissionService.hasCoursePermission(type, email, password, courseID)) {
            return new Result<>(NO_PERMISSION);
        }
        if (title.isEmpty()) {
            return new Result<>(ANNOUNCEMENT_TITLE_IS_EMPTY);
        }
        Announcement announcement = new Announcement();
        announcement.setCourse(courseService.getCourse(courseID));
        announcement.setTitle(title);
        announcement.setContent(content);
        announcementService.createAnnouncement(announcement);
        return new Result<>(SUCCESS);
    }
}
