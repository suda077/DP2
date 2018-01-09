//
//  JIMUQuery+UMS.h
//  UMSSDK
//
//  Created by 刘靖煌 on 17/3/10.
//  Copyright © 2017年 mob.com. All rights reserved.
//

#import <JiMu/JiMu.h>

/**
 数据查询类
 */
@interface JIMUQuery (UMS)

/**
 用户数据查询

 @return 用户数据查询结果
 */
+ (void)usersQueryHandler:(void (^) (JIMUQuery *query))queryHandler;

/**
 绑定数据查询

 @return 绑定数据查询结果
 */
+ (void)bindingDataQueryHandler:(void (^) (JIMUQuery *query))queryHandler;

/**
 好友列表查询

 @return 好友列表查询结果
 */
+ (void)friendListQueryHandler:(void (^) (JIMUQuery *query))queryHandler;

/**
 好友申请查询

 @return 好友申请结果
 */
+ (void)addFriendRequestQueryHandler:(void (^) (JIMUQuery *query))queryHandler;

/**
 好友申请列表查询
 */
+ (void)invitedFriendListQueryHandler:(void (^) (JIMUQuery *query))queryHandler;

/**
 用户黑名单查询

 @return 黑名单查询结果
 */
+ (void)blockUserQueryHandler:(void (^) (JIMUQuery *query))queryHandler;

/**
 粉丝列表查询
 
 @return 粉丝列表查询结果
 */
+ (void)fansListQueryHandler:(void (^) (JIMUQuery *query))queryHandler;

@end
