package hat.cap.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Builder
@AllArgsConstructor
@Entity
@Data
@NoArgsConstructor
@Getter
@Setter
@RequiredArgsConstructor
@ToString

public class Student {
    @Id
    @GeneratedValue
    private long id;
    private String email;
    private String password;
    private String username;
}
