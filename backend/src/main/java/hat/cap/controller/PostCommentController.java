package hat.cap.controller;

import hat.cap.entityDatabase.Post;
import hat.cap.entityDatabase.PostComment;
import hat.cap.entityResult.Result;
import hat.cap.entityResult.ResultPostComment;
import hat.cap.service.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

import static hat.cap.resources.StateCode.NO_PERMISSION;
import static hat.cap.resources.StateCode.SUCCESS;

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
        PostComment postComment = new PostComment();
        postComment.setContext(content);
        postComment.setPost(postService.getPost(postID));
        if (type.equals("student")) {
            postComment.setStudent(studentService.getStudent(email));
        }else{
            postComment.setInstructor(instructorService.getInstructor(email));
        }
        postService.createPostComment(postComment);
        return new Result<>(SUCCESS);
    }

}
