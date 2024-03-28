const express = require('express')

const router = express.Router();
const Product = require('../models/product')
const multer = require('multer')

filename = '';

const mystorage = multer.diskStorage({
    destination :'./uploads',
    filename : (req,file,redirect)=>{
        let date = Date.now();
        let fl = date+'.'+file.mimetype.split('/')[1];
        redirect (null , fl);
    }
});

const upload = multer({storage : mystorage})

router.post('/createProd',upload.any('image'),async (req,res)=>{
    try{
        data = req.body;
        usr = new Product(data);
        usr.image = filename;
        savedUser =await usr.save();
        filename = '';
        res.send(savedUser);
    }catch(error){
        res.send(error)
    }
})
module.exports = router;