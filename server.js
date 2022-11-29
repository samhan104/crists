//=================================================
//                   DEPENDENCIES
//=================================================

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const bcrypt = require('bcrypt')
const app = express()



//=================================================
//                   MIDDLEWARE
//=================================================

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));


const listController = require('./controllers/default.js')
app.use(listController)


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