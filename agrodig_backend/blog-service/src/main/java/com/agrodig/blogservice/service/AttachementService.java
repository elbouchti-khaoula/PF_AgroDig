package com.agrodig.blogservice.service;

import com.agrodig.blogservice.config.FileConfig;
import com.agrodig.blogservice.dto.response.AttachementResponseDto;
import com.agrodig.blogservice.mapper.EntityToDto;
import com.agrodig.blogservice.model.Attachement;
import com.agrodig.blogservice.model.AttachementType;
import com.agrodig.blogservice.model.Blog;
import com.agrodig.blogservice.repository.AttachementRepository;
import com.agrodig.blogservice.utils.FileUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.Date;

@Transactional
@Service
@Slf4j
@RequiredArgsConstructor
public class AttachementService {
    private final AttachementRepository attachementRepository;
    private final FileConfig fileConfig;

    public AttachementResponseDto addAttachementToBlog(MultipartFile multipartFile, Blog blog) {
        // String uploadsDir = "/uploads/files/" ;
        // String path = fileConfig.getDirectory() ;

        //saving attachement entity
        Attachement attachement = new Attachement();
        attachement.setType(AttachementType.fromContentType(multipartFile.getContentType()));
        attachement.setUploadDate(new Date());
        attachement.setName(multipartFile.getName());
        attachement.setPath(fileConfig.getDirectory());

        attachement.setBlog(blog);

        Attachement savedAttachement =attachementRepository.save(attachement);

        //saving attachement file in file system
        String fileName = savedAttachement.getId() + "." + savedAttachement.getType().value();
        FileUtils.saveFile(multipartFile, fileConfig.getDirectory(), fileName);

        return EntityToDto.AttachementToAttachementResponseDto(attachement);

    }

    public Boolean deleteAttachementOfBlog(Attachement attachement) {
        return FileUtils.deleteFile(attachement.getPath(), attachement.getId() + "." + attachement.getType().value());
    }
}
