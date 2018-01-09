//
//  UMSImage.h
//  UMSSDKUI
//
//  Created by 刘靖煌 on 17/2/26.
//  Copyright © 2017年 mob.com. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface UMSImage : UIImage

+ (UIImage *)imageNamed:(NSString *)name;

+ (instancetype)sharedInstance;
- (void)setImage:(UIImage *)image forKey:(NSString *)key;
- (UIImage *)imageForKey:(NSString *)key;

@end
