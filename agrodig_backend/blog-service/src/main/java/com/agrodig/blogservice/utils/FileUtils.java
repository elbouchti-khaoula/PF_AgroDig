package com.agrodig.blogservice.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public class FileUtils {
    public static void saveFile(MultipartFile file, String directory, String fileName) {
        if (!file.isEmpty()) {
            try {
                if (!new File(directory).exists()) {
                    new File(directory).mkdirs();
                }
                String filePath = directory + fileName;
                File dest = new File(filePath);
                file.transferTo(dest);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
