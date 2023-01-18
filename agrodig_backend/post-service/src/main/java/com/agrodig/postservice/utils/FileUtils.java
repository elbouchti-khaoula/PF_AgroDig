package com.agrodig.postservice.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Slf4j
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

    public static Boolean deleteFile(String directory, String fileName) {
        String filePath = directory + fileName;
        File dest = new File(filePath);
        return dest.delete();
    }
}
