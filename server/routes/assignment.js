const express = require('express');
const router = express();
const db = require('../config/db')
const multer = require('multer')
const util = require('util');
const bodyParser = require('body-parser');
const { resolveNaptr } = require('dns');
const { isReadable } = require('stream');
const { dequeue } = require('jquery');

router.post('/getcontent', (req,res)=> {
   
    console.log("getcontent")
    const sql1 = `SELECT id,content, date from board order by date DESC`

    

    db.query(sql1, (err,data) => {
        if(!err) {
            // console.log(data)
            console.log(data)
            console.log(data)
            res.send(data)
        }
        else
        {
            res.send(err)
        }
    })
})

router.post('/upload',(req,res) => {
    console.log("upload")
    console.log(req.query.content)
    console.log(req.query.id)
    const sql1 = `INSERT INTO board (content) VALUES (?)`
    const sql2 = `UPDATE board SET content = (?) WHERE id = (?)`
    if (req.query.id == -1){
    db.query(sql1, [req.query.content], (err,data) => {
        if(!err) {
            res.send({success: true})
        }
        else {
            res.send(err)
        }
    })
    }
    else {
        db.query(sql2, [req.query.content, req.query.id], (err,data) => {
            console.log("update")
            if(!err) {
                res.send({success: true})
                console.log("success")
            }
            else {
                res.send(err)
            }
        })
    }
})

router.post("/delete", (req,res) => {
    // console.log(req.query.content)
    console.log(req.query.id);
    const sql1 = `DELETE FROM board where id = (?)`
    db.query(sql1, [req.query.id], (err,data) => {
        if(!err) {
            res.send({success: true})
        }
    })

    
})


module.exports = router;