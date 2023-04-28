const express =require('express')
const mongoose =require('mongoose')
const route =require('./src/routes/route.js')
const app =express()

app.use(express.json())
mongoose.connect("mongodb+srv://jagriti:Jaggu123@cluster0.nf3nfa7.mongodb.net/urlshortner",{useNewUrlParser:true})
.then(()=>console.log("Mongo Db is connected"))
.catch((error)=>console.log(error.message))

app.use('/',route)

app.listen(process.env.PORT|| 3001,function(){
    console.log("Application is running on"+(process.env.PORT || 3001));
})