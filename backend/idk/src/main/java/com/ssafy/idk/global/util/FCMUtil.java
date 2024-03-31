package com.ssafy.idk.global.util;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;

@ComponentScan
public class FCMUtil {
    private static final String path = "idkbank-3054b-firebase-adminsdk-by0z7-7a47c9b31d.json";
    private static boolean initialized = false;

    public static void init(){
        try {
            if (!initialized) {
                // 위에서 입력한 path를 기반으로 인증 정보 세팅
                FirebaseOptions options = new FirebaseOptions.Builder()
                        .setCredentials(GoogleCredentials.fromStream(new ClassPathResource(path).getInputStream()))
                        .build();

                if (FirebaseApp.getApps().isEmpty()) {
                    FirebaseApp.initializeApp(options);
                    initialized = true;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
