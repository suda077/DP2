//
//  UMSApplyAddFriendData.h
//  UMSSDK
//
//  Created by 刘靖煌 on 17/6/7.
//  Copyright © 2017年 mob.com. All rights reserved.
//

#import <JiMu/JiMu.h>
#import <MOBFoundation/IMOBFDataModel.h>
#import <JiMu/JIMUDataModel.h>
#import "UMSUser.h"
#import "UMSTypeDefine.h"

@interface UMSApplyAddFriendData : JIMUDataModel<IMOBFDataModel>

/**
 申请好友的用户ID
 */
@property (nonatomic, copy, readonly) NSString *applyId;

/**
 申请好友的用户信息
 */
@property (nonatomic, copy, readonly) NSString *applyMessage;

/**
 申请时间
 */
@property (nonatomic, assign, readonly) NSTimeInterval applyTime;

/**
 申请状态
 */
@property (nonatomic, assign) UMSDealWithRequestStatus requestStatus;

/**
 申请好友的用户
 */
@property (nonatomic, strong, readonly) UMSUser *user;

@end
