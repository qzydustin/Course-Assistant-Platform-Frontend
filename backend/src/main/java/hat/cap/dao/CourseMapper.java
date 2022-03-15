package hat.cap.dao;

import hat.cap.model.Course;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Mapper
@Repository
public interface CourseMapper {

    @Select("SELECT * FROM courses WHERE course_id = #{course_id}")
    @Results({
            @Result(property = "cid", column = "cid"),
            @Result(property = "iid", column = "iid"),
            @Result(property = "course_id", column = "course_id"),
            @Result(property = "course_name", column = "course_name"),
            @Result(property = "description", column = "description"),
            @Result(property = "department", column = "department"),
            @Result(property = "units", column = "units"),
            @Result(property = "offered_time", column = "offered_time"),
            @Result(property = "availability", column = "availability")
    })
    List<Course> getCourseByCourseID(String course_id);

    @Insert("INSERT INTO courses(cid,iid,course_id,course_name,description,department,units,offered_time,availability) VALUES(#{cid},#{iid},#{course_id},#{course_name},#{description},#{department},#{units},#{offered_time},#{availability})")
    void createCourse(int cid, int iid, String course_id, String course_name, String description, String department, int units, Date offered_time, int availability);

    @Delete("Delete FROM courses WHERE course_id = #{course_id}")
    void deleteCourseByCourse_id(String course_id);
}
