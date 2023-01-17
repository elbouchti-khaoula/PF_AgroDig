package com.agrodig.postservice.service;

import com.agrodig.postservice.dto.PostRequestDto;
import com.agrodig.postservice.model.File;
import com.agrodig.postservice.model.Post;
import com.agrodig.postservice.repository.FileRepository;
import com.agrodig.postservice.utils.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;

@Service
public class FileService {
    private final FileRepository fileRepository;

    @Autowired
    public FileService(FileRepository fileRepository){
        this.fileRepository = fileRepository;
    }

    public File uploadFile(PostRequestDto postRequestDto, Post post){
        Instant instant = Instant.now();
        MultipartFile uploadedFile = postRequestDto.getFile();
        String fileName = post.getPost_id()  + "_" + uploadedFile.getOriginalFilename();
        String uploadsDirectory = "D:/Downloads/images/kawtar/";
        String filePath = uploadsDirectory + fileName;
        // save file into local file storage
        ImageUtils.saveImage(uploadedFile,uploadsDirectory, fileName);

        // save file into database
        File file = new File();
        file.setFilePath(filePath);
        file.setCreatedAt(instant);
        file.setUpdatedAt(instant);
        file.setPost(post);
        fileRepository.save(file);

        return file;
    }

    public void deleteFile(Long postId){
        // get all the files related to the post and delete them from the d and the local storage
    }
}
