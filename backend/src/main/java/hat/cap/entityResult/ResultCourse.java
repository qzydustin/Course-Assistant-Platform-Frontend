package hat.cap.entityResult;

import hat.cap.entityDatabase.Course;
import lombok.Data;


@Data
public class ResultCourse {
    private Long id;
    private String code;
    private String title;
    private String information;
    private String instructorName;
    private String department;
    private String semester;
    private int unit;
    private int seat;

    public ResultCourse(Course course) {
        id = course.getId();
        code = course.getCode();
        title = course.getTitle();
        information = course.getInformation();
        instructorName = course.getInstructor().getUsername();
        department = course.getDepartment();
        semester = course.getSemester();
        unit = course.getUnit();
        seat = course.getSeat();
    }
}

