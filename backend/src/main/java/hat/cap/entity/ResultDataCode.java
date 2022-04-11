package hat.cap.entity;

import lombok.Getter;

@Getter
public enum ResultDataCode {
    // common
    SUCCESS(1000, "SUCCESS"),
    NO_PERMISSION(1001,"NO_PERMISSION"),

    // user
    USER_HAS_EXIST(2000, "USER_HAS_EXIST"),
    USER_NOT_EXIST(2001, "USER_NOT_EXIST"),
    USER_PASSWORD_WRONG(2002, "USER_PASSWORD_WRONG"),

    // course
    COURSE_NOT_FOUND(3000,"COURSE_NOT_FOUND"),

    ;

    private final int code;
    private final String message;

    ResultDataCode(int code, String message) {
        this.code = code;
        this.message = message;
    }


}

