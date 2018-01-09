//
//  JIMQueryCondition.h
//  Jimu
//
//  Created by 冯鸿杰 on 17/2/10.
//  Copyright © 2017年 Mob. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 查询条件，用于提供给JIMDataQuery在进行数据查询时实现条件约束
 */
@interface JIMUQueryCondition : NSObject

/**
 创建查询条件

 @return 查询条件对象
 */
+ (JIMUQueryCondition* (^)(NSString *fieldName, id value))equal;

/**
 使某个字段值不等于指定值
 
 @return 处理block
 */
+ (JIMUQueryCondition* (^)(NSString *fieldName, id value))notEqual;

/**
 是某个值进行模糊查找
 
 @return 处理block
 */
+ (JIMUQueryCondition* (^)(NSString *fieldName, id value))fuzzyMatch;

/**
 使某个字段值大于指定值
 
 @return 处理block
 */
+ (JIMUQueryCondition* (^)(NSString *fieldName, id value))greaterThan;

/**
 使某个字段值小于指定值
 
 @return 处理block
 */
+ (JIMUQueryCondition* (^)(NSString *fieldName, id value))lessThan;

/**
 使某个字段值大于或等于指定值
 
 @return 处理block
 */
+ (JIMUQueryCondition* (^)(NSString *fieldName, id value))greaterThanOrEqual;

/**
 使某个字段值小于或等于指定值
 
 @return 处理block
 */
+ (JIMUQueryCondition* (^)(NSString *fieldName, id value))lessThanOrEqual;

/**
 使某个字段值与指定集合值匹配
 
 @return 处理block
 */
+ (JIMUQueryCondition* (^)(NSString *fieldName, NSArray *values))matches;

/**
 使某个字段值等于指定值
 
 @return 处理block
 */
- (JIMUQueryCondition* (^)(NSString *fieldName, id value))equal;

/**
 是某个值进行模糊查找
 
 @return 处理block
 */
- (JIMUQueryCondition* (^)(NSString *fieldName, id value))fuzzyMatch;

/**
 使某个字段值不等于指定值
 
 @return 处理block
 */
- (JIMUQueryCondition* (^)(NSString *fieldName, id value))notEqual;

/**
 使某个字段值大于指定值
 
 @return 处理block
 */
- (JIMUQueryCondition* (^)(NSString *fieldName, id value))greaterThan;

/**
 使某个字段值小于指定值
 
 @return 处理block
 */
- (JIMUQueryCondition* (^)(NSString *fieldName, id value))lessThan;

/**
 使某个字段值大于或等于指定值
 
 @return 处理block
 */
- (JIMUQueryCondition* (^)(NSString *fieldName, id value))greaterThanOrEqual;

/**
 使某个字段值小于或等于指定值
 
 @return 处理block
 */
- (JIMUQueryCondition* (^)(NSString *fieldName, id value))lessThanOrEqual;

/**
 使某个字段值与指定集合值匹配
 
 @return 处理block
 */
- (JIMUQueryCondition* (^)(NSString *fieldName, NSArray *values))matches;

/**
 条件交集操作

 @return 条件对象
 */
- (JIMUQueryCondition *)and;

/**
 条件并集操作

 @return 条件对象
 */
- (JIMUQueryCondition *)or;

/**
 附加子条件
 
 @return 处理block
 */
- (JIMUQueryCondition* (^)(JIMUQueryCondition *otherCondition))with;

@end
