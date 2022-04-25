package hat.cap.repository;

import hat.cap.entityDatabase.Instructor;
import org.springframework.data.repository.CrudRepository;

public interface InstructorRepository extends CrudRepository<Instructor, Long> {
    Instructor findInstructorByEmail(String email);

    Instructor findInstructorByEmailAndPassword(String email, String password);
}
