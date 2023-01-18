package com.agrodig.postservice.model;


public enum FileType {
    PDF("pdf"),
    TXT("txt"),
    PNG("png"),
    JPEG("jpeg"),
    JPG("jpg"),
    GIF("gif"),
    TIFF("tiff");

    private final String value;

    FileType(String value) {
        this.value = value;
    }

    public String value() {
        return value;
    }

    public static FileType fromContentType(String contentType) {
        FileType fileType = null;
        switch (contentType) {

            case "text/plain":
                fileType = TXT;
                break;
            case "application/pdf":
                fileType = PDF;
                break;
            case "image/png":
                fileType = PNG;
                break;
            case "image/jpeg":
                fileType = JPEG;
                break;
            case "image/gif":
                fileType = GIF;
                break;
            case "image/tiff":
                fileType = TIFF;
                break;
        }
        return fileType;

    }

    public static FileType fromValue(String value) {
        return valueOf(value.toUpperCase());
    }
}
