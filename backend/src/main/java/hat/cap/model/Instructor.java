package hat.cap.model;

import lombok.*;

import javax.persistence.*;


@Entity
@Data
@NoArgsConstructor(force = true)

public class Instructor {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    @Column(unique=true,nullable = false)
    private String email;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;
}
