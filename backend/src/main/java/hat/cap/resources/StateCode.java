package hat.cap.resources;

import lombok.Getter;

@Getter
public enum StateCode {
    // common
    SUCCESS(1000, "SUCCESS"),
    NO_PERMISSION(1001, "NO_PERMISSION"),
    UNKNOWN_ERROR(1002, "UNKNOWN_ERROR"),

    // user
    USER_HAS_EXIST(2000, "USER_HAS_EXIST"),
    USER_NOT_EXIST(2001, "USER_NOT_EXIST"),
    USER_PASSWORD_WRONG(2002, "USER_PASSWORD_WRONG"),
    USER_TYPE_WRONG(2003, "USER_TYPE_WRONG"),

    // course
    COURSE_NOT_FOUND(3000, "COURSE_NOT_FOUND"),
    COURSE_HAS_EXIST(3001, "COURSE_HAS_EXIST"),
    COURSE_INSTRUCTOR_NOT_EXIST(3002, "COURSE_INSTRUCTOR_NOT_EXIST"),
    COURSE_IS_FULL(3003, "COURSE_IS_FULL"),
    COURSE_HAS_BEEN_ENROLLED(3003, "COURSE_HAS_BEEN_ENROLLED"),

    ;

    private final int code;
    private final String message;

    StateCode(int code, String message) {
        this.code = code;
        this.message = message;
    }


}