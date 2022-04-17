package hat.cap.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor(force = true)
@Getter
@Setter
public class StudentCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn
    private Student student;

    @ManyToOne
    @JoinColumn
    private Course course;

    private int grade;
}
