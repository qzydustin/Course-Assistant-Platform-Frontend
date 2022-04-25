package hat.cap.entityResult;

import hat.cap.resources.StateCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResultData<T> {

    private int code;
    private String message;
    private long timestamp;
    private T data;

    public ResultData(StateCode resultCode, T data) {
        this.code = resultCode.getCode();
        this.message = resultCode.getMessage();
        this.data = data;
        this.timestamp = System.currentTimeMillis();
    }

    public ResultData(StateCode resultCode) {
        this.code = resultCode.getCode();
        this.message = resultCode.getMessage();
        this.data = null;
        this.timestamp = System.currentTimeMillis();
    }
}






