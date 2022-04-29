package hat.cap.entityResult;

import hat.cap.entityDatabase.PostComment;
import lombok.Data;


@Data
public class ResultPostComment {
    private long id;
    private String postTitle;
    private String content;
    private String commenterName;

    public ResultPostComment(PostComment postComment) {
        id = postComment.getId();
        postTitle = postComment.getPost().getTitle();
        content = postComment.getContent();
        if (postComment.getStudent() != null) {
            commenterName = postComment.getStudent().getUsername();
        } else {
            commenterName = postComment.getInstructor().getUsername();
        }
    }
}
