package hat.cap.entityResult;

import lombok.Getter;

@Getter
public enum Code {
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

    // post
    POST_TITLE_IS_EMPTY(4000, "POST_TITLE_IS_EMPTY"),
    POST_NOT_EXIST(4001, "POST_NOT_EXIST"),

    // announcement
    ANNOUNCEMENT_TITLE_IS_EMPTY(5001, "ANNOUNCEMENT_TITLE_IS_EMPTY");



    private final int code;
    private final String message;

    Code(int code, String message) {
        this.code = code;
        this.message = message;
    }


}
