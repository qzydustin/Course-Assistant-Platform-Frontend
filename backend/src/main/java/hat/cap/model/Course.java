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
@Table(
        uniqueConstraints =
        @UniqueConstraint(columnNames = {"code", "semester"})
)
public class Course {
    @Id
    @GeneratedValue
    private long id;
    @ManyToOne
    @JoinColumn
    private Instructor instructor;
    private String code;
    private String name;
    private String information;
    private String department;
    private int unit;
    private Date semester;
    private int seat;
}