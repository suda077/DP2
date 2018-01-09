//
//  JIMULocation.h
//  JiMu
//
//  Created by 冯鸿杰 on 17/2/21.
//  Copyright © 2017年 Mob. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 地理位置常量
 */
@interface JIMULocationConstant : NSObject

/**
 名字
 */
@property (nonatomic, copy, readonly) NSString *name;

/**
 获取国家列表

 @return 国家列表
 */
+ (NSArray<JIMULocationConstant *> *)countries;

/**
 获取省份列表

 @param country 国家
 @return 省份列表
 */
+ (NSArray<JIMULocationConstant *> *)provinces:(JIMULocationConstant *)country;

/**
 获取城市列表

 @param province 省
 @return 城市列表
 */
+ (NSArray<JIMULocationConstant *> *)cities:(JIMULocationConstant *)province;

/**
 获取位置

 @param index 地区索引
 @return 位置信息
 */
+ (JIMULocationConstant *)getLocation:(int)index;


/**
 获取搜索位置索引，配合getLocation使用，如：查找中国上海，则为：[JIMULocationConstant getLocation:JIMULocationConstant.search.China.Shanghai.index];

 @return 位置索引
 */
+ (struct JIMULocationSearchIndex)search;

@end
