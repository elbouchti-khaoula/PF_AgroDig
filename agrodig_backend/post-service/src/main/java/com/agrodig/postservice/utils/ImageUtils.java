package com.agrodig.postservice.utils;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public class ImageUtils {
    //This function saves an image in a directory
    public static void saveImage(MultipartFile image, String directory, String fileName) {
        if (!image.isEmpty()) {
            try {
                if (!new File(directory).exists()) {
                    new File(directory).mkdirs();
                }
                String filePath = directory + fileName;
                File dest = new File(filePath);
                image.transferTo(dest);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    /*public static void saveImage(File srcFile, String directory, String fileName) {
        try {
            if (!new File(directory).exists()) {
                new File(directory).mkdirs();
            }
            String filePath = directory + fileName;
            File dest = new File(filePath);
            FileUtils.copyFile(srcFile, dest);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }*/
}
