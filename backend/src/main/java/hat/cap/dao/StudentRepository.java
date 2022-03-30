package hat.cap.dao;

import hat.cap.model.Student;

import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface StudentRepository extends CrudRepository<Student,Long> {
    Student findByEmail(String email);

}
