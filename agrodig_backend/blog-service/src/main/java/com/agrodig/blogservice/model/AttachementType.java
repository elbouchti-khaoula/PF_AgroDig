package com.agrodig.blogservice.model;


public enum AttachementType {
    PDF("pdf"),
    TXT("txt");

    private final String value;

    AttachementType(String value) {
        this.value = value;
    }

    public String value() {
        return value;
    }

    public static AttachementType fromContentType(String contentType) {
        AttachementType fileType= null;
        switch (contentType){

            case "text/plain" :
                fileType = TXT ;
                break;
            case "application/pdf" :
                fileType = PDF ;
                break;

        }
        return fileType;

    }

    public static AttachementType fromValue(String value){
        return valueOf(value.toUpperCase());
    }
}
