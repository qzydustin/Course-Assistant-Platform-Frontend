package hat.cap.repository;

import hat.cap.entityDatabase.Announcement;
import hat.cap.entityDatabase.Course;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends CrudRepository<Announcement, Long> {
    List<Announcement> findAnnouncementsByCourse(Course course);

}
