package hat.cap.repository;

import hat.cap.entityDatabase.Student;
import org.springframework.data.repository.CrudRepository;

public interface StudentRepository extends CrudRepository<Student, Long> {

    Student findStudentByEmail(String email);

    Student findStudentByEmailAndPassword(String email, String password);


}
