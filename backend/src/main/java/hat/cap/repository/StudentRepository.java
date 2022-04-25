package hat.cap.repository;

import hat.cap.entityDatabase.Student;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface StudentRepository extends CrudRepository<Student, Long> {

    Student findStudentByEmail(String email);

    Student findStudentByEmailAndPassword(String email, String password);


}
