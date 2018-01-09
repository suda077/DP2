//
//  JIMDataModel.h
//  JiMu
//
//  Created by 冯鸿杰 on 17/2/21.
//  Copyright © 2017年 Mob. All rights reserved.
//

#import <MOBFoundation/MOBFDataModel.h>
#import "IJIMUDataObject.h"

/**
 数据模式
 */
@interface JIMUDataModel : MOBFDataModel <IJIMUDataObject>

/**
 设置数值

 @param value 数值
 @param fieldName 名称
 */
- (void)setNumber:(NSNumber *)value fieldName:(NSString *)fieldName;

/**
 设置字符串

 @param value 字符串
 @param fieldName 名称
 */
- (void)setString:(NSString *)value fieldName:(NSString *)fieldName;

/**
 设置布尔值

 @param value 布尔值
 @param fieldName 名称
 */
- (void)setBool:(BOOL)value fieldName:(NSString *)fieldName;

/**
 设置日期

 @param value 日期
 @param fieldName 名称
 */
- (void)setDate:(NSDate *)value fieldName:(NSString *)fieldName;

/**
 设置数组

 @param value 数组
 @param fieldName 名称
 */
- (void)setArray:(NSArray *)value fieldName:(NSString *)fieldName;

/**
 设置对象

 @param value 对象，必须实现IJIMUDataObject协议
 @param fieldName 名称
 */
- (void)setObject:(id<IJIMUDataObject>)value fieldName:(NSString *)fieldName;

@end
