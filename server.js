const express = require('express');
const mongoose = require('mongoose');
const Registeruser = require('./model');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');
const cors = require('cors')
const app =express();

mongoose.connect("mongodb+srv://siri:siri@cluster0.cjhpckv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
    () => console.log('DB connection established')
)

app.use(express.json());
app.use(cors({origin:"*"}))
app.post('/register',async (req,res)=>{
    try{
        const {username,email,password,confirmpassword}=req.body;
        let exist = await Registeruser.findOne({email:email})
        if(exist){
            return res.status(400).send('user already exist')
        }
        if(password!==confirmpassword){
            return res.status(400).send('passwords are not matching')
        }
        let newUser = new Registeruser({
            username,
            email,
            password,
            confirmpassword
        })
        await newUser.save();
        res.status(200).send('Registered successfully')
    }
    catch(err){
        console.log(err)
        return res.status(500).send('internel server error')
    }
})
app.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        let exist = await Registeruser.findOne({email});
        if(!exist){
            return res.status(400).send('user not founnd');
        }
        if (exist.password !==password){
            return res.status(400).send('invalid credentials');
        }
        let payload = {
            user:{
                id : exist.id
            }
        }
        jwt.sign(payload,'jwtSecret',{expiresIn:3600000},
            (err,token) =>{
                if (err) throw err;
                return res.json({token})
            }
        )

    }
    catch(err){
        console.log(err);
    }
})
app.get('/myprofile',middleware,async(req,res)=>{
    try{
        let exist = await Registeruser.findById(req.user.id);
        if(!exist){
            return res.status(400).send('user not found');
        }
        res.json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('server error')
    }
})
app.listen(5000,()=>{
    console.log('server running...')
})