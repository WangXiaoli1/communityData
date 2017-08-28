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
router.get('/addpinglun',function (req,res) {
    res.header("Access-Control-Allow-Origin", "*");  //获取数据时使用
    var id=req.body["id"];
    var con=req.body["num"];
    // 插入
    pool.query('insert into luntan (con,id) values("aa",7)',function (err,rows,fields) {
        if(err) throw err;
        res.send(rows)
    })
});
//添加评论完



module.exports=router;



