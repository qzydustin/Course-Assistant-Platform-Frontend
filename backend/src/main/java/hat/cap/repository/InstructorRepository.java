package hat.cap.repository;

import hat.cap.entity.Instructor;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface InstructorRepository extends CrudRepository<Instructor, Long> {
    Instructor findInstructorByEmail(String email);
}
