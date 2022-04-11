package hat.cap.entity;

import lombok.Data;

@Data
public class ResultData<T> {

    private int code;
    private String message;
    private long timestamp;
    private T data;

    public ResultData(ResultDataCode resultCode, T data) {
        this.code = resultCode.getCode();
        this.message = resultCode.getMessage();
        this.data = data;
        this.timestamp = System.currentTimeMillis();
    }
}




