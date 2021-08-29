const express = require('express')
const mongoose = require('mongoose');
const User = require('./routes/user.rout');
const cors = require('cors')
const app = express()

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/GPTask").then(()=>{
  console.log("mongoDB connected");
}).catch((err)=>{
    console.log('err',err);
});

app.use(cors({
    origin: "http://localhost:3000",
    credentials:true
}))

app.get('/',(req,res)=>{
    res.send('hello')
})

app.use('/user',User)

app.listen('8800')