/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@import EstimoteProximitySDK;

@interface AppDelegate ()
// 1. Add a property to hold the Proximity Observer
@property (nonatomic) EPXProximityObserver *proximityObserver;
@property (nonatomic, assign) NSString *AtHome;
@property (nonatomic, assign) NSString *InRoom;
@end

@implementation AppDelegate
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  EPXCloudCredentials *cloudCredentials =
    [[EPXCloudCredentials alloc] initWithAppID:@"lnispel-me-com-s-your-own--jhc"
                                  appToken:@"6e443b32f2db281f7281aa29d857dde9"];
  NSLog(@"In AppDelagate");

  self.AtHome = @"Not Home";
  self.InRoom = @"Location Unknown";
  
  NSDictionary *props = @{@"AtHome": self.AtHome, @"InRoom": self.InRoom};
  
  NSURL *jsCodeLocation;
  
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"HomeLocDetect"
                                               initialProperties:props
                                                   launchOptions:launchOptions];
  
  // 2. Create the Proximity Observer
  self.proximityObserver = [[EPXProximityObserver alloc]
                              initWithCredentials:cloudCredentials
                              errorBlock:^(NSError * _Nonnull error) {
                                  NSLog(@"proximity observer error = %@", error);
                              }];
    
    EPXProximityZone *zone1 = [[EPXProximityZone alloc]
                               initWithRange:[EPXProximityRange customRangeWithDesiredMeanTriggerDistance:50.0]                               attachmentKey:@"location"
                               attachmentValue:@"cloudRoom"];
    zone1.onEnterAction = ^(EPXDeviceAttachment *
                            _Nonnull attachment) {
      NSLog(@"Welcome to the Cloud Room!");
      self.AtHome = @"At Home";
      rootView.appProperties = @{@"AtHome": self.AtHome, @"InRoom": self.InRoom};
    };
    zone1.onExitAction = ^(EPXDeviceAttachment * _Nonnull attachment) {
      NSLog(@"Bye bye, come visit us again.");
      self.AtHome = @"Not Home";
      rootView.appProperties = @{@"AtHome": self.AtHome, @"InRoom": self.InRoom};
    };
    
    EPXProximityZone *zone2 = [[EPXProximityZone alloc]
                               initWithRange:EPXProximityRange.farRange
                               attachmentKey:@"room"
                               attachmentValue:@"kitchen"];
    zone2.onEnterAction = ^(EPXDeviceAttachment * _Nonnull attachment) {
      NSLog(@"Looking for something?");
      self.InRoom = @"Kitchen";
      rootView.appProperties = @{@"AtHome": self.AtHome, @"InRoom": self.InRoom};
    };
    zone2.onExitAction = ^(EPXDeviceAttachment * _Nonnull attachment) {
      NSLog(@"Stay hungry!");
      self.InRoom = @"Location Unknown";
      rootView.appProperties = @{@"AtHome": self.AtHome, @"InRoom": self.InRoom};
    };
    
    EPXProximityZone *zone3 = [[EPXProximityZone alloc]
                               initWithRange:EPXProximityRange.farRange
                               attachmentKey:@"room"
                               attachmentValue:@"bed1"];
    zone3.onEnterAction = ^(EPXDeviceAttachment * _Nonnull attachment) {
      NSLog(@"Welcome home, Marcus!");
      self.InRoom = @"Marcus's Room";
      rootView.appProperties = @{@"AtHome": self.AtHome, @"InRoom": self.InRoom};
    };
    zone3.onExitAction = ^(EPXDeviceAttachment * _Nonnull attachment) {
      NSLog(@"No, Don't leave..");
      self.InRoom = @"Location Unknown";
      rootView.appProperties = @{@"AtHome": self.AtHome, @"InRoom": self.InRoom};
    };
    
    EPXProximityZone *zone4 = [[EPXProximityZone alloc]
                               initWithRange:EPXProximityRange.farRange
                               
                               attachmentKey:@"room"
                               attachmentValue:@"bed2"];
    zone4.onEnterAction = ^(EPXDeviceAttachment * _Nonnull attachment) {
      NSLog(@"Welcome home, Luke!");
      self.InRoom = @"Luke's Room";
      rootView.appProperties = @{@"AtHome": self.AtHome, @"InRoom": self.InRoom};
    };
    zone4.onExitAction = ^(EPXDeviceAttachment * _Nonnull attachment) {
      NSLog(@"Did you make your bed?");
      self.InRoom = @"Location Unknown";
      rootView.appProperties = @{@"AtHome": self.AtHome, @"InRoom": self.InRoom};
    };
  
    [self.proximityObserver startObservingZones:@[zone1, zone2, zone3, zone4]];
  
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
