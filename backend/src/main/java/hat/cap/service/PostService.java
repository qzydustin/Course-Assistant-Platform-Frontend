package hat.cap.service;


import hat.cap.entityDatabase.Course;
import hat.cap.entityDatabase.Post;
import hat.cap.entityDatabase.PostComment;
import hat.cap.entityResult.ResultPost;
import hat.cap.entityResult.ResultPostComment;
import hat.cap.repository.PostCommentRepository;
import hat.cap.repository.PostRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {
    @Resource
    private PostRepository postRepository;
    @Resource
    private PostCommentRepository postCommentRepository;

    public List<ResultPost> getPosts(Course course) {
        List<Post> posts = postRepository.findPostsByCourse(course);
        ArrayList<ResultPost> resultPosts = new ArrayList<>();
        for (Post post : posts) {
            resultPosts.add(new ResultPost(post));
        }
        return resultPosts;
    }

    public void createPost(Post post) {
        postRepository.save(post);
    }

    public Post getPost(Long id) {
        return postRepository.findPostById(id);
    }

    public List<ResultPostComment> getComments(Post post) {
        List<PostComment> postComments = postCommentRepository.findPostCommentsByPost(post);
        ArrayList<ResultPostComment> resultPostComments = new ArrayList<>();
        for (PostComment postComment : postComments) {
            resultPostComments.add(new ResultPostComment((postComment)));
        }
        return resultPostComments;
    }

    public void createPostComment(PostComment postComment) {
        postCommentRepository.save(postComment);
    }
}
