package hat.cap.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor(force = true)

public class Student_Course {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn
    private Student student;

    @ManyToOne
    @JoinColumn
    private Course course;

    private int grade;
}
