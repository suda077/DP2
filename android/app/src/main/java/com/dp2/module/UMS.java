package com.dp2.module;

import android.bluetooth.BluetoothAdapter;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.imagepipeline.animated.impl.AnimatedImageCompositor;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.mob.jimu.query.data.DataType;
import com.mob.jimu.query.data.Number;
import com.mob.jimu.query.data.Text;
import com.mob.ums.OperationCallback;
import com.mob.ums.SocialNetwork;
import com.mob.ums.UMSSDK;
import com.mob.ums.User;
import com.mob.ums.datatype.Gender;


import org.json.JSONObject;

import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

import cn.sharesdk.framework.Platform;
import cn.sharesdk.framework.ShareSDK;
import cn.sharesdk.sina.weibo.SinaWeibo;

/**
 * Created by Administrator on 2017/8/13.
 */

//ReactContextBaseJavaModule是一个抽象类，是用来被JavaScript调用对象的父类，我们需要Override一些ReactContextBaseJavaModule的方法。
public class UMS extends ReactContextBaseJavaModule {

    private BluetoothAdapter mBluetoothAdapter = null;

    public static ReactContext myContext;

    // 构造函数
    public UMS(final ReactApplicationContext reactContext) {
        super(reactContext);
        myContext=reactContext; //等同getReactApplicationContext()
    }

    //    getName()方法的返回值就是JavaScript中调用的名称，比如我们命名为RNToastAndroid,在JavaScript中可以这样调用：
    //    var {NativeModules}=require('react-native');
    //    var rnToastAndroid = NativeModules.RNToastAndroid;
    @Override
    public String getName() {
        // 设置在js中调用的模块名
        return "UMS";
    }


    /**
     * 导出一个方法给JavaScript使用
     * 1. Java 方法需要使用注解 @ReactMethod，这样才能在 react-native 中调用
     * 2. 方法的返回类型必须为 void，因为它是异步进行的
     * 3. 在 react-native 中调用方式： 模块名.方法名
     * 4. React Native 的跨语言访问是异步进行的，所以使用 回调函数 或者 发送事件消息
     */


    //回调函数
    /*Java中规定，内部类只能访问外部类中的成员变量，
     不能访问方法中定义的变量，如果要访问方法中的变量，就要把方法中的变量声明为final（常量）的，
     因为这样可以使变量全局化，就相当于是在外部定义的而不是在方法里定义的*/

    @ReactMethod
    public void test1( Promise promise){
        try{
            WritableMap map = Arguments.createMap();
            map.putString("success", "成功");

            promise.resolve(map);
        }
        catch(IllegalViewOperationException e){
            promise.reject(e);
        }
    }

    @ReactMethod
        public void test2(Callback errorCallback, Callback successCallback){
        try{
            WritableMap map = Arguments.createMap();
            map.putString("success", "成功");
            successCallback.invoke(map);
        }
        catch(IllegalViewOperationException e){
            errorCallback.invoke(e.getMessage());
        }
    }



/***********************************SMS**************************************/
//    public  EventHandler eventHandler;
//
//    //public void registerEventHandler(Callback submitVerificationCode,Callback getVerificationCode,Callback errorCode){
//
//    @ReactMethod
//     public void registerEventHandler(){
//        //event(submitVerificationCode,getVerificationCode,errorCode);
//        // 注册监听器
//        SMSSDK.registerEventHandler(eventHandler);
//    }
//
//    @ReactMethod
//    public void unregisterEventHandler(){
//        // 注销监听器
//        SMSSDK.unregisterEventHandler(eventHandler);
//    }
//
//
//    //获取验证码,在MainActivity的onCreate监听中返回
//    @ReactMethod
//    public void getVerificationCode(String country, String phone){
//        SMSSDK.getVerificationCode(country,phone);
//        send();
//    }
//
//
//    //提交验证码,在MainActivity的onCreate监听中返回
//    @ReactMethod
//    public void submitVerificationCode(String country, String phone, String code){
//        SMSSDK.submitVerificationCode(country,phone,code);
//        send();
//    }
//
//    @ReactMethod
//    private void event(final Callback submitVerificationCode, final Callback getVerificationCode, final Callback errorCode){
//        // 创建EventHandler对象
//        eventHandler  = new EventHandler() {
//            @Override
//            public void afterEvent(int event, int result, Object data) {
//                if(result == SMSSDK.RESULT_COMPLETE) {//回调完成
//                    if (event == SMSSDK.EVENT_GET_VERIFICATION_CODE) { // 获取验证码成功
//                        //Toast.makeText(myContext, "验证码发送成功", Toast.LENGTH_SHORT).show();
//                        //Log.i("showzzy","验证码发送成功");
//                        getVerificationCode.invoke();
//                    }else if (event == SMSSDK.EVENT_SUBMIT_VERIFICATION_CODE) {//提交验证码成功
//                       // Toast.makeText(myContext, "提交验证码成功", Toast.LENGTH_SHORT).show();
//                       submitVerificationCode.invoke();
//                    }
//                }
//              //  else{
//                if(result == SMSSDK.RESULT_ERROR) {//回调未完成
//                    Throwable throwable = (Throwable) data;
//                    try{
//                       // final String des = throwable.getMessage();
//
//                        throwable.printStackTrace();
//                        JSONObject object = new JSONObject(throwable.getMessage());
//                        String des = object.optString("detail");//错误描述
//                        int status = object.optInt("status");//错误代码
//                         if (status > 0 && !TextUtils.isEmpty(des)) {
//                            //Toast.makeText(myContext, des, Toast.LENGTH_SHORT).show();
//                            errorCode.invoke(des);
//                             return;
//                        }
//                    }
//                    catch(Exception e){
//                        //Toast.makeText(myContext, e.getMessage(), Toast.LENGTH_SHORT).show();
//                       errorCode.invoke(e.getMessage());
//                    }
//               }
//
//            }
//        };
//    }
//
//
//
//    //gui界面
//    @ReactMethod
//    public void  show(final Callback getVerification){
//        RegisterPage registerPage = new RegisterPage();
//        //回调函数
//        registerPage.setRegisterCallback(new EventHandler() {
//            public void afterEvent(int event, int result, Object data) {// 解析结果
//                if (result == SMSSDK.RESULT_COMPLETE) {
//                    //提交验证码成功
//                    if (event == SMSSDK.EVENT_SUBMIT_VERIFICATION_CODE) {
//                        getVerification.invoke();
//                    }
//                    //提交验证码成功，此时已经验证成功了
//                    else if (event == SMSSDK.EVENT_GET_VERIFICATION_CODE) {
//                        //getVerification.invoke();
//                        boolean smart = (Boolean)data;
//                        if(smart) {
//                            //通过智能验证
//                        } else {
//                            //依然走短信验证
//                        }
//                    }
//                }
//            }
//        });
//        registerPage.show(myContext);
//    }
//
//
//
//
//    /*原生模块可以在没有被调用的情况下往JavaScript发送事件通知。
//    最简单的办法就是通过RCTDeviceEventEmitter，
//    这可以通过ReactContext来获得对应的引用，像这样：*/
//    public static void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap paramss)
//    {
//        reactContext
//                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                .emit(eventName, paramss);
//    }
//
//
//   // @ReactMethod
//    public void send(){
//        WritableMap et= Arguments.createMap();
//        sendEvent(myContext,"send",et);
//    }
/********************************END SMS******************************************/


    //发送验证码
    @ReactMethod
    public void sendVerifyCodeForRegitser(String country,String phone,final Callback successCallback,final Callback failedCallback){
        UMSSDK.sendVerifyCodeForRegitser(country, phone , new OperationCallback<Boolean>() {
            public void onSuccess(Boolean bool) {
                // 执行成功的操作
//                if(bool){
//                    Toast.makeText(myContext, "该手机已注册过", Toast.LENGTH_SHORT).show();
//                }
//                else{
                    successCallback.invoke("success");
//                }

                // WritableMap map = Arguments.createMap();
                // map.putString("success", "验证码发送成功");

                // promise.resolve(map);

            }

            // public void onCancel() {
            //     // 执行取消的操作
            //     cancelCallback.invoke();
            // }

            public void onFailed(Throwable t) {
                // 提示错误信息

                /*连续点击会崩溃*/
                try {
                    t.printStackTrace();
                    JSONObject object = new JSONObject(t.getMessage());
                    String des = object.optString("detail");//错误描述
                    int status = object.optInt("status");//错误代码
                    if (status > 0 && !TextUtils.isEmpty(des)) {
                        //Toast.makeText(myContext, des, Toast.LENGTH_SHORT).show();
                        failedCallback.invoke(des);
                        return;
                    }
                }
                catch(Exception e){
                   // Toast.makeText(myContext, e.getMessage(), Toast.LENGTH_SHORT).show();
                    failedCallback.invoke(t.getMessage());
                }
            }
        });
    }

    //号码注册
     @ReactMethod
     public void registerWithPhoneNumber( String country, String phone, String vcode, String pwd, ReadableMap content, final Callback successCallback, final Callback failedCallback ){
         User u = new User();

//         String[] img = {"http://f1.sdk.mob.com/ums/avatar/dd9/7fc/3e7387763d85e81c148c2595c0_500.jpg",
//                 "http://f1.sdk.mob.com/ums/avatar/dd9/7fc/3e7387763d85e81c148c2595c0_100.jpg",
//                 "http://f1.sdk.mob.com/ums/avatar/dd9/7fc/3e7387763d85e81c148c2595c0_50.jpg"};
//         u.avatar.set(img);

         u.nickname.set(content.getString("nickname"));
         u.signature.set(content.getString("signature"));



         UMSSDK.registerWithPhoneNumber(country,phone,vcode,pwd,u,new OperationCallback<User>() {
             public void onSuccess(User user) {
                 // 执行成功的操作
//                 successCallback.invoke(user.nickname.get());
                 successCallback.invoke(user.tabulate().toString());
             }
             public void onFailed(Throwable t) {
                 // 提示错误信息
                 //Toast.makeText(myContext, t.getMessage(), Toast.LENGTH_SHORT).show();
                failedCallback.invoke(t.getMessage());
             }
         });
     }

    //登录
    @ReactMethod
    public void loginWithPhoneNumber(String country, String phone, String pwd, final Callback successCallback, final Callback failedCallback){
         UMSSDK.loginWithPhoneNumber(country,phone,pwd,new OperationCallback<User>() {
             public void onSuccess(User user) {
                 // 执行成功的操作,获取用户信息
                 successCallback.invoke(user.tabulate().toString());
             }
             public void onFailed(Throwable t) {
                 // 提示错误信息
                 //Toast.makeText(myContext, t.getMessage(), Toast.LENGTH_SHORT).show();
                 failedCallback.invoke(t.getMessage());
             }
         });
    }

    //注销
    @ReactMethod
    public void logout(final Callback successCallback, final Callback failedCallback){
        UMSSDK.logout(new OperationCallback<Void>(){
            public void onSuccess(Void v) {
                successCallback.invoke("success");
            }
            public void onFailed(Throwable t) {
                failedCallback.invoke(t.getMessage());
            }
        });
    }




    //初始化用户数据
    User u = new User();
    //初始化更新数据
    HashMap<String,Object> hashMap=new HashMap<>();
    //头像数据
    String avatar = "";



    //上传图片到服务器(并非与用户联动)
    @ReactMethod
    public void uploadAvatar(String local,final Callback successCallback, final Callback failedCallback){

        //获取用户数据
        getLoginUser();

        //上传图片到服务器(并非与用户联动)
        UMSSDK.uploadAvatar(local,new OperationCallback<HashMap<String, Object>>(){
            public void onSuccess(HashMap<String, Object> map) {
                //只需传递头像id
                hashMap.put(u.avatarId.getName(),map.get("id"));
//              hashMap.put(u.avatar.getName(),map.get("avatar"));

                successCallback.invoke(map.get("avatar").toString());

//                avatar = map.get("avatar").toString();

            }
            public void onFailed(Throwable t) {

                   failedCallback.invoke(t.getMessage());
            }
        });
    }



    //用户数据更新
    @ReactMethod
    public void updateUserInfo(final ReadableMap data,final Callback successCallback, final Callback failedCallback){

        //获取用户数据
        getLoginUser();

//        if(local != ""){
//            //上传图片到服务器(并非与用户联动)
//            UMSSDK.uploadAvatar(local,new OperationCallback<HashMap<String, Object>>(){
//                public void onSuccess(HashMap<String, Object> map) {
//                    //只需传递头像id
//                    hashMap.put(u.avatarId.getName(),map.get("id"));
////                    hashMap.put(u.avatar.getName(),map.get("avatar"));
//
//                    avatar = map.get("avatar").toString();
//
//                }
//                public void onFailed(Throwable t) {
//
////                    failedCallback.invoke(t.getMessage());
//                }
//            });
//
//        }
        

        hashMap.put(u.nickname.getName(),data.getString("nickname"));
        hashMap.put(u.gender.getName(),Gender.valueOf(data.getInt("gender")));
        hashMap.put(u.signature.getName(),data.getString("signature"));

        UMSSDK.updateUserInfo(hashMap,new OperationCallback<Void>(){
            public void onSuccess(Void v) {
                successCallback.invoke("success");
            }
            public void onFailed(Throwable t) {
                failedCallback.invoke(t.getMessage());
            }
        });



    }


    //获取当前用户信息
    @ReactMethod
    public void getLoginUser(){
        UMSSDK.getLoginUser(new OperationCallback<User>(){
                public void onSuccess(User user) {
                    u = user;

                }
            public void onFailed(Throwable t) {
//                failedCallback.invoke(t.getMessage());
            }
        });
    }

    //请求用于重置密码的短信验证码
    @ReactMethod
    public void sendVerifyCodeForResetPassword(String country,String phone,final Callback successCallback, final Callback failedCallback){
        UMSSDK.sendVerifyCodeForResetPassword(country,phone,new OperationCallback<Boolean>(){
            public void onSuccess(Boolean bool) {
                successCallback.invoke("success");
            }
            public void onFailed(Throwable t) {

                // 提示错误信息
                /*连续点击会崩溃*/
                try {
                    t.printStackTrace();
                    JSONObject object = new JSONObject(t.getMessage());
                    String des = object.optString("detail");//错误描述
                    int status = object.optInt("status");//错误代码
                    if (status > 0 && !TextUtils.isEmpty(des)) {

                        failedCallback.invoke(des);
                        return;

                    }
                }
                catch(Exception e){

                    failedCallback.invoke(t.getMessage());
                }

            }
        });
    }

    //以电话号码执行重置密码
    @ReactMethod
    public void resetPasswordWithPhoneNumber(String country, String phone, String vcode, String pwd,final Callback successCallback, final Callback failedCallback){
        UMSSDK.resetPasswordWithPhoneNumber(country,phone,vcode,pwd,new OperationCallback<Void>(){
            public void onSuccess(Void v) {
                successCallback.invoke("success");
            }
            public void onFailed(Throwable t) {
                failedCallback.invoke(t.getMessage());
            }
        });

//        UMSSDK.loginWithSocialAccount(SocialNetwork.WECHAT,new OperationCallback<User>() {
//            public void onSuccess(User user) {
//                // 执行成功的操作,获取用户信息
//                successCallback.invoke(user.tabulate().toString());
//            }
//            public void onFailed(Throwable t) {
//                // 提示错误信息
//                //Toast.makeText(myContext, t.getMessage(), Toast.LENGTH_SHORT).show();
//                failedCallback.invoke(t.getMessage());
//            }
//        });
    }

    //第三方登录
    @ReactMethod
    public void loginWithSocialAccount(Integer num,final Callback successCallback, final Callback failedCallback) {
        if(num==1){

            Platform platform = ShareSDK.getPlatform(SinaWeibo.NAME);
            platform.SSOSetting(true);
//            platform.setPlatformActionListener(platform);
//            platform.authorize();

            UMSSDK.loginWithSocialAccount(SocialNetwork.SINA_WEIBO,new OperationCallback<User>() {
                public void onSuccess(User user) {
                    // 执行成功的操作,获取用户信息
                    successCallback.invoke(user.tabulate().toString());
                }
                public void onFailed(Throwable t) {
                    // 提示错误信息
                    failedCallback.invoke(t.getMessage());
                }
            });
        }else if(num==24){
            UMSSDK.loginWithSocialAccount(SocialNetwork.QQ,new OperationCallback<User>() {
                public void onSuccess(User user) {
                    // 执行成功的操作,获取用户信息
                    successCallback.invoke(user.tabulate().toString());
                }
                public void onFailed(Throwable t) {
                    // 提示错误信息
                    failedCallback.invoke(t.getMessage());
                }
            });
        }else if(num==22){
            UMSSDK.loginWithSocialAccount(SocialNetwork.WECHAT,new OperationCallback<User>() {
                public void onSuccess(User user) {
                    // 执行成功的操作,获取用户信息
                    successCallback.invoke(user.tabulate().toString());
                }
                public void onFailed(Throwable t) {
                    // 提示错误信息
                    failedCallback.invoke(t.getMessage());
                }
            });
        }

    }


    //修改密码
    @ReactMethod
    public void changePassword(String newPassword,String oldPassword,final Callback successCallback, final Callback failedCallback){
        UMSSDK.changePassword(newPassword,oldPassword,new OperationCallback<Void>(){
            public void onSuccess(Void v) {
                successCallback.invoke("success");
            }
            public void onFailed(Throwable t) {
                failedCallback.invoke(t.getMessage());
            }
        });
    }


}
