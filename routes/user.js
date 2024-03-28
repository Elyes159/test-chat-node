const express = require('express')

const router = express.Router();

const User = require('../models/user');
const { route } = require('./product');

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

// router.post('/add',(req , res)=>{
//     data = req.body;
//     usr = new User(data)

//     usr.save()
//         .then(
//             (savedUser)=>{
//                res.send(savedUser) 
//             }
//         ).catch(
//             (err)=>{
//                 res.send(err)
//             }
//         )

// });

router.post('/create',async (req,res)=>{
    try{
        data = req.body;
        usr = new User(data);
        savedUser =await usr.save();
        res.status(200).send(savedUser);
    }catch(error){
        res.status(400).send(error)
    }
})
router.post('/register',async (req,res)=>{
    try{
        data = req.body;
        usr = new User(data);
        salt = bcrypt.genSaltSync(10);
        cryptedPass = await bcrypt.hashSync(data.password,salt)
        usr.password = cryptedPass;
        savedUser = usr.save()
        res.status(200).send(savedUser);
    }catch(error){
        res.status(400).send(error)
    }
})
router.post('/login',async (req,res)=>{
    try{
        data = req.body;
        user = await User.findOne({email : data.email})

        if (!user){
            res.status(404).send('email or password invalid !')
        }else{
            validPass = bcrypt.compareSync(data.password,user.password)
            if (!validPass){
                res.status(401).send('email or password invalid !')
            }else{
                payload = {
                    _id: user.id,
                    email:user.email,
                    name : user.name
                }
                token = jwt.sign(payload,'123456')

                res.status(200).send({mytoken:token})
            }
        }
        
    }catch(error){
        res.status(400).send(error)
    }
})

// router.get('/getall',(req,res)=>{
//     User.find({age:22})
//     .then(
//         (users) =>{
//             res.send(users)
//         }
//     ).catch(
//         (err)=>{
//             res.send(err)
//         }
//     )

// });

router.get('/readall',async(req,res)=>{
    try{
        users =await User.find()
        res.send(users)
    }catch(error){
        res.send(error)
    }
});

router.get('/getById/:id',async(req,res)=>{
try{
    myid = req.params.id
    user = await User.findOne({_id :myid})
    res.send(user)
}catch(error){
    res.send(error);
}
});


router.delete('/delete/:id',async(req,res)=>{
    try{
        myid = req.params.id
        deletedUser = await User.findOneAndDelete({_id : myid})
        res.send("user with this id : "+myid+"  is deleted !")
    }catch(error){
        res.send(error)
    }
});


router.put('/update/:id',async(req,res)=>{
    try{
        myid = req.params.id
        dataUpdated = req.body;
        deletedUser = await User.findOneAndUpdate({_id : myid},dataUpdated)
        res.send("user with this id : "+myid+"  is updated !")
    }catch(error){
        res.send(error)
    }
});
module.exports = router;