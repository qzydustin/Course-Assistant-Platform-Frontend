package com.qizhenyu.olmsbackend.controller;

import com.qizhenyu.olmsbackend.model.Work;
import com.qizhenyu.olmsbackend.service.WorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class WorkController {
    @Autowired
    private WorkService workService;

    @RequestMapping("/getWork")
    public List<Work> getWork(String cid) {
        return workService.getWork(cid, 0);
    }

    @RequestMapping("/getExam")
    public List<Work> getExam(String cid) {
        return workService.getWork(cid, 1);
    }

    @RequestMapping("/getScore")
    public List<Work> getScore(String cid, String uid) {
        return workService.getScore(cid, uid);
    }

    @RequestMapping("/addWork")
    public int addWork(String cid, String title, String content) {
        return workService.addWork(cid, title, content, 0);
    }

    @RequestMapping("/addScore")
    public int addScore(String user, String work, String score) {
        return workService.addScore(user, work, score);
    }

    @RequestMapping("/addExam")
    public int addExam(String cid, String title, String content) {
        return workService.addWork(cid, title, content, 1);
    }

    @RequestMapping("/uploadHomework")
    public int uploadHomework(String user_id, String work_id, MultipartFile[] files) {
        try {
            return workService.uploadWork(Integer.parseInt(user_id), Integer.parseInt(work_id), files);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 400;
    }
}
