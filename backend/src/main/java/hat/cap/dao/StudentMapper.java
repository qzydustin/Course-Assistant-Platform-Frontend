package hat.cap.dao;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import hat.cap.model.Student;

import java.util.List;

@Mapper
@Repository
public interface StudentMapper {

    @Select("SELECT * FROM students WHERE email = #{email}")
    @Results({
            @Result(property = "sid", column = "sid"),
            @Result(property = "email", column = "email"),
            @Result(property = "username", column = "username"),
            @Result(property = "password", column = "password")
    })
    Student getStudentByEmail(String email);

    @Select("SELECT * FROM students")
    @Results({
            @Result(property = "sid", column = "sid"),
            @Result(property = "email", column = "email"),
            @Result(property = "username", column = "username"),
            @Result(property = "password", column = "password")
    })
    List<Student> getAllStudents();


    @Insert("INSERT INTO students(email,username,password) VALUES(#{email}, #{username}, #{password}")
    void signUp(String email,String username, String password);

    @Update("UPDATE students SET password=#{password} WHERE email =#{email}")
    void updatePasswordByEmail(String email, String password);

    @Delete("DELETE FROM students WHERE email = #{email}")
    void delete(String email);


}
