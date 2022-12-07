const express = require('express');
const router = express();
const db = require('../config/db')
const multer = require('multer')
const util = require('util');
const bodyParser = require('body-parser');
const { resolveNaptr } = require('dns');
const { isReadable } = require('stream');
const { dequeue } = require('jquery');



router.get('/test', (req,res) => {
    db.query(`SELECT * FROM board`, (err,data) => {
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
    const description = req.query.description
    const images = JSON.stringify(req.query.images)
    const continents = req.query.continents
    console.log(description)
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
    let searchterm = req.query.SearchTerm;
    const continent_id = Continents[continent]

    // console.log("Detail")
    if (searchterm) {
        console.log("searchterm")
        console.log(searchterm)
        const sql2 = `SELECT a.picture_idx, a.writer, a.title, a.description, 
        a.images, a.continents, a.liked, a.views, b.user_name from pictures
        AS a LEFT JOIN user_inform AS b ON a.writer = b.user_id
        WHERE continents = ? and a.title like "%${searchterm}%"
        ORDER BY a.views desc LIMIT ? OFFSET ?`
        db.query(sql2, [continent_id,limit,offset] ,(err,data) => {
            if(err) {
                console.log('err')
                return res.status(400).json({success: false, err})
            }
            else {
                console.log("success")
                console.log(data)
                return res.status(200).json({success: true, data})
            }
        })

    }
    else 
    {
        const sql1 = `SELECT a.picture_idx, a.writer, a.title, a.description, 
        a.images, a.continents, a.liked, a.views, b.user_name from pictures
        AS a LEFT JOIN user_inform AS b ON a.writer = b.user_id
        WHERE continents = ?
        ORDER BY a.views desc LIMIT ? OFFSET ?`
        db.query(sql1, [continent_id,limit,offset] ,(err,data) => {
            if(err) {
                return res.status(400).json({success: false, err})
            }
            else {
                // console.log(data)
                return res.status(200).json({success: true, data})
            }
        })

    }
    
})

router.get('/detail/info', (req,res) => {
    // console.log(req.query.id)
    let id = req.query.id

    // const sql1 = `SELECT * from pictures WHERE picture_idx = ?`
    const sql1 = `SELECT a.picture_idx, a.writer, a.title, a.description, 
    a.images, a.continents, a.liked, a.views, b.user_name from pictures
     AS a LEFT JOIN user_inform AS b ON a.writer = b.user_id where picture_idx = ?`
    db.query(sql1,[id], (err,data) => {
        // console.log(data)
        if(err){
            return res.status(400).send(err)
        }
        else {
            return res.status(200).send({success: true, data})
        }
    })
})

// router.post('/like', (req,res) => {
//     console.log("first like")
//     let user_id = 'jsy3535@dgist.ac.kr'
//     let picture_idx = 4;

//     const sql1 = `SELECT COUNT(*) AS result FROM liked 
//     WHERE user_idx = ? and picture_idx = ?`
//     console.log("like")
//     db.query(sql1, [user_id, picture_idx], (err,data) => {
//         if(err) {
//             return res.status(400).send(err)
//         }
//         else {
//             return res.status(200).send({success: true,data})
//         }
//     })
// })

router.post('/like', (req,res) => {
    // console.log("first like")
    let user_id = req.query.user_id
    let picture_idx = req.query.picture_idx

    const sql1 = `SELECT COUNT(*) AS result FROM liked 
    WHERE user_id = ? and picture_idx = ?`
    // console.log("like")
    db.query(sql1, [user_id, picture_idx], (err,data) => {
        // console.log(data[0].result)
        // liked 안한 경우
        if(data[0].result < 1){
            // return res.status(400).send({success: true})
            // console.log("like 안한경우")
            const sql2 = `INSERT into liked (user_id,picture_idx) VALUES (?,?)`
            db.query(sql2, [user_id,picture_idx], (err, data) => {
                if (!err) {
                    // console.log("inserted")
                    const sql4 = `UPDATE pictures set liked = liked + 1 WHERE picture_idx = ?`
                    db.query(sql4, [picture_idx], (err,data) => {
                        if(err) {
                            return res.status(400).send({success: 'total liked plus is false'})
                        }
                    })
                    return res.status(200).send({success: 'inserted'})
                    
                }
                else {
                    return res.send(err)
                    
                }
            })
        }
        else {
            // console.log("like 한경우")
            // return res.status(200).send({success: false})
            const sql3 = `DELETE FROM liked WHERE user_id = ? AND picture_idx = ?`
            db.query(sql3, [user_id,picture_idx], (err,data) => {
                if (!err) {
                    // console.log("deleted")
                    const sql5 = `UPDATE pictures set liked = liked -1 WHERE picture_idx = ?`
                    db.query(sql5, [picture_idx], (err,data) => {
                        if(err){
                            return res.status(400).send({success: 'total liked minus is false '})
                        }
                    })
                    return res.status(200).send({success: 'deleted'})
                }
                else {
                    // console.log("delete 에러")
                    return res.send(err)
                }
            })
        }
    })

    
})

router.post('/checklike',(req,res) => {
    let user_id = req.query.user_id;
    let picture_idx = req.query.picture_idx;

    const sql1 = `SELECT COUNT(*) AS result FROM liked 
    WHERE user_id = ? and picture_idx = ?`

    db.query(sql1, [user_id,picture_idx], (err,data) => {
        //like 안한경우
        if(data[0].result <1){
            return res.send({success: false})
        }
        else{
            return res.send({success: true})
        }
    })
})

router.post('/plusview', (req,res) => {
    let picture_idx = req.query.picture_idx;

    const sql1 = `UPDATE pictures SET views = views + 1 where picture_idx = ?`
    db.query(sql1, [picture_idx], (err,data) => {
        if(!err) {
            return res.send({success: true})
        }
    })
})


module.exports = router;