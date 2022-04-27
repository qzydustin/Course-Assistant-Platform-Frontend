package hat.cap.repository;

import hat.cap.entityDatabase.Post;
import hat.cap.entityDatabase.PostComment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface PostCommentRepository extends CrudRepository<PostComment, Long> {
    List<PostComment> findPostCommentsByPost(Post post);
}
