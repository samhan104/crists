const express = require('express')
const mongoose = require('mongoose')
const seed = require('./models/seed.js')
const List = require('./models/list.js')
const app = express()

let PORT = 3000;
if(process.env.PORT){
	PORT = process.env.PORT
}

//seed
// app.get('/seed', (req,res) => {
//     List.create(seed, (error, data) => {
//         res.redirect('/')
//       })
// })


//index
app.get('/' , (req, res) => { //list will be shown on index. in show, list will show items within
    List.find({}, (error, getList) => {
        res.render('index.ejs', 
        {
            list: getList
        })
    })
})

//delete
app.get('/new', (req, res) => {
    res.render('new.ejs')
})

//edit
app.get('/new', (req, res) => {
    res.render('new.ejs')
})

//new post
app.post('/new', (req, res) => {
    List.create(req.body, (error, List) {
        res.redirect('/')
    })
})

//update
app.put('/:id/', (request, response) => {
    List.findByIdAndUpdate(request.params.id, request.body, {new: true}, (error, updatedList) => {
      response.render('show.ejs', {list: updatedList})
    })
});









app.listen(PORT, ()=>{
	console.log('listening'); 
})

mongoose.connect("mongodb+srv://samhan104:Rl0gW1tvQNsSzfsV@cluster0.gr8z5kk.mongodb.net/?retryWrites=true&w=majority", () => {
    console.log('connected to mongo')
})