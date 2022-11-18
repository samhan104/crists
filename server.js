const express = require('express')
const mongoose = require('mongoose')
const seed = require('./models/seed.js')
const List = require('./models/list.js')
const app = express()

let PORT = 3000;
if(process.env.PORT){
	PORT = process.env.PORT
}


//i want '/' to be the the inital loading screen. on load, it'll display, then load /home which will show index
// app.get('/', (req, res)=>{
// 	res.send('hi');
// })

//index
app.get('/home' , (req, res) => { //list will be shown on index. in show, list will show items within
    List.find({}, (error, getList) => {
        res.render('index.ejs', 
        {
            list: getList
        })
    })
})

//new
app.get('/new', (req, res) => {
    res.render('new.ejs')
})













app.listen(PORT, ()=>{
	console.log('listening');
})

mongoose.connect("mongodb+srv://samhan104:Rl0gW1tvQNsSzfsV@cluster0.gr8z5kk.mongodb.net/?retryWrites=true&w=majority", () => {
    console.log('connected to mongo')
})