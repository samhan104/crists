const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const seed = require('../models/seed.js')
const User = require('../models/users.js')
const List = require('../models/list.js')
const session = require('express-session')
const passport = require('passport')
const flash = require('express-flash')

const initializePassport = require('../passport-config.js')

initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

router.use(flash)
router.use(
    session({
      secret: process.env.SECRET, 
      resave: false, 
      saveUninitialized: false 
    })
  )
router.use(passport.initialize())
router.use(passport.session())
//seed
// router.get('/seed', (req,res) => {
//     List.create(seed, (error, data) => {
//         res.redirect('/')
//       })
// })

//=================================================
//          ROUTES FOR LOGIN/REGISTER
//=================================================

//index
router.get('/login' , (req, res) => { 
    res.render('home.ejs')
})

router.get('/register' , (req, res) => { 
    res.render('register.ejs')
})

router.post('/', passport.authenticate('local', 
{
    successRedirect:'/',
    failureRedirect: '/login',
    failureFlash: true,
}
)) 


router.post('/register' , async (req, res) => { 
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        User.create([{
            id: Date.now().toString,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        }], (error, User) => {
            res.redirect('/login')
        }) 
    } catch (error) {
        res.redirect('/register')
    }
})

//=================================================
//          ROUTES AFTER AUTHENTICATION
//=================================================

//new
router.get('/new', (req, res) => {
    res.render('new.ejs')
})

//show
router.get('/:id/', (req, res) => {
    List.findById(req.params.id, (error, showList) => {
        res.render('show.ejs', 
        {
            list: showList
        })
    })
})

//new post
router.post('/', (req, res) => {
    List.create(req.body, (error, List) => {
        res.redirect('/')
    })
})


//edit
router.get('/:id/edit', (req, res) => {
    List.findById(req.params.id, (error, editList) => {
        res.render('edit.ejs', 
        {
            list: editList
        })
    })
})

//update
router.put('/:id/', (req, res) => {
    List.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedList) => {
      res.render('show.ejs', {list: updatedList})
    })
});

//delete
router.delete('/:id', (req, res) => {
    List.findByIdAndRemove(req.params.id, (error, data) => {
        res.redirect('/')
    })
})

module.exports = router