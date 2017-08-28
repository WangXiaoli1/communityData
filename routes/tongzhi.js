/**
 * Created by Administrator on 2017/8/28.
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
router.get("/",function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    pool.query(`SELECT * from tongzhi`, function(err, rows, fields) {
        if (err) throw err;
        res.send(rows)
    });
})
module.exports=router;