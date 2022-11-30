// if(process.env.NODE_ENV !== 'production') {
//     require('dotenv').config()
// }

// const express = require('express')
// const router = express.Router()
// const bcrypt = require('bcrypt')
// const passport = require('passport')
// const flash = require('express-flash')
// const session = require('express-session')
// const User = require('../models/users.js')
// const List = require('../models/list.js')

// const initializePassport = require('../passport-config.js')
// initializePassport(
//     passport, 
//     email => User.findOne({email: email}) === email,
//     id =>  User.findOne({id: id}) === id,
// )

// router.use(express.urlencoded({extended: false}));
// router.use(flash())
// router.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie:{
//         expires: 60000
//     }
// }))
// router.use(passport.initialize())
// router.use(passport.session())

// //seed
// // router.get('/seed', (req,res) => {
// //     List.create(seed, (error, data) => {
// //         res.redirect('/')
// //       })
// // })

// const test = []
// //=================================================
// //          ROUTES FOR LOGIN/REGISTER
// //=================================================

// //index
// router.get('/login' , (req, res) => { 
//     res.render('home.ejs')
// })

// router.get('/register' , (req, res) => { 
//     res.render('register.ejs')
// })

// router.post('/login', passport.authenticate('local',{
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }))

// router.post('/register' , async (req, res) => { 
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10)
//         // test.push({
//         //     id: Date.now().toString(),
//         //     name: req.body.name,
//         //     email: req.body.email,
//         //     password: hashedPassword,
//         // })
//         User.create([{
//             id: Date.now().toString(),
//             name: req.body.name,
//             email: req.body.email,
//             password: hashedPassword,
//         }], (error, User) => {
//             res.redirect('/login')
//         }) 
//         // res.redirect('/login')
//     } catch {
//         res.redirect('/register')
//     }
//     console.log(test)
// })

// //=================================================
// //              CHECKING AUTHENTICATION
// //=================================================
// const checkAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return next()
//     } else {
//     res.redirect('/login')
//     }
// }
// const checkNotAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         res.redirect('/')
//     } else {
//         return next()
//     }
// }

// //=================================================
// //          ROUTES AFTER AUTHENTICATION
// //=================================================

// //new
// // router.get('/new', (req, res) => {
// //     res.render('new.ejs')
// // })

// // router.get('/', (req, res) => {
// //     List.create({}, (error, List) => {
// //         res.render('index.ejs')
// //     })
// // })

// // //show
// // router.get('/:id/', (req, res) => {
// //     List.findById(req.params.id, (error, showList) => {
// //         res.render('show.ejs', 
// //         {
// //             list: showList
// //         })
// //     })
// // })

// // //new post
// // router.post('/', (req, res) => {
// //     List.create(req.body, (error, List) => {
// //         res.redirect('/')
// //     })
// // })


// // //edit
// // router.get('/:id/edit', (req, res) => {
// //     List.findById(req.params.id, (error, editList) => {
// //         res.render('edit.ejs', 
// //         {
// //             list: editList
// //         })
// //     })
// // })

// // //update
// // router.put('/:id/', (req, res) => {
// //     List.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedList) => {
// //       res.render('show.ejs', {list: updatedList})
// //     })
// // });

// // //delete
// // router.delete('/:id', (req, res) => {
// //     List.findByIdAndRemove(req.params.id, (error, data) => {
// //         res.redirect('/')
// //     })
// // })

// module.exports = router
