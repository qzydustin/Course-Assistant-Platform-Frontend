package hat.cap.entityResult;

import hat.cap.entityDatabase.PostComment;
import lombok.Data;


@Data
public class ResultPostComment {
    private long id;
    private String postTitle;
    private String content;
    private String studentName;
    private String instructorName;

    public ResultPostComment(PostComment postComment) {
        id = postComment.getId();
        postTitle = postComment.getPost().getTitle();
        content = postComment.getContent();
        if (postComment.getStudent() != null) {
            studentName = postComment.getStudent().getUsername();
        } else {
            instructorName = postComment.getInstructor().getUsername();
        }
    }
}
