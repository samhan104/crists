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
const User = require('./models/users.js')
const app = express()



//=================================================
//                   MIDDLEWARE
//=================================================

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


// const listController = require('./controllers/default.js')
// app.use(listController)
// const userController = require('./controllers/user_controller.js')
// app.use('/users', userController)

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
//index
app.get('/' , (req, res) => { 
    res.render('home.ejs')
})

app.get('/register' , (req, res) => { 
    res.render('register.ejs')
})

app.post('/register' , async (req, res) => { 
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        User.create([{
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        }], (error, User) => {
            res.redirect('/')
        }) 
    } catch (error) {
        res.redirect('/register')
    }
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