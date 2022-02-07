package com.qizhenyu.olmsbackend.controller;

import com.qizhenyu.olmsbackend.model.Information;
import com.qizhenyu.olmsbackend.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class ResourceController {
    @Autowired
    private ResourceService resourceService;

    @RequestMapping("/addResourceInformation")
    public int addResourceInformation(String course_id, String title, String content) {
        return resourceService.addResourceInformation(course_id, title, content);
    }

    @RequestMapping("/getResourceInformation")
    public List<Information> getResourceInformation(String course_id) {
        return resourceService.getResourceInformation(course_id);
    }

    @RequestMapping("/getResourceData")
    public List<Information> getResourceData(String course_id) {
        return resourceService.getResourceData(course_id);
    }

    @RequestMapping("/upload")
    public List<String> uploadMultipartFile(String course_id, String title, String content, MultipartFile[] files) throws Exception {
        return resourceService.uploadMultipartFile(course_id, title, content, files);
    }
}
