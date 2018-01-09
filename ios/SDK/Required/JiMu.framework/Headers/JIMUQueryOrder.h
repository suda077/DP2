//
//  JIMQueryOrder.h
//  Jimu
//
//  Created by 冯鸿杰 on 17/2/13.
//  Copyright © 2017年 Mob. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 查询排序
 */
@interface JIMUQueryOrder : NSObject

/**
 正序
 */
+ (JIMUQueryOrder* (^) (NSString *field))asc;

/**
 倒序
 */
+ (JIMUQueryOrder* (^) (NSString *field))desc;

/**
 正序
 */
- (JIMUQueryOrder* (^) (NSString *field))asc;

/**
 倒序
 */
- (JIMUQueryOrder* (^) (NSString *field))desc;

@end
