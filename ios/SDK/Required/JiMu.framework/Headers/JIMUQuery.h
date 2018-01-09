//
//  JIMQuery.h
//  Jimu
//
//  Created by 冯鸿杰 on 17/2/10.
//  Copyright © 2017年 Mob. All rights reserved.
//

#import <Foundation/Foundation.h>

@class JIMUQueryCondition;
@class JIMUQueryOrder;
@class JIMUDataModel;

/**
 数据查询
 */
@interface JIMUQuery : NSObject

/**
 请求时间，默认值为0，则为120秒
 */
@property (nonatomic) NSTimeInterval requestTimeout;

/**
 初始化

 @param name 查询的数据视图名称
 @return 数据查询对象
 */
- (instancetype)initWithName:(NSString *)name;

/**
 选择查询的字段集合

 @param fields 字段集合
 */
- (void)select:(NSArray<NSString *> *)fields;

/**
 设置查询条件

 @param condition 查询条件
 */
- (void)where:(JIMUQueryCondition *)condition;

/**
 设置排序

 @param order 排序字段规则
 */
- (void)order:(JIMUQueryOrder *)order;

/**
 查找数据

 @param offset 偏移量
 @param size 分页大小
 @param handler 数据返回处理器
 */
- (void)find:(NSInteger)offset
        size:(NSInteger)size
    onResult:(void (^)(NSArray<JIMUDataModel *> *data, NSError *error))handler;

/**
 查找数据

 @param handler 数据返回处理器
 */
- (void)find:(void (^)(NSArray<JIMUDataModel *> *data, NSError *error))handler;

@end
