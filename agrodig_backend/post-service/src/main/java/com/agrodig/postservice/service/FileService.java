package com.agrodig.postservice.service;

import com.agrodig.postservice.config.FileConfig;
import com.agrodig.postservice.dto.response.FileResponseDto;
import com.agrodig.postservice.mapper.EntityToDto;
import com.agrodig.postservice.model.File;
import com.agrodig.postservice.model.FileType;
import com.agrodig.postservice.model.Post;
import com.agrodig.postservice.repository.FileRepository;
import com.agrodig.postservice.utils.FileUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.Instant;

@Transactional
@Service
@Slf4j
@RequiredArgsConstructor
public class FileService {
    private final FileRepository fileRepository;

    private final FileConfig fileConfig;

    public FileResponseDto addFileToPost(MultipartFile multipartFile, Post post) {
        //saving attachement entity
        File file = new File();
        file.setType(FileType.fromContentType(multipartFile.getContentType()));
        file.setCreatedAt(Instant.now());
        file.setName(multipartFile.getName());
        file.setPath(fileConfig.getDirectory());

        file.setPost(post);

        fileRepository.save(file);

        //saving attachement file in file system
        String fileName = file.getFile_id() + "." + file.getType().value();
        FileUtils.saveFile(multipartFile, fileConfig.getDirectory(), fileName);

        return EntityToDto.FileToFileResponseDto(file);

    }

    public Boolean deleteFileOfPost(File file) {
        return FileUtils.deleteFile(file.getPath(), file.getFile_id() + "." + file.getType().value());
    }

}
