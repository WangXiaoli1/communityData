/**
 * Created by Administrator on 2017/8/30.
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
router.get("/youbao",function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    pool.query(`SELECT * from youbao`, function(err, rows) {
        if (err) throw err;
        res.send(rows)
    });
})


//物业发送邮包
//参数  name 邮包的名字     village  门牌号
router.post('/WU_mail',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    var name=req.body["name"];
    var address=req.body["address"];
    var phone=req.body["phone"];
    var kuaidi=req.body["kuaidi"]; //快递
    // var village=req.body["village"]
    pool.query(`insert into youbao(name,address,phone,kuaidi) values("${name}","${address}","${phone}","${kuaidi}")`,function(err,rows){
        pool.query(`SELECT * from youbao where address="${address}"`, function(err, rows, fields) {
            if (err) throw err;
            res.send(rows)
        });

    })
})

module.exports=router;