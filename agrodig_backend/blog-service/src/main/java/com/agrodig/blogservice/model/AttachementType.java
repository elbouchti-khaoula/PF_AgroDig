package com.agrodig.blogservice.model;



public enum AttachementType {
    PDF("pdf"),
    TXT("txt"),
    PNG("png"),
    JPEG("jpeg"),
    JPG("jpg"),
    GIF("gif"),
    TIFF("tiff");

    private final String value;

    AttachementType(String value) {
        this.value = value;
    }

    public String value() {
        return value;
    }

    public static AttachementType fromContentType(String contentType) {
        AttachementType fileType = null;
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

    public static AttachementType fromValue(String value) {
        return valueOf(value.toUpperCase());
    }
}