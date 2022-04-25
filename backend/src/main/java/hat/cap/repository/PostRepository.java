package hat.cap.repository;

import hat.cap.entityDatabase.Course;
import hat.cap.entityDatabase.Post;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface PostRepository extends CrudRepository<Post, Long> {
    List<Post> findPostsByCourse(Course course);

    Post findPostById(Long id);
}
