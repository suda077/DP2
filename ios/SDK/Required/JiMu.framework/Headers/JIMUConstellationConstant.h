//
//  JIMUConstellationConstant.h
//  JiMu
//
//  Created by 冯鸿杰 on 17/2/23.
//  Copyright © 2017年 Mob. All rights reserved.
//

#import <Foundation/Foundation.h>

#define JIMUConstellationConstantAries ([JIMUConstellationConstant getConstellation:JIMUConstellationConstant.search.Aries.index])
#define JIMUConstellationConstantTaurus ([JIMUConstellationConstant getConstellation:JIMUConstellationConstant.search.Taurus.index])
#define JIMUConstellationConstantGemini ([JIMUConstellationConstant getConstellation:JIMUConstellationConstant.search.Gemini.index])
#define JIMUConstellationConstantCancer ([JIMUConstellationConstant getConstellation:JIMUConstellationConstant.search.Cancer.index])
#define JIMUConstellationConstantLeo ([JIMUConstellationConstant getConstellation:JIMUConstellationConstant.search.Leo.index])
#define JIMUConstellationConstantVirgo ([JIMUConstellationConstant getConstellation:JIMUConstellationConstant.search.Virgo.index])
#define JIMUConstellationConstantLibra ([JIMUConstellationConstant getConstellation:JIMUConstellationConstant.search.Libra.index])
#define JIMUConstellationConstantScorpio ([JIMUConstellationConstant getConstellation:JIMUConstellationConstant.search.Scorpio.index])
#define JIMUConstellationConstantSagittarius ([JIMUConstellationConstant getConstellation:JIMUConstellationConstant.search.Sagittarius.index])
#define JIMUConstellationConstantCapricorn ([JIMUConstellationConstant getConstellation:JIMUConstellationConstant.search.Rooster.index])
#define JIMUConstellationConstantPisces ([JIMUConstellationConstant getConstellation:JIMUConstellationConstant.search.Pisces.index])


/**
 星座搜索索引
 */
struct JIMUConstellationSearchIndex
{
    struct JIMUAries1
    {
        int index;
    } Aries;
    struct JIMUTaurus2
    {
        int index;
    } Taurus;
    struct JIMUGemini3
    {
        int index;
    } Gemini;
    struct JIMUCancer4
    {
        int index;
    } Cancer;
    struct JIMULeo5
    {
        int index;
    } Leo;
    struct JIMUVirgo6
    {
        int index;
    } Virgo;
    struct JIMULibra7
    {
        int index;
    } Libra;
    struct JIMUScorpio8
    {
        int index;
    } Scorpio;
    struct JIMUSagittarius9
    {
        int index;
    } Sagittarius;
    struct JIMUCapricorn10 
    {
        int index;
    } Capricorn;
    struct JIMUAquarius11 
    {
        int index;
    } Aquarius;
    struct JIMUPisces12 
    {
        int index;
    } Pisces;
};

/**
 星座信息常量
 */
@interface JIMUConstellationConstant : NSObject

/**
 名字
 */
@property (nonatomic, copy, readonly) NSString *name;

/**
 获取星座列表
 
 @return 星座列表
 */
+ (NSArray<JIMUConstellationConstant *> *)constellations;

/**
 获取星座信息
 
 @param index 星座索引
 @return 星座信息
 */
+ (JIMUConstellationConstant *)getConstellation:(NSInteger)index;

/**
 获取星座搜索位置索引,配合getConstellation使用，如：查找白羊座，则为：[getConstellation getConstellation:JIMUConstellationConstant.search.Dog.index];
 
 @return 性别信息
 */
+ (struct JIMUConstellationSearchIndex)search;

@end
