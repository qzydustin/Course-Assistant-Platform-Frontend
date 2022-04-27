package hat.cap.entityResult;

import hat.cap.entityDatabase.Announcement;
import lombok.Data;

@Data
public class ResultAnnouncement {
    private long id;
    private String courseCode;
    private String title;
    private String content;

    public ResultAnnouncement(Announcement announcement) {
        id = announcement.getId();
        courseCode = announcement.getCourse().getCode();
        title = announcement.getTitle();
        content = announcement.getContent();
    }
}
