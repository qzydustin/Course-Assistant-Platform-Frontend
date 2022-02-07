package com.qizhenyu.olmsbackend.service;

import com.qizhenyu.olmsbackend.dao.WorkMapper;
import com.qizhenyu.olmsbackend.model.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
public class WorkService {
    @Autowired
    private WorkMapper workMapper;

    public int addWork(String cid, String title, String content, int isExam) {
        if (isExam == 0) {
            workMapper.addWork(Integer.parseInt(cid), title, content, 0);
        } else {
            workMapper.addWork(Integer.parseInt(cid), title, content, 1);
        }
        return 200;
    }

    public int addScore(String user_id, String work_id, String score) {
        workMapper.addScore(Integer.parseInt(user_id), Integer.parseInt(work_id), Integer.parseInt(score));
        return 200;
    }

    public int uploadWork(int user_id, int work_id, MultipartFile[] files) throws Exception {
        List<String> ps = new ArrayList<>();
        if (files == null) {
            ps.add("no files");
            return 404;
        }
        String path1 = "http://127.0.0.1:8081/" + files[0].getOriginalFilename();
        for (MultipartFile f : files) {
            String name = f.getOriginalFilename();
            String path = "D:/";
            File fx = new File(path);
            if (!fx.exists()) {
                fx.mkdirs();
            }
            File n = new File(fx, name);
            f.transferTo(n);
            ps.add(n.getPath());
        }
        workMapper.updateFilePath(user_id, work_id, path1);
        return 200;
    }

    public List<Work> getWork(String cid, int isExam) {
        if (isExam == 0) {
            return workMapper.getWork(Integer.parseInt(cid), 0);
        } else {
            return workMapper.getWork(Integer.parseInt(cid), 1);
        }

    }

    public List<Work> getScore(String cid, String uid) {
        return workMapper.getScore(Integer.parseInt(cid), Integer.parseInt(uid));
    }
}
