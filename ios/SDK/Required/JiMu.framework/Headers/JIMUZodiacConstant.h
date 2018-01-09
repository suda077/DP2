//
//  JIMUZodiacConstant.h
//  JiMu
//
//  Created by 冯鸿杰 on 17/2/23.
//  Copyright © 2017年 Mob. All rights reserved.
//

#import <Foundation/Foundation.h>

#define JIMUZodiacConstantRat ([JIMUZodiacConstant getZodiac:JIMUZodiacConstant.search.Rat.index])
#define JIMUZodiacConstantOx ([JIMUZodiacConstant getZodiac:JIMUZodiacConstant.search.Ox.index])
#define JIMUZodiacConstantTiger ([JIMUZodiacConstant getZodiac:JIMUZodiacConstant.search.Tiger.index])
#define JIMUZodiacConstantRabbit ([JIMUZodiacConstant getZodiac:JIMUZodiacConstant.search.Rabbit.index])
#define JIMUZodiacConstantDragon ([JIMUZodiacConstant getZodiac:JIMUZodiacConstant.search.Dragon.index])
#define JIMUZodiacConstantSnake ([JIMUZodiacConstant getZodiac:JIMUZodiacConstant.search.Snake.index])
#define JIMUZodiacConstantHorse ([JIMUZodiacConstant getZodiac:JIMUZodiacConstant.search.Horse.index])
#define JIMUZodiacConstantGoat ([JIMUZodiacConstant getZodiac:JIMUZodiacConstant.search.Goat.index])
#define JIMUZodiacConstantMonkey ([JIMUZodiacConstant getZodiac:JIMUZodiacConstant.search.Monkey.index])
#define JIMUZodiacConstantRooster ([JIMUZodiacConstant getZodiac:JIMUZodiacConstant.search.Rooster.index])
#define JIMUZodiacConstantDog ([JIMUZodiacConstant getZodiac:JIMUZodiacConstant.search.Dog.index])
#define JIMUZodiacConstantPig ([JIMUZodiacConstant getZodiac:JIMUZodiacConstant.search.Pig.index])

/**
 生肖搜索索引
 */
struct JIMUZodiacSearchIndex
{
    struct JIMURat1
    {
        int index;
    } Rat;
    struct JIMUOx2
    {
        int index;
    } Ox;
    struct JIMUTiger3
    {
        int index;
    } Tiger;
    struct JIMURabbit4
    {
        int index;
    } Rabbit;
    struct JIMUDragon5
    {
        int index;
    } Dragon;
    struct JIMUSnake6
    {
        int index;
    } Snake;
    struct JIMUHorse7
    {
        int index;
    } Horse;
    struct JIMUGoat8
    {
        int index;
    } Goat;
    struct JIMUMonkey9
    {
        int index;
    } Monkey;
    struct JIMURooster10 
    {
        int index;
    } Rooster;
    struct JIMUDog11 
    {
        int index;
    } Dog;
    struct JIMUPig12 
    {
        int index;
    } Pig;
};

/**
 生肖常量
 */
@interface JIMUZodiacConstant : NSObject

/**
 名字
 */
@property (nonatomic, copy, readonly) NSString *name;

/**
 获取生肖列表

 @return 生肖列表
 */
+ (NSArray<JIMUZodiacConstant *> *)zodiacs;

/**
 获取生肖信息
 
 @param index 生肖索引
 @return 生肖信息
 */
+ (JIMUZodiacConstant *)getZodiac:(NSInteger)index;

/**
 获取生肖搜索位置索引,配合getZodiac使用，如：查找生肖狗，则为：[JIMUZodiacConstant getZodiac:JIMUZodiacConstant.search.Dog.index];
 
 @return 性别信息
 */
+ (struct JIMUZodiacSearchIndex)search;

@end
