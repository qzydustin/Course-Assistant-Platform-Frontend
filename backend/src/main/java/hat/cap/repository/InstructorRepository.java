package hat.cap.repository;

import hat.cap.entity.Instructor;
import org.springframework.data.repository.CrudRepository;

public interface InstructorRepository extends CrudRepository<Instructor, Long> {
    Instructor findInstructorByEmail(String email);
}
