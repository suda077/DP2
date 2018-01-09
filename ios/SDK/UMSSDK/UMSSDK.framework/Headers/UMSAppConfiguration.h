//
//  UMSAppConfiguration.h
//  UMSSDK
//
//  Created by 刘靖煌 on 17/2/28.
//  Copyright © 2017年 mob.com. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface UMSAppConfiguration : NSObject

/**
 *  服务器时间戳, 用于矫正客户端时间
 */
@property (nonatomic, assign) NSTimeInterval timestamp;

/**
 *  默认请求地址
 */
@property (nonatomic, copy) NSString *defHost;

/**
 *  默认请求端口
 */
@property (nonatomic, copy) NSString *defPort;

/**
 *  标记应用运行时长时间间隔，单位：秒
 */
@property (nonatomic, assign) NSInteger markUseTimeGap;

/**
 *  是否允许获取地理位置, false 为禁止，true 为开启，默认不获取
 */
@property (nonatomic, assign) BOOL readLoc;

/**
 *  是否允许获取手机通讯录, false 为禁止，true 为开启，默认不获取
 */
@property (nonatomic, assign) BOOL readContact;

/**
 *  支持的第三方登录平台
 */
@property (nonatomic, strong) NSArray *loginSns;

/**
 *  视图配置
 */
@property (nonatomic, strong) NSArray *viewConfs;

/**
 *  字典转模型
 */
+ (instancetype)appConfigurationWithDict:(NSDictionary *)dict;

/**
 *  字典转模型
 */
- (instancetype)initWithDict:(NSDictionary *)dict;

@end
