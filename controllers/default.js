const express = require('express')
const router = express.Router()
const seed = require('../models/seed.js')
const List = require('../models/list.js')


//seed
// router.get('/seed', (req,res) => {
//     List.create(seed, (error, data) => {
//         res.redirect('/')
//       })
// })


//index
router.get('/' , (req, res) => { //list will be shown on index. in show, list will show items within
    List.find({}, (error, getList) => {
        res.render('index.ejs', 
        {
            list: getList
        })
    })
})

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

module.exports = lists