//=================================================
//                   DEPENDENCIES
//=================================================

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const bcrypt = require('bcrypt')

const listController = require('./controllers/default.js')
const User = require('./models/users.js')


const app = express()



//=================================================
//                   MIDDLEWARE
//=================================================
app.set('view-engine', 'ejs')
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));


app.use(listController)



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