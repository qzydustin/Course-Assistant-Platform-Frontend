package hat.cap.dao;

import hat.cap.model.Instructor;
import org.springframework.data.repository.CrudRepository;

public interface InstructorRepository  extends CrudRepository<Instructor,Long> {
    Instructor findByEmail(String email);
}
