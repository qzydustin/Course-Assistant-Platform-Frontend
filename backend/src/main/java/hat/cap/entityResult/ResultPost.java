package hat.cap.entityResult;


import hat.cap.entityDatabase.Post;
import lombok.Data;


@Data
public class ResultPost {
    private long id;
    private String courseCode;
    private String title;
    private String content;
    private String postName;

    public ResultPost(Post post) {
        id = post.getId();
        courseCode = post.getCourse().getCode();
        title = post.getTitle();
        content = post.getContent();
        if (post.getStudent() != null) {
            postName = post.getStudent().getUsername();
        } else {
            postName = post.getInstructor().getUsername();
        }
    }
}
