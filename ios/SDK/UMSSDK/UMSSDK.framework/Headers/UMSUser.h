//
//  UMSUser.h
//  UMSSDK
//
//  Created by 刘靖煌 on 17/2/23.
//  Copyright © 2017年 mob.com. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <JiMu/JIMUDataModel.h>
#import <JiMu/JIMUGenderConstant.h>
#import <JiMu/JIMUConstellationConstant.h>
#import <JiMu/JIMUZodiacConstant.h>
#import <JiMu/JIMULocationConstant.h>
#import "UMSTypeDefine.h"
#import "UMSAvatar.h"
#import <MOBFoundation/IMOBFUser.h>
#import "UMSUserCustomFields.h"
#import <CoreLocation/CoreLocation.h>

@interface UMSUser : JIMUDataModel <IMOBFUser>

/**
 *  用户ID
 */
@property (nonatomic, copy, readonly) NSString *uid;

/**
 *  昵称
 */
@property (nonatomic, copy) NSString *nickname;

/**
 *  头像
 */
@property (nonatomic, strong) UMSAvatar *avatars;

/**
 *  性别
 */
@property (nonatomic, strong) JIMUGenderConstant *gender;

/**
 *  生日：修改生日会联动触发修改年龄、星座以及生肖，反之则不会
 */
@property (nonatomic, strong) NSDate *birthday;

/**
 *  年龄
 */
@property (nonatomic, strong) NSNumber *age;

/**
 *  星座
 */
@property (nonatomic, strong) JIMUConstellationConstant *constellation;

/**
 *  生肖
 */
@property (nonatomic, strong) JIMUZodiacConstant *zodiac;

/**
 *  国家
 */
@property (nonatomic, strong) JIMULocationConstant *country;

/**
 *  省份
 */
@property (nonatomic, strong) JIMULocationConstant *province;

/**
 *  城市
 */
@property (nonatomic, strong) JIMULocationConstant *city;

/**
 *  签名（500个字符以内）
 */
@property (nonatomic, copy) NSString *signature;

/**
 *  邮件
 */
@property (nonatomic, copy) NSString *email;

/**
 *  地址（500个字符以内）
 */
@property (nonatomic, copy) NSString *address;

/**
 *  邮编
 */
@property (nonatomic , assign) NSInteger zipCode;

/**
 *  个人说明（800个字符以内）
 */
@property (nonatomic, copy) NSString *resume;

/**
 *  登录时间
 */
@property (nonatomic, strong) NSDate *loginAt;

/**
 *  手机号
 */
@property (nonatomic, copy, readonly) NSString *phone;

/**
 *  手机区号
 */
@property (nonatomic, copy, readonly) NSString *phoneZone;

/**
 *  地理位置
 */
@property (nonatomic, assign, readonly) CLLocationCoordinate2D location;

/**
 *  自定义字段
 */
@property (nonatomic, strong) UMSUserCustomFields *customInfo;

/**
 粉丝数
 */
@property (nonatomic, assign, readonly) NSUInteger fansCount;

/**
 关注数
 */
@property (nonatomic, assign, readonly) NSUInteger followCount;

/**
 相互关注数
 */
@property (nonatomic, assign, readonly) NSUInteger coFollowCount;

/**
 好友数
 */
@property (nonatomic, assign, readonly) NSUInteger friendCount;

/**
 获取和某人的好友关系

 @param user    待获取的用户
 @param handler 结果
 */
- (void)fetchFriendRelationshipWithUser:(UMSUser *)user
                                 result:(UMSGetUserInfoResult)handler;

/**
 获取和某人的粉丝关系

 @param user    待获取的用户
 @param handler 结果
 */
- (void)fetchFansRelationshipWithUser:(UMSUser *)user
                               result:(UMSGetUserInfoResult)handler;

/**
 获取和某人的拉黑关系

 @param user    待获取的用户
 @param handler 结果
 */
- (void)fetchBlockRelationshipWithUser:(UMSUser *)user
                                result:(UMSGetUserInfoResult)handler;


/**
 是否为好友关系，配合fetchFriendRelationshipWithUser:result:使用
 */
@property (nonatomic, assign, readonly) BOOL isFriend;

/**
 粉丝关系，配合fetchFansRelationshipWithUser:result:使用
 */
@property (nonatomic, assign, readonly) UMSRelationship fansRelationship;

/**
 是否拉黑，配合fetchBlockRelationshipWithUser:result:使用
 */
@property (nonatomic, assign, readonly) BOOL isBlock;

/**
 *  第三方登录的原始数据
 */
@property (nonatomic, strong, readonly) NSDictionary *snsUserData;

@end
