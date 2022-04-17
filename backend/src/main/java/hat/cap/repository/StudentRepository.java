package hat.cap.repository;

import hat.cap.entity.Student;
import org.springframework.data.repository.CrudRepository;

public interface StudentRepository extends CrudRepository<Student, Long> {

    Student findStudentByEmail(String email);


}
