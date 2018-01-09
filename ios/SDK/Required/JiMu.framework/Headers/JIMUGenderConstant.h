//
//  JIMUGender.h
//  JiMu
//
//  Created by 冯鸿杰 on 17/2/23.
//  Copyright © 2017年 Mob. All rights reserved.
//

#import <Foundation/Foundation.h>

#define JIMUGenderConstantMale ([JIMUGenderConstant getGender:JIMUGenderConstant.search.Male.index])
#define JIMUGenderConstantFemale ([JIMUGenderConstant getGender:JIMUGenderConstant.search.Female.index])
#define JIMUGenderConstantSecret ([JIMUGenderConstant getGender:JIMUGenderConstant.search.Secret.index])

/**
 性别搜索索引
 */
struct JIMUGenderSearchIndex
{
    struct JIMUMale1
    {
        int index;
    } Male;
    struct JIMUFemale2
    {
        int index;
    } Female;
    struct JIMUSecret3
    {
        int index;
    } Secret;
};

/**
 性别常量
 */
@interface JIMUGenderConstant : NSObject

/**
 名字
 */
@property (nonatomic, copy, readonly) NSString *name;

/**
 获取性别列表

 @return 性别列表
 */
+ (NSArray<JIMUGenderConstant *> *)genders;

/**
 获取性别信息

 @param index 性别索引
 @return 性别信息
 */
+ (JIMUGenderConstant *)getGender:(NSInteger)index;

/**
 获取性别搜索位置索引,配合getGender使用，如：查找性别男，则为：[JIMUGenderConstant getGender:JIMUGenderConstant.search.Male.index];

 @return 性别信息
 */
+ (struct JIMUGenderSearchIndex)search;

@end
