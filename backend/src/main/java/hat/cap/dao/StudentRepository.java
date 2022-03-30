package hat.cap.dao;

import hat.cap.model.Student;

import org.springframework.data.repository.CrudRepository;

public interface StudentRepository extends CrudRepository<Student,Long> {
    Student findByEmail(String email);

}
