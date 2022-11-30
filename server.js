//=================================================
//                   DEPENDENCIES
//=================================================

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const List = require('./models/list.js')
// const session = require('express-session')
// const bcrypt = require('bcrypt')
const app = express()


let PORT = 3000;
if(process.env.PORT){
	PORT = process.env.PORT
}

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
const listController = require('./controllers/default.js')
app.use(listController)

//seed
app.get('/seed', (req,res) => {
    List.create(seed, (error, data) => {
        res.redirect('/')
      })
})


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
app.get('/:id/', (req, res) => {
    List.findById(req.params.id, (error, showList) => {
        res.render('show.ejs', 
        {
            list: showList
        })
    })
})

//new post
app.post('/', (req, res) => {
    List.create(req.body, (error, List) => {
        res.redirect('/')
    })
})


//edit
app.get('/:id/edit', (req, res) => {
    List.findById(req.params.id, (error, editList) => {
        res.render('edit.ejs', 
        {
            list: editList
        })
    })
})

//update
app.put('/:id/', (req, res) => {
    List.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedList) => {
      res.render('show.ejs', {list: updatedList})
    })
});

//=================================================
//                   CONNECTION
//=================================================
app.listen(process.env.PORT || 3000, ()=>{
	console.log('listening'); 
})

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log("Connected to mongo"))



