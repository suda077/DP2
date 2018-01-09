//
//  UMSBindingData.h
//  UMSSDK
//
//  Created by 刘靖煌 on 17/3/24.
//  Copyright © 2017年 mob.com. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <MOBFoundation/IMOBFDataModel.h>
#import <JiMu/JIMUDataModel.h>
#import "UMSTypeDefine.h"

/**
 *  绑定数据模型
 */
@interface UMSBindingData : JIMUDataModel<IMOBFDataModel>

/**
 *  绑定数据ID
 */
@property (nonatomic, copy, readonly) NSString *bindID;

/**
 *  绑定平台类型
 */
@property (nonatomic, assign, readonly) UMSPlatformType bindType;

/**
 *  手机区号，当绑定平台类型为手机时才有数据
 */
@property (nonatomic, copy, readonly) NSString *phoneZone;

@end
