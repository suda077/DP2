//
//  UMS.m
//  DP2
//
//  Created by 七海 on 2017/12/5.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "UMS.h"


@implementation UMS

//  导出模块，不添加参数即默认为这个类名
RCT_EXPORT_MODULE();


//  导出方法，桥接到js的方法返回值类型必须是void
//  对外提供调用方法（doSomething为方法名，后面为参数，按顺序和对应数据类型在js进行传递）
RCT_EXPORT_METHOD(doSomething:
                  (NSString *)testStr
                  resolver:(RCTResponseSenderBlock)callback
                  ){
  RCTLog(@"%@",testStr);
  
  NSString *callbackData = @"Callback数据"; //准备回调回去的数据
  callback(@[[NSNull null],callbackData]);
  
}


// 导出方法，桥接到js的方法返回值类型必须是void
/*有两个回调，一个为正确的，一个为error*/
RCT_REMAP_METHOD(testPromisesEvent,
                 testStr:(NSString *)testStr
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSString *PromisesData = @"Promises数据"; //准备回调回去的数据
  if (PromisesData) {
    resolve(testStr);
  } else {
    NSError *error=[NSError errorWithDomain:@"我是Promise回调错误信息..." code:101 userInfo:nil];
    reject(@"no_events", @"There were no events", error);
  }
}






//发送验证码注册
RCT_EXPORT_METHOD(sendVerifyCodeForRegitser:
                 (NSString *)country
                 phone:(NSString *)phone
                 successCallback:(RCTResponseSenderBlock)successCallback
                 failedCallback:(RCTResponseSenderBlock)failedCallback)
{
  
  [UMSSDK getRegisterVerificationCodeWithPhone:phone areaCode:country result:^(NSError *error) {
    if (!error) {
      successCallback(@[@"success"]);
    }
    else
    {
      failedCallback(@[error.userInfo.allValues[0]]);
    }
  }];
  
};

//号码注册
RCT_EXPORT_METHOD(registerWithPhoneNumber:
                  (NSString *)country
                  phone:(NSString *)phone
                  vcode:(NSString *)vcode
                  pwd:(NSString *)pwd
                  content:(NSDictionary *)content
                  successCallback:(RCTResponseSenderBlock)successCallback
                  failedCallback:(RCTResponseSenderBlock)failedCallback){
  [UMSSDK registerWithPhone:phone areaCode:country password:pwd smsCode:vcode result:^(UMSUser *user, NSError *error) {
    if (!error) {
      successCallback(@[user.dictionaryValue]);
    }
    else
    {
      failedCallback(@[error.userInfo.allValues[0]]);
    }
  }];
}



//上传图片
//RCT_EXPORT_METHOD(uploadAvatar:
//                  (NSString *)local
//                  successCallback:(RCTResponseSenderBlock)successCallback
//                  failedCallback:(RCTResponseSenderBlock)failedCallback){
//
//  [UMSSDK uploadUserAvatarWithImage:[UIImage imageNamed:local] platformType:UMSPlatformTypeSinaWeibo result:^(UMSAvatar *avatar, NSError *error) {
//         if (!error) {
//           //把avatarID传递到RN端
//
//           [UMSSDK getUserInfoWithResult:^(UMSUser *user, NSError *error) {
//
//             if (!error)
//             {
//               UMSUser *currentUser = user;
//               currentUser.avatars = avatar;
//
//               [UMSSDK updateUserInfoWithUser:currentUser
//                                       result:^(UMSUser *user, NSError *error) {
//
//                  successCallback(@[user.dictionaryValue]);
//
//              }];
//             }
//           }];
//
////          successCallback(@[avatar.dictionaryValue]);
//
//         }
//         else
//         {
//           failedCallback(@[error.userInfo.allValues[0]]);
//         }
//       }];
//}

//获取当前用户信息
RCT_EXPORT_METHOD(getLoginUser){
  [UMSSDK getUserInfoWithResult:^(UMSUser *user, NSError *error) {
    if (!error) {
      NSLog(@"成功");
    }
    else
    {
      NSLog(@"%@",error);
    }
  }];
}

//用户数据更新
RCT_EXPORT_METHOD(updateUserInfo:
                  (NSDictionary *)data
                  successCallback:(RCTResponseSenderBlock)successCallback
                  failedCallback:(RCTResponseSenderBlock)failedCallback){
  
  UMSUser * currentUser = [[UMSUser alloc] init];
  
  currentUser.nickname= [data objectForKey:@"nickname"];
  
  if([[data objectForKey:@"gender"] intValue] == 1){
    currentUser.gender= JIMUGenderConstantMale;
  }else if([[data objectForKey:@"gender"] intValue]== 2){
    currentUser.gender= JIMUGenderConstantFemale;
  }else{
    currentUser.gender= JIMUGenderConstantSecret;
  }

  currentUser.signature= [data objectForKey:@"signature"];
  
  //当有头像数据时
  if([data objectForKey:@"local"] != NULL){
    
    [UMSSDK uploadUserAvatarWithImage:[UIImage imageNamed:[data objectForKey:@"local"]] platformType:UMSPlatformTypeSinaWeibo result:^(UMSAvatar *avatar, NSError *error) {
      if (!error) {
        [UMSSDK getUserInfoWithResult:^(UMSUser *user, NSError *error) {
          if (!error)
          {
            currentUser.avatars = avatar;
            
            [UMSSDK updateUserInfoWithUser:currentUser
                                    result:^(UMSUser *user, NSError *error) {
              
              successCallback(@[user.dictionaryValue]);
              
            }];
          }
          else
          {
            failedCallback(@[error.userInfo.allValues[0]]);
          }
        }];
      }
      else
      {
        failedCallback(@[error.userInfo.allValues[0]]);
      }
    }];
    
  }else{//没有头像数据时
    [UMSSDK updateUserInfoWithUser:currentUser result:^(UMSUser *user, NSError *error) {
      if (!error) {
        successCallback(@[user.dictionaryValue]);
      }
      else
      {
        failedCallback(@[error.userInfo.allValues[0]]);
      }
    }];
  }
  

  
}


//手机登录
RCT_EXPORT_METHOD(loginWithPhoneNumber:
                  (NSString *)country
                  phone:(NSString *)phone
                  pwd:(NSString *)pwd
                  successCallback:(RCTResponseSenderBlock)successCallback
                  failedCallback:(RCTResponseSenderBlock)failedCallback){
  
  [UMSSDK loginWithPhone:phone areaCode:country password:pwd result:^(UMSUser *user, NSError *error) {
    if (!error) {
      //      RCTLog(@"%@",user.description);
      successCallback(@[user.dictionaryValue]);
    }
    else
    {
      //      RCTLog(@"%@",error.userInfo.allValues);
      failedCallback(@[error.userInfo.allValues[0],[NSNull null]]);
    }
  }];
  
}

//修改密码
RCT_EXPORT_METHOD(changePassword:
                  (NSString *)newPassword
                  oldPassword:(NSString *)oldPassword
                  successCallback:(RCTResponseSenderBlock)successCallback
                  failedCallback:(RCTResponseSenderBlock)failedCallback){
  [UMSSDK modifyPasswordWithPhone: [UMSSDK currentUser].phone newPassword:newPassword oldPassword:oldPassword result:^(NSError *error) {
    if (!error) {
      successCallback(@[@"success"]);
    }
    else
    {
      failedCallback(@[error.userInfo.allValues[0]]);
    }
  }];
}

//登出
RCT_EXPORT_METHOD(logout:
                  (RCTResponseSenderBlock)successCallback
                  failedCallback:(RCTResponseSenderBlock)failedCallback){
  [UMSSDK logoutWithResult:^(NSError *error) {
    if (!error) {
      successCallback(@[@"success"]);
    }
    else
    {
      failedCallback(@[error.userInfo.allValues[0]]);
    }
  }];
}

//请求用于重置密码的短信验证码
RCT_EXPORT_METHOD(sendVerifyCodeForResetPassword:
                  (NSString *)country
                  phone:(NSString *)phone
                  successCallback:(RCTResponseSenderBlock)successCallback
                  failedCallback:(RCTResponseSenderBlock)failedCallback){
  [UMSSDK getResetPasswordVerificationCodeWithPhone:phone areaCode:country result:^(NSError *error) {
    if (!error) {
      successCallback(@[@"验证码发送成功"]);
    }
    else
    {
      failedCallback(@[error.userInfo.allValues[0]]);
    }
  }];
}

//以电话号码执行重置密码
RCT_EXPORT_METHOD(resetPasswordWithPhoneNumber:
                  (NSString *)country
                  phone:(NSString *)phone
                  vcode:(NSString *)vcode
                  pwd:(NSString *)pwd
                  successCallback:(RCTResponseSenderBlock)successCallback
                  failedCallback:(RCTResponseSenderBlock)failedCallback
                  ){
  [UMSSDK resetPasswordWithPhone:phone areaCode:country newPassword:pwd smsCode:vcode  result:^(NSError *error) {
    if (!error) {
      successCallback(@[@"修改成功"]);
    }
    else
    {
      failedCallback(@[error.userInfo.allValues[0]]);
    }
  }];
}


//第三方登录
RCT_EXPORT_METHOD(loginWithSocialAccount:
                  (NSInteger *)num
                  successCallback:(RCTResponseSenderBlock)successCallback
                  failedCallback:(RCTResponseSenderBlock)failedCallback){
  
  if((int)num == 24){
    [UMSSDK loginWithPlatformType:UMSPlatformTypeQQ result:^(UMSUser *user, NSError *error) {
      if (!error) {
        successCallback(@[user.dictionaryValue]);
      }
      else
      {
        failedCallback(@[error.userInfo.allValues[0]]);
      }
    }];
  }else if((int)num == 1){
    [UMSSDK loginWithPlatformType:UMSPlatformTypeSinaWeibo result:^(UMSUser *user, NSError *error) {
      if (!error) {
        successCallback(@[user.dictionaryValue]);
      }
      else
      {
        failedCallback(@[error.userInfo.allValues[0]]);
      }
    }];
  }else if((int)num == 22){
    [UMSSDK loginWithPlatformType:UMSPlatformTypeWechat result:^(UMSUser *user, NSError *error) {
      if (!error) {
        successCallback(@[user.dictionaryValue]);
      }
      else
      {
        failedCallback(@[error.userInfo.allValues[0]]);
      }
    }];
  }
  
  
}



@end
