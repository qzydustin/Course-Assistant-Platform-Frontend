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

public class Student_Course {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn
    private Student student;

    @ManyToOne
    @JoinColumn
    private Course course;

    private int grade;
}
