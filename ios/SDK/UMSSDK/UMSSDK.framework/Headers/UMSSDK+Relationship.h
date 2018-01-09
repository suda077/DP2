//
//  UMSSDK+Relationship.h
//  UMSSDK
//
//  Created by 刘靖煌 on 17/5/24.
//  Copyright © 2017年 mob.com. All rights reserved.
//

#import <UMSSDK/UMSSDK.h>
#import "UMSTypeDefine.h"
#import "UMSApplyAddFriendData.h"

@interface UMSSDK (Relationship)

#pragma mark -
#pragma mark 好友接口

/**
 删除好友
 
 @param user 待删除的用户
 @param handler 结果
 */
+ (void)deleteFriendWithUser:(UMSUser *)user
                      result:(UMSDeleteFriendResult)handler;

/**
 获取申请好友列表
 
 @param handler 结果
 */
+ (void)getInvitedFriendListWithUser:(UMSUser *)user
                              status:(UMSDealWithRequestStatus)status
                             pageNum:(NSUInteger)pageNum
                            pageSize:(NSUInteger)pageSize
                              result:(UMSGetApplyAddFriendListResult)handler;

/**
 添加好友申请
 
 @param user 添加的好友
 @param message 留言
 @param handler 结果
 */
+ (void)addFriendRequestWithUser:(UMSUser *)user
                         message:(NSString *)message
                          result:(UMSAddFriendRequestResult)handler;

/**
 处理好友申请
 
 @param user  处理申请好友的
 @param status 是否同意
 @param handler 结果
 */
+ (void)dealWithFriendRequestWithUser:(UMSUser *)user
                                reply:(UMSDealWithRequestStatus)status
                               result:(UMSDealWithFriendRequestResult)handler;

/**
 获取好友列表

 @param handler 回调
 */
+ (void)getFriendListWithUser:(UMSUser *)user
                      pageNum:(NSUInteger)pageNum
                     pageSize:(NSUInteger)pageSize
                       result:(UMSGetUserListResult)handler;

#pragma mark 用户接口

/**
 获取指定用户的信息
 
 @param userID    用户
 @param handler 结果
 */
+ (void)getUserInfoWithUserID:(NSString *)userID
                       result:(UMSGetUserInfoResult)handler;

/**
 获取指定用户的绑定账户数据
 
 @param user    用户
 @param handler 获取绑定账户数据结果
 */
+ (void)getBindingDataWithUser:(UMSUser *)user
                        result:(UMSGetBindingDataResult)handler;


/**
 拉黑用户

 @param user    被拉黑的用户
 @param handler 结果
 */
+ (void)blockUser:(UMSUser *)user
           result:(UMSBlockUserResult)handler;

/**
 获取拉黑好友列表
 
 @param user 用户
 @param handler 结果
 */
+ (void)getBlockedUserListWithUser:(UMSUser *)user
                           pageNum:(NSUInteger)pageNum
                          pageSize:(NSUInteger)pageSize
                            result:(UMSGetUserListResult)handler;

/**
 从黑名单中移除用户
 
 @param user 用户
 @param handler 结果
 */
+ (void)removeFromBlockedUserListWithUser:(UMSUser *)user
                                   result:(UMSRemoveFromBlockListResult)handler;


#pragma mark 最近登录列表

/**
 最近登录列表
 
 @param pageNum  页码
 @param pageSize 每页数量
 @param handler  结果
 */
+ (void)getRecentLoginUserListWithPageNum:(NSUInteger)pageNum
                                 pageSize:(NSUInteger)pageSize
                                   result:(UMSGetUserListResult)handler;

#pragma mark 粉丝接口

/**
 取消关注

 @param user 待取消关注的用户
 @param handler 结果
 */
+ (void)unfollowUserWithUser:(UMSUser *)user
                      result:(UMSUnfollowResult)handler;

/**
 关注接口

 @param user 待关注用户
 @param handler 结果
 */
+ (void)followWithUser:(UMSUser *)user
                result:(UMSFollowResult)handler;


/**
 获取粉丝相关列表

 @param user         待查询的用户ID
 @param relationship 关系（包含关注、粉丝、相互关注）
 @param pageNum      页码
 @param pageSize     每页大小
 @param handler      结果
 */
+ (void)getFansListWithUser:(UMSUser *)user
               relationship:(UMSRelationship)relationship
                    pageNum:(NSUInteger)pageNum
                   pageSize:(NSUInteger)pageSize
                     result:(UMSGetUserListResult)handler;

#pragma mark 搜索

/**
 根据关键字查找用户

 @param key      关键字（可以是昵称、电话、ID）
 @param pageNum  页码
 @param pageSize 每页大小
 @param handler  结果
 */
+ (void)searchForUserWithKey:(NSString *)key
                     pageNum:(NSUInteger)pageNum
                    pageSize:(NSUInteger)pageSize
                      result:(UMSGetUserListResult)handler;

@end
