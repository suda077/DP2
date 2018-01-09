//
//  UMSSDK.h
//  UMSSDK
//
//  Created by 刘靖煌 on 17/2/23.
//  Copyright © 2017年 mob.com. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "UMSTypeDefine.h"
#import "UMSUser.h"
#import "UMSAvatar.h"

@interface UMSSDK : NSObject

/**
 获取注册短信验证码

 @param phone    手机号
 @param areaCode 电话地区号
 @param handler  请求结果
 */
+ (void)getRegisterVerificationCodeWithPhone:(NSString *)phone
                                    areaCode:(NSString *)areaCode
                                      result:(void (^) (NSError *error))handler;
/**
 用户注册

 @param phone    手机号
 @param areaCode 电话地区号
 @param password 密码
 @param code     短信验证码
 @param handler  注册结果
 */
+ (void)registerWithPhone:(NSString *)phone
                 areaCode:(NSString *)areaCode
                 password:(NSString *)password
                  smsCode:(NSString *)code
                   result:(UMSRegisterResult)handler;

/**
 用户登录

 @param phone    手机号
 @param areaCode 电话地区号
 @param password 密码
 @param handler  登录结果
 */
+ (void)loginWithPhone:(NSString *)phone
              areaCode:(NSString *)areaCode
              password:(NSString *)password
                result:(UMSLoginResult)handler;
/**
 第三方登录

 @param platformType 社交账号类型
 @param handler      第三方登录结果
 */
+ (void)loginWithPlatformType:(UMSPlatformType)platformType
                       result:(UMSLoginResult)handler;

/**
 退出登录

 @param handler 退出登录结果
 */
+ (void)logoutWithResult:(UMSLogoutResult)handler;

/**
 账号绑定

 @param phone    手机号
 @param areaCode 电话地区号
 @param code     短信验证码，code的值需要通过getRegisterVerificationCodeWithPhone接口获取。
 @param password 密码
 @param handler  账号绑定结果
 */
+ (void)accountBindingWithPhone:(NSString *)phone
                       areaCode:(NSString *)areaCode
                        smsCode:(NSString *)code
                       password:(NSString *)password
                         result:(UMSAccountBindingResult)handler;

/**
 社交账号绑定

 @param platformType 社交平台类型
 @param handler      账号绑定结果
 */
+ (void)accountBindingWithPlatformType:(UMSPlatformType)platformType
                                result:(UMSAccountBindingResult)handler;

/**
 获取注册的用户资料

 @param handler 获取用户资料结果
 */
+ (void)getUserInfoWithResult:(UMSGetUserInfoResult)handler;

/**
 获取绑定账户数据

 @param handler 获取绑定账户数据结果
 */
+ (void)getBindingDataWithResult:(UMSGetBindingDataResult)handler;

/**
 更新用户资料

 @param user    用户模型
 @param handler 更新用户资料结果
 */
+ (void)updateUserInfoWithUser:(UMSUser *)user
                        result:(UMSUpdateUserInfoResult)handler;

/**
 获取重置密码的短信验证码

 @param phone    手机号
 @param areaCode 电话地区号
 @param handler  结果
 */
+ (void)getResetPasswordVerificationCodeWithPhone:(NSString *)phone
                                         areaCode:(NSString *)areaCode
                                           result:(void (^) (NSError *error))handler;

/**
 重置密码

 @param phone    手机号
 @param areaCode 电话地区号
 @param password 密码
 @param code     短信验证码，code的值需要通过getResetPasswordVerificationCodeWithPhone接口获取。
 @param handler  重置密码结果
 */
+ (void)resetPasswordWithPhone:(NSString *)phone
                      areaCode:(NSString *)areaCode
                   newPassword:(NSString *)password
                       smsCode:(NSString *)code
                        result:(UMSResetPasswordResult)handler;

/**
 修改密码

 @param phone       手机号
 @param newPassword 新密码
 @param oldPassword 旧密码
 @param handler     修改密码结果
 */
+ (void)modifyPasswordWithPhone:(NSString *)phone
                    newPassword:(NSString *)newPassword
                    oldPassword:(NSString *)oldPassword
                         result:(UMSModifyPasswordResult)handler;

/**
 支持第三方登录的平台

 @param handler 支持第三方登录的平台
 */
+ (void)supportedLoginPlatforms:(void (^)(NSArray *supportedPlatforms))handler;

/**
 上传头像

 @param avatar  需要上传的图片
 @param platformType  图片来源
 @param handler 上传图片处理结果
 */
+ (void)uploadUserAvatarWithImage:(UIImage*)avatar
                     platformType:(UMSPlatformType)platformType
                           result:(void (^) (UMSAvatar *avatar,NSError *error))handler;

/**
 获取当前用户

 @return 当前用户
 */
+ (UMSUser *)currentUser;

@end
