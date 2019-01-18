/*!
 * WeClassRoom-teacher-api-sdk v1.0.5
 *
 * Copyright 2016 by WeClassRoom
 * Released under GPL V2 License
 *
 * shimengjun@100tal.com 201705
 *
*/
/* eslint-disable */
;(function(global) {

  function WCRPCClientJSSDK() {
     // 设置当前程序的用户, userInfo为JSON字符串
     // {
     //  "id": "xxx",
     //  "type": "xxx", // "teacher" | "student"
     //  "name": "xxx",
     //  "token": "xxx",
     //  "avatar": "xxx",
     //  "mobile": "xxx"
     // }
     this.setUser = function(userInfo) {
         var copyUserInfo = userInfo;
         try {
             var userObj = JSON.parse(copyUserInfo);
             //userObj["type"] = "teacher";
             copyUserInfo = JSON.stringify(userObj);
         } catch (e) {console.log("userInfo invalid");return;}
         if (window.webAdapter) {
             if (userInfo.length == 0) {
                 if (window.webAdapter.logOutResponse) {
                     window.webAdapter.logOutResponse();
                 }
             } else {
                 if (window.webAdapter.loginResponse) {
                     window.webAdapter.loginResponse(copyUserInfo);
                 }
             }
         }
     };

     // 加入教室，在调用joinClassRoom之前，请确保setUser被正确设置
     // joinInfo为JSON字符串
     // {
     //     "id": "",
     //     "title": "",
     //     "scenario": "",
     //     "institutionId": "",
     //     "status": 1, // 1 WAITING, 2 ONGOING, 3 FINISHED, 4 TIMEOUT
     //     "startTime": "yyyy-MM-dd hh:mm:ss",
     //     "endTime": "yyyy-MM-dd hh:mm:ss"
     //     "lesson_slide_url":"url"
     // }
     // callback为上课过程中的回调接口
     //    function(content) {}
     //    content: {"notify":"xxx", "body":{"roomid": "xxx", "userid": "xxx"}}
     //     {notify:startClass, body: {room_id: 12, userid: "xxxx"}}
     //     {notify:endClass, body: {room_id: 12, userid: "xxxx"}}
     //     {notify:callhelp, body:{room_id,userid,reasoncode,reasontext}}  //only for teacher client
     //          reasoncode是求助原因：0=无效；1=学生原因；2=设备原因；3=网络原因reasontext是：用户输入的附加信息
     //     {notify:setClassStar, body: {classroom_id: 12, student_id:xxx,star: 3}} //only for teacher client
     //     {notify:getStudentReport, body: {classroom_id: 12}} //only for teacher client

     this.prepareJoinClassRoom = function(joinInfo, callbackName) {
      var copyJoinInfo = joinInfo;
      try {
          var roomObj = JSON.parse(copyJoinInfo);
          copyJoinInfo = JSON.stringify(roomObj);
      } catch (e) {console.log("joinInfo invalid");return;}
      if (window.webAdapter && window.webAdapter.prepareJoinClassRoom) {
          if (callbackName) {
            window.webAdapter.prepareJoinClassRoom(copyJoinInfo,callbackName);
          } else {
             window.webAdapter.joinClassRoom(copyJoinInfo);
          }
      }
  };

     this.joinClassRoom = function(joinInfo, callback) {
         var copyJoinInfo = joinInfo;
         try {
             var roomObj = JSON.parse(copyJoinInfo);
             copyJoinInfo = JSON.stringify(roomObj);
         } catch (e) {console.log("joinInfo invalid");return;}
         if (window.webAdapter && window.webAdapter.joinClassRoom) {
             if (callback) {
               window.webAdapter.joinClassRoomWithCallback(copyJoinInfo, this.persistentCallback(function(content) {
                    callback(content);
               }));
             } else {
                window.webAdapter.joinClassRoom(copyJoinInfo);
             }
         }
     };

     // 获取当前客户端的版本号
     this.getClientVersion = function() {
         if (window.webAdapter && window.webAdapter.getClientVersion) {
             return window.webAdapter.getClientVersion();
         }
     };

     //调起手动检测升级流程，整体逻辑和UI已经内部封装好，机构无需关心
     this.checkClientUpdate = function() {
         if (window.webAdapter && window.webAdapter.checkClientUpdate) {
             return window.webAdapter.checkClientUpdate();
         }
     };

     //js写日志到c++日志库接口
     this.web_log = function(msg) {
         if (window.webAdapter && window.webAdapter.web_log) {
             window.webAdapter.web_log('[web_log]msg:' + msg);
         }
     };

     //外链打开，用系统默认的程序打开链接
     this.openUrlByExternal = function(absoluteUrl) {
         if (window.webAdapter && window.webAdapter.openUrlByExternal) {
             return window.webAdapter.openUrlByExternal(absoluteUrl);
         }
     };

     // 页面调用此接口可强制退出当前老师端程序
     this.exitApp = function() {
         if (window.webAdapter && window.webAdapter.exitApp) {
             window.webAdapter.exitApp();
         }
     };

     // 页面调用此接口可强制重启当前老师端程序
     this.restartAPP = function() {
         if (window.webAdapter && window.webAdapter.restartClient) {
             window.webAdapter.restartClient();
         }
     };

     // 获取客户端的当前语言设置
     this.getLanguage = function() {
         if (window.webAdapter && window.webAdapter.getCurrentLanguage) {
             return window.webAdapter.getCurrentLanguage();
         }
     };

     // 更改客户端的当前语言 "en" 或者 "ch"
     this.setLanguage = function(language) {
         if (window.webAdapter && window.webAdapter.setCurrentLanguage) {
             window.webAdapter.setCurrentLanguage(language);
         }
     };

     // 获取是否命中ppt缓存，第一个参数是一个json的字符串，字符串是url的数组;第二个参数是callback方法名，callback要求接收一个字符串参数，这个参数也是一个json的字符串，字符串是{url:xxx,offline:0/1}对象的数组
     this.getPPTCacheStatus = function(urls,callback) {
         if (window.webAdapter && window.webAdapter.getPPTCacheStatus) {
             window.webAdapter.getPPTCacheStatus(urls,callback);
         }
     };

     this.oneshotCallback = function(callback) {
          var randomFunctionName = "ONESHOT_" + (new Date()).getTime() + "_";
          global[randomFunctionName] = function(content) {
              callback(content);
              delete global[randomFunctionName];
          }
          return randomFunctionName;
      };

      this.persistentCallback = function(callback) {
          var randomFunctionName = "PERSISTENT_" + (new Date()).getTime() + "_";
          global[randomFunctionName] = function(content) {
              callback(content);
          }
          return randomFunctionName;
      };
      // 设置课堂的星星数量
      // uid: 对应学生的id
      // st: 对应学生获取的星星数量
      this.setStarCount = function(count, uid) {
          if (window.webAdapter && window.webAdapter.setStarCount) {
              window.webAdapter.setStarCount(count);
          }
      };
      // 设置课堂的发言时长
      // uid: 对应学生的id
      // st: 对应学生的发言时长
      this.setSpeakingTime = function(st, uid) {
          if (window.webAdapter && window.webAdapter.setSpeakingTime) {
              window.webAdapter.setSpeakingTime(st);
          }
      };

    // st: 重新加载课表页
      this.reload = function() {
          if (window.webAdapter && window.webAdapter.reload) {
              window.webAdapter.reload();
          }
      };
      // joinClassRoom中的callback参数中，可以传递callbackid
      // 如果上述指定id，则可通过此函数，调用教室通知结果
      this.commonNotifyCallback = function(callbackid, params) {
          if (window.webAdapter && window.webAdapter.commonNotifyCallback) {
              window.webAdapter.commonNotifyCallback(callbackid, JSON.stringify(params));
          }

      };
      this.beginRecord = function(json, callback) {

          if (window.webAdapter && window.webAdapter.beginRecord) {

              return window.webAdapter.beginRecord(json, callback);
          }
      };
      //
      this.endRecord = function() {

          if (window.webAdapter && window.webAdapter.endRecord) {

              return window.webAdapter.endRecord();
          }
      };

      this.startEvaluating = function (json, callback) {
        if (window.webAdapter && window.webAdapter.startEvaluating) {
          return window.webAdapter.startEvaluating(json, callback);
        }
      };

      this.endEvaluating = function () {
        if (window.webAdapter && window.webAdapter.endEvaluating) {
          return window.webAdapter.endEvaluating();
        }
      };
  }

  var WCRClassRoom = new WCRPCClientJSSDK();

  global.WCRClassRoom = WCRClassRoom;

  global.WCRPCClientJSSDK = WCRPCClientJSSDK;

  })(window);
