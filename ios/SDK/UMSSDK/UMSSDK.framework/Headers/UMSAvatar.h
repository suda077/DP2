//
//  UMSAvatar.h
//  UMSSDK
//
//  Created by 刘靖煌 on 17/3/14.
//  Copyright © 2017年 mob.com. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JiMu/JIMUDataModel.h>

@interface UMSAvatar : JIMUDataModel

/**
 *  小图
 */
@property (nonatomic, copy) NSString *min;

/**
 *  中图
 */
@property (nonatomic, copy) NSString *middle;

/**
 *  大图
 */
@property (nonatomic, copy) NSString *max;

/**
 *  返回的头像列表数组生成一个头像数据
 */
+ (instancetype)avatarWithArray:(NSArray *)avatarArray;

@end
