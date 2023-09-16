const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../database/db');
const Book = require('../models/mainModel');

module.exports.getIndex = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','index.html'))
}

module.exports.postBookEntry = (req,res,next)=>{
    const d = Date.now();
    const d2 = d+3600000;
    Book.create({
        title:req.body.title,
        issuedOn:d,
        returnBy:d2
    })
    .then(()=>res.redirect('/'))
    .catch(err=>console.log(err))
}

module.exports.getIssuedBooks =(req,res,next)=>{
    Book.findAll()
    .then(books=>res.json(books))
    .catch(err=>console.log(err))
}

module.exports.postReturn = (req,res,next)=>{
    Book.findByPk(req.body.returnId)
    .then(book=>{
        book.returnedOn=Date.now();
        book.fine=req.body.fine;
        return book.save()
    })
    .then(()=>res.redirect('/'))
    .catch(err=>console.log(err))
}