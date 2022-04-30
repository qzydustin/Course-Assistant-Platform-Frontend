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
    private String weekday;
    private String startTime;
    private String endTime;
    private String location;

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
        weekday = course.getWeekday();
        startTime=course.getStartTime();
        endTime= course.getEndTime();
        location= course.getLocation();
    }
}

