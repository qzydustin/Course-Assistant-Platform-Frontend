package com.qizhenyu.olmsbackend.service;

import com.qizhenyu.olmsbackend.dao.ResourceMapper;
import com.qizhenyu.olmsbackend.model.Information;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service

public class ResourceService {
    @Autowired
    private ResourceMapper resourceMapper;

    public int addResourceInformation(String course_id, String title, String content) {
        resourceMapper.addResource(Integer.parseInt(course_id), title, content);
        return 200;
    }

    public List<Information> getResourceInformation(String course_id) {
        return resourceMapper.getResourceInformation(Integer.parseInt(course_id));
    }

    public List<Information> getResourceData(String course_id) {
        return resourceMapper.getResourceData(Integer.parseInt(course_id));
    }

    public List<String> uploadMultipartFile(String course_id, String title, String content, MultipartFile[] files) throws Exception {
        List<String> ps = new ArrayList<>();
        if (files == null) {
            ps.add("no files");
            return ps;
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
        resourceMapper.addResourceFile(Integer.parseInt(course_id), title, content, path1);
        return ps;
    }


}

