/**
 * Created by Administrator on 2017/7/25.
 */
var express = require('express');
var mysql=require('mysql');
var router=express.Router();

var pool=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'123456',
    database:'community',
    port:3306
});
// 查
router.get("/",function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    pool.query(`SELECT * from luntan`, function(err, rows, fields) {
        if (err) throw err;
        res.send(rows)
    });
})
// select substring(id,7,8) into 新表 from 原始表
// SELECT LEFT(项目编号及名称,9)
//首页部分论坛调取数据　SELECT * FROM TABLENAME LIMIT N
router.get("/part",function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    pool.query(`SELECT * from luntan limit 3`, function(err, rows, fields) {
        if (err) throw err;
        res.send(rows)
    });
})
// 赞修改
router.post('/luntanNum',function(req,res){
    var id=req.body["id"];
    var num=req.body["num"];

    res.header("Access-Control-Allow-Origin", "*");

    pool.query(`update luntan set num='${num}' where id='${id}'`, function(err, rows, fields) {

        if (err) throw err;
        var a={aa:"修改成功"};
        res.send(a)
    });
});
// 赞修改完

//添加评论
router.post('/addpinglun',function (req,res) {
    res.header("Access-Control-Allow-Origin", "*");  //获取数据时使用
    var id=req.body["id"];
    var pinglun=req.body["lhxPingLun"];
    console.log(id,pinglun)
    // 插入
    pool.query(`insert into luntan (pinglun) values('${pinglun}') where id=${id}`,function (err,rows,fields) {
        if(err) throw err;
        res.send(rows)
    })
});
//添加评论完

// 我的心情说说
router.post("/mymood",function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    pool.query(`SELECT * from luntan`, function(err, rows, fields) {
        if (err) throw err;
        res.send(rows)
    });
})
// 我的心情说说完





module.exports=router;



