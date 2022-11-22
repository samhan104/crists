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

//new
app.get('/new', (req, res) => {
    res.render('new.ejs')
})

//show
app.get('/:id/edit', (req, res) => {
    List.findById(res.params.id, (error, showList) => {
        res.render('edit.ejs', 
        {
            list: showList
        })
    })
})

//new post
app.post('/new', (req, res) => {
    List.create(req.body, (error, List) => {
        res.redirect('/')
    })
})


//edit
app.get('/:id/edit', (req, res) => {
    List.findById(res.params.id, (error, editList) => {
        res.render('edit.ejs', 
        {
            list: editList
        })
    })
})

//update
app.put('/:id/', (request, response) => {
    List.findByIdAndUpdate(request.params.id, request.body, {new: true}, (error, updatedList) => {
      res.render('show.ejs', {list: updatedList})
    })
});

//delete
app.delete('/:id/', (req, res) => {
    List.findByIdAndRemove(req.params.id, (error, data) => {
        res.redirect('/')
    })
})






app.listen(PORT, ()=>{
	console.log('listening'); 
})

mongoose.connect("mongodb+srv://samhan104:Rl0gW1tvQNsSzfsV@cluster0.gr8z5kk.mongodb.net/?retryWrites=true&w=majority", () => {
    console.log('connected to mongo')
})