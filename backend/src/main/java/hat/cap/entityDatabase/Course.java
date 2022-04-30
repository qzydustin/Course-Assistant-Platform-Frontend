package hat.cap.entityDatabase;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor(force = true)
@Table(name = "Course", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"code", "semester"})
})
@Getter
@Setter
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @Column(nullable = false)
    private String weekday;
    @Column(nullable = false)
    private String startTime;
    @Column(nullable = false)
    private String endTime;
    @Column(nullable = false)
    private String location;
}