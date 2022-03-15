package hat.cap.dao;

import hat.cap.model.Instructor;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface InstructorMapper {

    @Select("SELECT * FROM instructors WHERE email = #{email}")
    @Results({
            @Result(property = "email", column = "email"),
            @Result(property = "username", column = "username"),
            @Result(property = "password", column = "password")
    })
    Instructor getInstructorByEmail(String email);

    @Select("SELECT * FROM instructors")
    @Results({
            @Result(property = "email", column = "email"),
            @Result(property = "username", column = "username"),
            @Result(property = "password", column = "password")
    })
    List<Instructor> getAllInstructors();


    @Insert("INSERT INTO instructors (email,username,password) VALUES (#{email}, #{username}, #{password})")
    void signUp(String email,String username, String password);

    @Update("UPDATE instructors SET password=#{password} WHERE email =#{email}")
    void updatePasswordByEmail(String email, String password);

    @Delete("DELETE FROM instructors WHERE email = #{email}")
    void delete(String email);


}
