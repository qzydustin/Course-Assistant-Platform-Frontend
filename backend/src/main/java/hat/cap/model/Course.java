package hat.cap.model;

import lombok.*;

import javax.persistence.*;

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
    private String title;
    private String information;
    private String department;
    private String semester;
    private int unit;
    private int seat;
}