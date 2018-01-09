//
//  IJIMUDataObject.h
//  JiMu
//
//  Created by 冯鸿杰 on 17/2/21.
//  Copyright © 2017年 Mob. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 数据对象协议
 */
@protocol IJIMUDataObject <NSObject>

@required

/**
 初始化对象

 @param string 对象描述字符串
 @return 对象
 */
- (instancetype)initWithObjectString:(NSString *)string;

/**
 序列化为字符串

 @return 字符串
 */
- (NSString *)encodeToString;

@end
