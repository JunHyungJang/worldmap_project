const express = require('express');
const router = express();
const db = require('../config/db')
const multer = require('multer')
const util = require('util');
const bodyParser = require('body-parser');
const { resolveNaptr } = require('dns');
const { isReadable } = require('stream');



router.get('/test', (req,res) => {
    db.query(`SELECT * FROM mytable`, (err,data) => {
        if(!err) res.send({products: data});
        else res.send(err)
    })
})

router.post('/register', (req,res)=> {
    const user_name = req.query.user_name
    const user_id = req.query.user_id
    const user_pw = req.query.user_pw

    console.log(user_name, user_id, user_pw)

    const sql1 = `INSERT INTO user_inform (user_id, user_pw,user_name,user_email) VALUES (?,?,?,?)`


    db.query(sql1,[user_id, user_pw, user_name, user_id], (err,data) => {
        if(!err) {
            res.send('성공적으로 가입')
        }
        else
        {
            res.send(err)
        }
    })
})


router.post('/login', (req,res) => {
    // console.log(`= = = > req : ${util.inspect(req)}`)

    const user_id = req.query.user_id;
    const user_pw = req.query.user_pw;
    console.log(user_id, user_pw)
    const sql1 = 'SELECT COUNT(*) AS result FROM user_inform WHERE user_id = ?'
    db.query(sql1, user_id, (err, data) => {
        if(!err) {
        	// 결과값이 1보다 작다면(동일한 id 가 없다면)
            if(data[0].result < 1) {
                res.send({ 'msg': '입력하신 id 가 일치하지 않습니다.'})
            } else { // 동일한 id 가 있으면 비밀번호 일치 확인
                console.log(data[0].result)
                const sql2 = `SELECT 
                                CASE (SELECT COUNT(*) FROM user_inform WHERE user_id = ? AND user_pw = ?)
                                    WHEN '0' THEN NULL
                                    ELSE (SELECT user_id FROM user_inform WHERE user_id = ? AND user_pw = ?)
                                END AS userId
                                , CASE (SELECT COUNT(*) FROM user_inform WHERE user_id = ? AND user_pw = ?)
                                    WHEN '0' THEN NULL
                                    ELSE (SELECT user_pw FROM user_inform WHERE user_id = ? AND user_pw = ?)
                                END AS userPw`;
                // sql 란에 필요한 parameter 값을 순서대로 기재

                //id만 맞고 pw 틀리면 둘다 null
                //id 틀리면 msg
                //둘다 맞으면 id, pw 둘다 보냄 
                const params = [user_id, user_pw, user_id, user_pw, user_id, user_pw, user_id, user_pw]
                db.query(sql2, params, (err, data) => {
                    if(!err) {
                        res.send(data[0])
                        console.log(data[0])
                    } else {
                        res.send(err)
                        
                    }
                })
            }
        } else {
            res.send(err)
            console.log('오류입니다')
        }
    })
})



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({storage: storage}).single("file")

router.post('/uploadimage', (req,res) => {
    
    // console.log("req",req)
    console.log("uploadimage")
    upload(req,res, err => {
        if(err){
            return req.json({success: false, err})
        }
        return res.json({success: true, filePath:res.req.file.path, fileName: res.req.file.filename})
    })

})

router.post('/saveimages', (req,res) => {
    // console.log(req.query)
    // console.log(req.query.images)
    const writer = req.query.writer
    const title = req.query.title
    const description = req.query.title
    const images = JSON.stringify(req.query.images)
    const continents = req.query.continents

    console.log(images)

    const sql1 = `INSERT INTO pictures (writer, title, description, images, continents) VALUES (?,?,?,?,?)`
    
    db.query(sql1, [writer, title, description, images, continents], (err, data) => {
        if(err) {
            return res.status(400).json({success: false, err})
        }
        return res.status(200).json({success:true})
    })

    
})

router.post('/detail', (req,res) => {
    
    const Continents = {
        'Africa' : 1,
        'Europe' : 2,
        'Asia': 3,
        'North America': 4,
        'South America': 5,
        'Oceania':6,
    }
    const continent = req.query.continent;
   let limit = req.query.limit ? parseInt(req.query.limit) : 20;
   let offset = req.query.offset ? parseInt(req.query.offset) : 0;
//    console.log(limit, offset)

    const continent_id = Continents[continent]
    console.log(continent_id)
    const sql1 = `SELECT a.writer, a.title, a.description, 
    a.images, a.continents, a.star, a.views, b.user_name from pictures
     AS a LEFT JOIN user_inform AS b ON a.writer = b.user_id
     WHERE continents = ?
     ORDER BY a.title LIMIT ? OFFSET ?`
    db.query(sql1, [continent_id,limit,offset] ,(err,data) => {
        if(err) {
            return res.stataus(400).json({success: false, err})
        }
        else {
            return res.status(200).json({success: true, data})
        }
    })
})




module.exports = router;