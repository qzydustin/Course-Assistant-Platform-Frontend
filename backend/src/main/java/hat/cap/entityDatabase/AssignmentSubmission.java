package hat.cap.entityDatabase;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@NoArgsConstructor(force = true)
@Getter
@Setter
public class AssignmentSubmission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn
    private Assignment assignment;
    @Column
    private String content;
    @Column
    private String filePath;
    @ManyToOne
    @JoinColumn
    private Student student;
    @Column
    private Date submitDate;
    @Column
    private double score;
}
