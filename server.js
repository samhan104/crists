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



//=================================================
//                   MIDDLEWARE
//=================================================

// app.use(express.static('public'));
// app.use(express.urlencoded({extended: false}));
// app.use(methodOverride('_method'));


// const listController = require('./controllers/default.js')
// app.use(listController)


// app.use(
//     session({
//       secret: process.env.SECRET, 
//       resave: false, 
//       saveUninitialized: false 
//     })
//   )
  
//=================================================
//                      ROUTES
//=================================================
//post new
app.post('/', (req, res) => {
    List.create(req.body, (error, List) => {
      res.redirect('/')
    })
  });
  
  //delete. http verb delete
  app.delete('/:id', (req, res) => {
    List.findByIdAndRemove(req.params.id, (error, data) => {
      res.redirect('/')
    })
  });
  
  //edit. http verb get
  app.get('/:id/edit', (req, res) => {
    List.findById(req.params.id, (error, foundList) => {
      res.render('edit.ejs', {List: foundList})
    })
  });
  
  //update. http verb put
  app.put('/:id/', (req, res) => {
    List.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedList) => {
      // res.redirect('/:id/', {List: updatedList})
      res.render('show.ejs', {List: updatedList})
    })
  });
  
  //seed
  app.get('/seed', (req, res) => {
    List.create(ListSeed, (error, data) => {
      res.redirect('')
    })
  });
  
  //index. http verb get
  app.get('', (req, res) => {
    List.find({}, (error, List) => {
      res.render('index.ejs', 
      {
          list: List
      })
    })
  });
  
  
  //new. http verb get
  app.get('/new', (req, res) => {
    res.render('new.ejs')
  });
  
  
  //show. http verb get
  app.get('/:id', (req,res) => {
      List.findById(req.params.id, (error, List) => {
          res.render('show.ejs', 
          {
              List: List
          })
      })
  })
  

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



