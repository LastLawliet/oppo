<?php
	
	header("content-type","text/html;charset=utf-8");
	
	//1、建立连接并选择数据库
	$con = mysql_connect("localhost","root","qianfeng");
	if(!$con){
		die("连接失败".mysql_error());
	}
	mysql_select_db("shop1701",$con);
	
	//2、执行SQL语句
	$sqlStr = "insert into userTable(userId,userPass,userName,userSex)
              values('liyunlong111','110012','李云龙1','女')";
    
    
    
	mysql_query($sqlStr,$con);
	
	//3、关闭数据库
	mysql_close($con);
	
	echo "亲，添加成功";

?>