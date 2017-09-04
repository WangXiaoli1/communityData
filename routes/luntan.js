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
// router.get("/",function(req,res){
//     res.header("Access-Control-Allow-Origin", "*");
//     pool.query(`SELECT * from luntan`, function(err, rows, fields) {
//         if (err) throw err;
//         let Row=[]
//         pool.query(`SELECT * from pinglun`, function(err2, rows2, fields) {
//             if (err) throw err;
//             Row = rows.map((v,i) => {
//                 v.arrs=[];
//                 rows2.map((v2) => {
//                     v['id'] == v2['uid'] && (
//                         v.arrs.push(v2)
//                     )
//                 })
//                 return v
//             })
//             res.send(Row)
//         })
//
//     });
// })
router.get("/",function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    var showNum=req.body["showNum"];
    pool.query(`SELECT * from luntan`, function(err, rows, fields) {
        if (err) throw err;
        let Row=[];
        pool.query(`SELECT * from pinglun`, function(err2, rows2, fields) {
            if (err) throw err;
            Row = rows.map((v,i) => {
                v.arrs=[];
                rows2.map((v2) => {
                    v['id'] == v2['uid'] && (
                        v.arrs.push(v2)
                    )
                })
                return v
            })
            res.send(Row)
        })


    });
})
// select substring(id,7,8) into 新表 from 原始表
// SELECT LEFT(项目编号及名称,9)

// select 　top　1　*　from　table　order　by　datefield　desc
// 按时间倒序排，取出最后一条记录就是最近的




//首页部分论坛调取数据,按最近时间排序 　SELECT * FROM TABLENAME LIMIT N
router.get("/part",function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    pool.query(`SELECT * from luntan ORDER BY time DESC limit 2`, function(err, rows, fields) {
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
    var pinglun=req.body["pinglun"];
    // 插入
    console.log(id,pinglun);

    pool.query(`INSERT INTO pinglun (pinglun,uid) VALUES("${pinglun}","${id}")`,function (err,rows,fields) {
        if(err) throw err;
        pool.query(`SELECT * from luntan`, function(err, rows, fields) {
            if (err) throw err;
            let Row=[]
            pool.query(`SELECT * from pinglun`, function(err2, rows2, fields) {
                if (err) throw err;
                Row = rows.map((v,i) => {
                    v.arrs=[];
                    rows2.map((v2) => {
                        v['id'] == v2['uid'] && (
                            v.arrs.push(v2)
                        )
                    })
                    console.log(rows2)
                    return v
                })
                // setTimeout(()=>{
                    res.send(Row)

                // },1000)


            })


        });
})
});
//添加评论完


// 我的心情说说    //有问题
// router.post("/mymood",function(req,res){
//     res.header("Access-Control-Allow-Origin", "*");
//     pool.query(`SELECT * from luntan`, function(err, rows, fields) {
//         if (err) throw err;
//         res.send(rows)
//     });
// })

router.post("/mymood",function(req,res){
    var name='八戒';
    res.header("Access-Control-Allow-Origin", "*");
    pool.query(`SELECT * from luntan where nickName=${name}`, function(err, rows, fields) {
        if (err) throw err;
        console.log(rows)
        res.send(rows)
    });
})
// 我的心情说说完





module.exports=router;



