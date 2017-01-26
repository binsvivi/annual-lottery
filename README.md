# Annual-Lottery
================

A simple lottery program for annual meeting by using nodejs, mysql, jquery, html5 and canvas,including photos wall,random lottery and fire works effect.

说明
=======
* 数据存储使用Mysql, sheet2.csv提供测试信息数据，可通过phpadmin导入mysql数据库表中。
* 点击照片墙下侧的开始按钮开始抽奖，点击停止按钮结束一次抽奖。
* 中奖结果保存在localStorage中。

环境
=======
1. nodejs 环境
2. 基本npm包依赖
```
npm install mysql
npm install random
```


图片资源
=======
* 头像图片放在```uifaces```目录下，以```姓名.jpg```文件命名，用在首页照片墙，以及抽奖页面。


数据库
=======
* 人员数据信息存储使用Mysql, 程序在启动的时候默认会连接mysql，用户名为root,密码为2.可在my-lottery-app.js中根据实际需要调整。
* 工程内提供了一份```sheet2.cvs```测试数据，可通过phpadmin导入mysql数据库表。

运行
=======
* 在项目目录下运行
```
nodejs my-lottery-app.js
```
访问```http://localhost:8033/```即可看到抽奖页面

