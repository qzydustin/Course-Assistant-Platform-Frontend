package hat.cap.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor(force = true)
@Table(name = "Course", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"code", "semester"})
})
public class Course {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn
    private Instructor instructor;
    @Column(nullable = false)
    private String code;
    @Column(nullable = false)
    private String title;
    private String information;
    @Column(nullable = false)
    private String department;
    @Column(nullable = false)
    private String semester;
    @Column(nullable = false)
    private int unit;
    @Column(nullable = false)
    private int seat;
}