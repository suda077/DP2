package com.dp2;

import android.os.Bundle;

import com.cboy.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivity;
import com.microsoft.codepush.react.CodePush;

public class MainActivity extends ReactActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // 启动屏
        super.onCreate(savedInstanceState);

    }
    @Override
    protected String getMainComponentName() {
        return "DP2";
    }
}
