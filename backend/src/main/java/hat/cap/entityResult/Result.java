package hat.cap.entityResult;

import lombok.Data;


@Data
public class Result<T> {

    private int code;
    private String message;
    private long timestamp;
    private T data;

    public Result(Code resultCode, T data) {
        this.code = resultCode.getCode();
        this.message = resultCode.getMessage();
        this.data = data;
        this.timestamp = System.currentTimeMillis();
    }

    public Result(Code resultCode) {
        this.code = resultCode.getCode();
        this.message = resultCode.getMessage();
        this.data = null;
        this.timestamp = System.currentTimeMillis();
    }
}






