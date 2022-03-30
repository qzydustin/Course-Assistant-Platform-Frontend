package hat.cap.model;

import lombok.*;

import javax.persistence.*;
import java.sql.Date;

@Builder
@AllArgsConstructor
@Entity
@Data
@NoArgsConstructor
@Getter
@Setter
@RequiredArgsConstructor
@ToString
public class Course {
    @Id
    @GeneratedValue
    private long id;
    @ManyToOne
    @JoinColumn
    private Instructor instructor;
    private String course_code;
    private String course_name;
    private String information;
    private String department;
    private int unit;
    private Date offered_time;
    private int availability;
}