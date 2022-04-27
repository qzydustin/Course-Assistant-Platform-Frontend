package hat.cap.controller;

import hat.cap.entityDatabase.Post;
import hat.cap.entityDatabase.PostComment;
import hat.cap.entityResult.Result;
import hat.cap.entityResult.ResultPostComment;
import hat.cap.service.InstructorService;
import hat.cap.service.PermissionService;
import hat.cap.service.PostService;
import hat.cap.service.StudentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

import static hat.cap.entityResult.Code.*;

@RestController

public class PostCommentController {
    @Resource
    private PermissionService permissionService;

    @Resource
    private PostService postService;
    @Resource
    private StudentService studentService;
    @Resource
    private InstructorService instructorService;


    @PostMapping("/get-comments")
    public Result<?> getComments(@RequestBody Map<String, String> map) {
        String type = map.get("type");
        String email = map.get("email").toLowerCase();
        String password = map.get("password");
        Long courseID = Long.valueOf(map.get("courseID"));
        Long postID = Long.valueOf(map.get("postID"));


        if (!permissionService.hasCoursePermission(type, email, password, courseID)) {
            return new Result<>(NO_PERMISSION);
        }

        Post post = postService.getPost(postID);
        List<ResultPostComment> resultPostComments = postService.getComments(post);
        return new Result<>(SUCCESS, resultPostComments);
    }

    @PostMapping("/create-comment")
    public Result<?> createComment(@RequestBody Map<String, String> map) {
        String type = map.get("type");
        String email = map.get("email").toLowerCase();
        String password = map.get("password");
        Long courseID = Long.valueOf(map.get("courseID"));
        Long postID = Long.valueOf(map.get("postID"));
        String content = map.get("content");


        if (!permissionService.hasCoursePermission(type, email, password, courseID)) {
            return new Result<>(NO_PERMISSION);
        }
        Post post = postService.getPost(postID);
        if (post == null) {
            return new Result<>(POST_NOT_EXIST);
        }
        PostComment postComment = new PostComment();
        postComment.setContent(content);
        postComment.setPost(post);
        if (type.equals("student")) {
            postComment.setStudent(studentService.getStudent(email));
        } else {
            postComment.setInstructor(instructorService.getInstructor(email));
        }
        postService.createPostComment(postComment);
        return new Result<>(SUCCESS);
    }

}
