package hat.cap.controller;

import hat.cap.entityDatabase.Course;
import hat.cap.entityDatabase.Post;
import hat.cap.entityResult.Result;
import hat.cap.entityResult.ResultPost;
import hat.cap.service.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

import static hat.cap.entityResult.Code.*;

@RestController

public class PostController {
    @Resource
    private PermissionService permissionService;
    @Resource
    private CourseService courseService;
    @Resource
    private PostService postService;
    @Resource
    private StudentService studentService;
    @Resource
    private InstructorService instructorService;


    @PostMapping("/get-posts")
    public Result<?> getPosts(@RequestBody Map<String, String> map) {
        String type = map.get("type");
        String email = map.get("email").toLowerCase();
        String password = map.get("password");
        Long courseID = Long.valueOf(map.get("courseID"));


        if (!permissionService.hasCoursePermission(type, email, password, courseID)) {
            return new Result<>(NO_PERMISSION);
        }

        Course course = courseService.getCourse(courseID);
        List<ResultPost> resultPosts = postService.getPosts(course);
        return new Result<>(SUCCESS, resultPosts);
    }

    @PostMapping("/create-post")
    public Result<?> createPost(@RequestBody Map<String, String> map) {
        String type = map.get("type");
        String email = map.get("email").toLowerCase();
        String password = map.get("password");
        Long courseID = Long.valueOf(map.get("courseID"));
        String title = map.get("title");
        String content = map.get("content");


        if (!permissionService.hasCoursePermission(type, email, password, courseID)) {
            return new Result<>(NO_PERMISSION);
        }
        if (title.isEmpty()) {
            return new Result<>(POST_TITLE_IS_EMPTY);
        }
        Post post = new Post();
        post.setCourse(courseService.getCourse(courseID));
        post.setTitle(title);
        post.setContent(content);
        if (type.equals("student")) {
            post.setStudent(studentService.getStudent(email));
        } else {
            post.setInstructor(instructorService.getInstructor(email));
        }
        postService.createPost(post);
        return new Result<>(SUCCESS,new ResultPost(post));
    }

}
